import type {
    Request,
    Response,
} from 'express';

import { v4 as uuid } from 'uuid';

import {
    APICreateReturnPoint,
} from '@/source/data/api';

import database from '@/source/database';
import {
    returnPoints,
} from '@/source/database/schema/returnPoints';
import {
    returnPointLocationIndex,
} from '@/source/database/schema/returnPointLocations';

import {
    getReverseGeocode,
} from '@/source/services/geocoder';
import {
    storeImage,
} from '@/source/services/image';

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
            image,
            location,
        } = APICreateReturnPoint.parse(request.body);

        const id = uuid();
        const createdAt = new Date().toISOString();
        const createdBy = await getUser(request, response);
        const locationData = await getReverseGeocode(location);
        const name = locationData.admin1Code.asciiName;
        const imageURL = await storeImage(image, id);


        const returnPointIndexResult = await database.insert(returnPointLocationIndex).values({
            minX: location.longitude,
            maxX: location.longitude,
            minY: location.latitude,
            maxY: location.latitude,
        });
        const locationIndexID = Number(returnPointIndexResult.lastInsertRowid);
        if (!locationIndexID) {
            response.status(500).json({
                status: false,
            });
            return;
        }

        await database.insert(returnPoints).values({
            id,
            createdBy,
            createdAt,
            name,
            image: imageURL,
            locationIndexID,
            status: 'active',
            statusUpdatedAt: new Date().toISOString(),
            queue: 0,
            queueUpdatedAt: new Date().toISOString(),
            deletionMarks: 0,
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
