import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schemaUsers from './schema/users';
import * as schemaReturberTasks from './schema/returberTasks';



const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const database = drizzle(client, {
    schema: {
        ...schemaUsers,
        ...schemaReturberTasks,
    },
});


export default database;
