import { createClient } from '@libsql/client';

import dotenv from 'dotenv';



dotenv.config({
    path: '.env',
});


const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
});


const DROPS = [
    `DROP TABLE IF EXISTS returber_task_location_index;`,
    `DROP TABLE IF EXISTS return_point_location_index;`,
    `DROP TABLE IF EXISTS users;`,
    `DROP TABLE IF EXISTS returberTasks;`,
    `DROP TABLE IF EXISTS returnPoints;`,
]


for (const drop of DROPS) {
    await client.execute(drop);
}
