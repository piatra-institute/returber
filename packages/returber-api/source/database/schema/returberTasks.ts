import {
    sqliteTable,
    text,
    index,
    integer,
} from 'drizzle-orm/sqlite-core';



export const returberTasks = sqliteTable(
    'returberTasks',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        city: text('city').notNull(),
        country: text('country').notNull(),
        image: text('image').notNull(),
        pickTimeType: text('pick_time_type').notNull(),
        customTimeText: text('custom_time_text').notNull(),
        language:  text('language').notNull(),
        locationIndexID: integer('location_index_id').notNull(),
        returnables: text('returnables').notNull(),
        status: text('status').notNull(),
        assignedTo: text('assigned_to'),
        assignedAt: text('assigned_at'),
        completedAt: text('completed_at'),
        completedByCollector: integer('completed_by_collector'),
        completedByUser: integer('completed_by_user'),
        cancelledAt: text('cancelled_at'),
    },
    (returberTasks) => ({
        idIdx: index('idIdx').on(returberTasks.id),
    }),
);


export type ReturberTask = typeof returberTasks.$inferSelect;
