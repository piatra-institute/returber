import {
    sqliteTable,
    text,
    index,
    integer,
} from 'drizzle-orm/sqlite-core';



export const returnPoints = sqliteTable(
    'returnPoints',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        name: text('name').notNull(),
        image: text('image').notNull(),
        locationIndexID: integer('location_index_id').notNull(),
        status: text('status').notNull(),
        statusUpdatedAt: text('status_updated_at').notNull(),
        queue: integer('queue').notNull(),
        queueUpdatedAt: text('queue_updated_at').notNull(),
        deletionMarks: integer('deletion_marks').notNull(),
    },
    (returnPoints) => ({
        nameIdx: index('nameIdx').on(returnPoints.name),
    }),
);


export type ReturnPoint = typeof returnPoints.$inferSelect;
