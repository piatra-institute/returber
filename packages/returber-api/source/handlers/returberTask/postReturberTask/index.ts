import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import { v4 as uuid } from 'uuid';

import database from '@/source/database';
import {
    returberTasks,
} from '@/source/database/schema/returberTasks';
import {
    returberTaskLocationIndex,
} from '@/source/database/schema/returberTaskLocations';

import {
    getReverseGeocode,
} from '@/source/services/geocoder';
import {
    storeImage,
} from '@/source/services/image';

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
            returnables,
            pickTimeType,
            customTimeText,
            language,
        } = request.body;

        const id = uuid();
        const createdAt = new Date().toISOString();
        const locationData = await getReverseGeocode(location);
        const {
            countryCode,
        } = locationData;
        const imageURL = await storeImage(image, id);


        const returberTaskIndexResult = await database.insert(returberTaskLocationIndex).values({
            minX: location.longitude,
            maxX: location.longitude,
            minY: location.latitude,
            maxY: location.latitude,
        });
        const locationIndexID = Number(returberTaskIndexResult.lastInsertRowid);
        if (!locationIndexID) {
            response.status(500).json({
                status: false,
            });
            return;
        }

        await database.insert(returberTasks).values({
            id,
            createdAt,

            image: imageURL,
            pickTimeType,
            customTimeText,
            language,

            createdBy: '',
            name: '',
            address: '',
            postalCode: '',
            city: '',
            region: '',
            country: '',
            locationIndexID,
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
