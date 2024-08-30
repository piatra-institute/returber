import type {
    Request,
    Response,
} from 'express';

import { eq } from 'drizzle-orm';

import {
    APICancelReturberTask,
} from '@/source/data/api';

import database from '@/source/database';
import {
    returberTasks,
} from '@/source/database/schema/returberTasks';

import {
    getTokensUser,
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
        } = APICancelReturberTask.parse(request.body);


        const tokensUser = await getTokensUser(request, response);
        if (!tokensUser) {
            logger('warn', 'User not found');

            response.status(404).json({
                status: false,
            });
            return;
        }
        const user = typeof tokensUser === 'string' ? tokensUser : tokensUser.email;


        const returberTask = await database.query.returberTasks.findFirst({
            where: eq(returberTasks.id, id),
        });
        if (!returberTask) {
            response.status(404).json({
                status: false,
            });
            return;
        }

        if (returberTask.createdBy !== user) {
            response.status(400).json({
                status: false,
            });
            return;
        }

        await database
            .update(returberTasks)
            .set({
                status: 'cancelled',
                assignedAt: null,
                assignedTo: null,
                cancelledAt: new Date().toISOString(),
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
