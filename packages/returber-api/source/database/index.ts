import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schemaUsers from './schema/users';
import * as schemaReturberTasks from './schema/returberTasks';
import * as schemaReturberTaskLocations from './schema/returberTaskLocations';
import * as schemaReturnPoints from './schema/returnPoints';
import * as schemaReturnPointLocations from './schema/returnPointLocations';



const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const database = drizzle(client, {
    schema: {
        ...schemaUsers,
        ...schemaReturberTasks,
        ...schemaReturberTaskLocations,
        ...schemaReturnPoints,
        ...schemaReturnPointLocations,
    },
});


export default database;
