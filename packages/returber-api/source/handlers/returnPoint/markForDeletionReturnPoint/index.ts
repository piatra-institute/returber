import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import database from '@/source/database';

import {
    logger,
} from '@/source/utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
        } = request.body;

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
