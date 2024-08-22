import type {
    Request,
    Response,
} from 'express';

import { eq, } from 'drizzle-orm';

import {
    APIGetReturnPointByID,
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
        } = APIGetReturnPointByID.parse(request.body);


        const point = await database
            .query
            .returnPoints
            .findFirst({
                where: eq(returnPoints.id, id),
            });


        response.json({
            status: true,
            data: point,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
