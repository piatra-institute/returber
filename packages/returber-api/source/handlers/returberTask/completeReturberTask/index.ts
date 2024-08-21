import type {
    Request,
    Response,
} from 'express';

import { eq } from 'drizzle-orm';

import {
    APICompleteReturberTask,
} from '@/source/data/api';

import database from '@/source/database';
import {
    returberTasks,
    ReturberTask,
} from '@/source/database/schema/returberTasks';

import {
    getUser,
} from '@/source/logic/user';

import {
    logger,
} from '@/source/utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            id,
        } = APICompleteReturberTask.parse(request.body);

        const user = await getUser(request, response);


        const returberTask = await database.query.returberTasks.findFirst({
            where: eq(returberTasks.id, id),
        });
        if (!returberTask) {
            response.status(404).json({
                status: false,
            });
            return;
        }

        if (returberTask.status !== 'assigned') {
            response.status(400).json({
                status: false,
            });
            return;
        }

        const update: Partial<ReturberTask> = {};

        if (returberTask.createdBy === user) {
            update.completedByUser = 1;

            if (returberTask.completedByCollector) {
                update.status = 'completed';
                update.completedAt = new Date().toISOString();
            }
        } else if (returberTask.assignedTo === user) {
            update.completedByCollector = 1;

            if (returberTask.completedByUser) {
                update.status = 'completed';
                update.completedAt = new Date().toISOString();
            }
        }

        await database
            .update(returberTasks)
            .set({
                ...update,
            })
            .where(
                eq(returberTasks.id, id),
            );


        response.json({
            status: true,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
