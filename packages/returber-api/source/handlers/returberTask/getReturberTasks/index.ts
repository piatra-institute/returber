import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import {
    APIGetReturberTasks,
} from '@/source/data/api';

import database from '@/source/database';

import {
    findSquareCoordinates,
} from '@/source/logic/coordinates'

import {
    logger,
} from '@/source/utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            location,
        } = APIGetReturberTasks.parse(request.body);

        const tasks: any[] = [];


        const coords = findSquareCoordinates(location, 1000);

        const locationsRequest = await database.query.returberTaskLocationIndex.findMany({
            where: sql`
                minX<=${coords.lowerLeft.longitude}
                AND maxX>=${coords.upperLeft.longitude}
                AND minY<=${coords.lowerLeft.latitude}
                AND maxY>=${coords.lowerLeft.latitude};`,
        });

        for (const location of locationsRequest) {
            const task = await database.query.returberTasks.findFirst({
                where: sql`location_index_id = ${location.id}`,
            });
            if (!task) {
                continue;
            }

            tasks.push({
                ...task,
                returnables: JSON.parse(task.returnables),
            });
        }


        response.json({
            status: true,
            data: tasks,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
