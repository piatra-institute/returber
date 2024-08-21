import type {
    Request,
    Response,
} from 'express';

import {
    eq,
} from 'drizzle-orm';

import {
    APIUpdateReturnPoint,
} from '@/source/data/api';

import database from '@/source/database';
import {
    returnPoints,
    ReturnPoint,
} from '@/source/database/schema/returnPoints';

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
            status,
            queue,
        } = APIUpdateReturnPoint.parse(request.body);


        const update: Partial<ReturnPoint> = {};
        if (typeof status !== 'undefined') {
            update.status = status;
            update.statusUpdatedAt = new Date().toISOString();
        }
        if (typeof queue !== 'undefined') {
            update.queue = queue;
            update.queueUpdatedAt = new Date().toISOString();
        }
        await database
            .update(returnPoints)
            .set({
                ...update,
            })
            .where(
                eq(returnPoints.id, id),
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
