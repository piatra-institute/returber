import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import database from '../../../database';

import {
    logger,
} from '../../../utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {

        } = request.body;

        const createdAt = new Date().toISOString();
        const createdBy = 'system';



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
