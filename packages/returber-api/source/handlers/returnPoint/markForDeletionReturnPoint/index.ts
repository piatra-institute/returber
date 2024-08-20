import type {
    Request,
    Response,
} from 'express';

import {
    sql,
    eq,
} from 'drizzle-orm';

import {
    APIMarkForDeletionReturnPoint,
} from '@/source/data/api';

import database from '@/source/database';
import {
    returnPoints,
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
        } = APIMarkForDeletionReturnPoint.parse(request.body);


        await database
            .update(returnPoints)
            .set({
                deletionMarks: sql`${returnPoints.deletionMarks} + 1`,
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
