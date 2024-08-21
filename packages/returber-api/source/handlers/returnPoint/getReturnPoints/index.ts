import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import {
    APIGetReturnPoints,
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
        } = APIGetReturnPoints.parse(request.body);

        const points: any[] = [];


        const coords = findSquareCoordinates(location, 1000);

        const pointsRequest = await database.query.returnPointLocationIndex.findMany({
            where: sql`
                minX<=${coords.lowerLeft.longitude}
                AND maxX>=${coords.upperLeft.longitude}
                AND minY<=${coords.lowerLeft.latitude}
                AND maxY>=${coords.lowerLeft.latitude};`,
        });

        for (const pointLocation of pointsRequest) {
            const point = await database.query.returnPoints.findFirst({
                where: sql`location_index_id = ${pointLocation.id}`,
            });
            if (!point) {
                continue;
            }

            points.push(point);
        }


        response.json({
            status: true,
            data: points,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
