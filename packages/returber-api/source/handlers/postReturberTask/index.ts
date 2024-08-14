import type {
    Request,
    Response,
} from 'express';

import { v4 as uuid } from 'uuid';

import { sql } from 'drizzle-orm';

import database from '../../database';
import {
    returberTasks,
} from '../../database/schema/returberTasks';

import {
    logger,
} from '../../utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            image,
            location,
            returnables,
            pickTimeType,
            customTimeText,
            language,
        } = request.body;


        const {
            name,
            address,
            postalCode,
            city,
            region,
            country,
        } = location;

        await database.insert(returberTasks).values({
            id: uuid(),
            createdAt: new Date().toISOString(),

            image,
            pickTimeType,
            customTimeText,
            language,

            createdBy: '',
            name,
            address,
            postalCode,
            city,
            region,
            country,
            locationIndexID: location.id,
            returnables,
            rate: 0,
            status: 'pending',
        });


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
