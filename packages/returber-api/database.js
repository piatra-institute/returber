import { createClient } from '@libsql/client';

import dotenv from 'dotenv';



dotenv.config({
    path: '.env',
});


const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
});


const tables = [
`CREATE VIRTUAL TABLE IF NOT EXISTS returber_task_location_index USING rtree(
    id INTEGER PRIMARY KEY,
    minX, maxX,
    minY, maxY
);`,

`CREATE VIRTUAL TABLE IF NOT EXISTS return_point_location_index USING rtree(
    id INTEGER PRIMARY KEY,
    minX, maxX,
    minY, maxY
);`,

`CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    payments TEXT NOT NULL
);`,
`CREATE UNIQUE INDEX IF NOT EXISTS emailIdx ON users (email);`,

`CREATE TABLE IF NOT EXISTS returberTasks (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    city TEXT NOT NULL,
    image TEXT NOT NULL,
    pick_time_type TEXT NOT NULL,
    custom_time_text TEXT NOT NULL,
    language TEXT NOT NULL,
    location_index_id INTEGER NOT NULL
    returnables INTEGER NOT NULL,
    rate INTEGER NOT NULL,
    status TEXT NOT NULL,
    assigned_to TEXT,
    assigned_at TEXT,
    cancelled_at TEXT,
    completed_at TEXT
);`,
// `CREATE INDEX IF NOT EXISTS nameIdx ON returberTasks (name);`,

`CREATE TABLE IF NOT EXISTS returnPoints (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    location_index_id INTEGER NOT NULL
    status TEXT NOT NULL,
    queue INTEGER NOT NULL,
    deletion_marks INTEGER NOT NULL,
);`,
`CREATE INDEX IF NOT EXISTS nameIdx ON returnPoints (name);`,
];


for (const table of tables) {
    const tableName = table.match(/CREATE (?:VIRTUAL )?TABLE IF NOT EXISTS (\w+)/);
    if (tableName) {
        console.log('Creating table', tableName[1]);
    } else {
        const index = table.match(/CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+)/);
        if (index) {
            console.log('Creating index', index[1]);
        }
    }

    await client.execute(table.trim());
}
