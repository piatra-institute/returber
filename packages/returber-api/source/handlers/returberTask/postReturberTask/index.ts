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
    getReverseGeocode,
} from '@/source/services/geocoder';

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


        const locationData = await getReverseGeocode(location);
        console.log(locationData);

        const {
            countryCode,
        } = locationData;

        // await database.insert(returberTasks).values({
        //     id: uuid(),
        //     createdAt: new Date().toISOString(),

        //     image,
        //     pickTimeType,
        //     customTimeText,
        //     language,

        //     createdBy: '',
        //     name: '',
        //     address: '',
        //     postalCode: '',
        //     city: '',
        //     region: '',
        //     country: '',
        //     locationIndexID: location.id,
        //     returnables,
        //     rate: 0,
        //     status: 'pending',
        // });


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
