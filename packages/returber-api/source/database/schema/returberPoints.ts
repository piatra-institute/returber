import {
    sqliteTable,
    text,
    index,
    integer,
} from 'drizzle-orm/sqlite-core';



export const returberPoints = sqliteTable(
    'returberPoints',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        image: text('image').notNull(),
        location: text('location').notNull(),
        status: text('status').notNull(),
        queue: integer('queue').notNull(),
    },
    (returberTasks) => ({
        locationIdx: index('locationIdx').on(returberTasks.location),
    }),
);
