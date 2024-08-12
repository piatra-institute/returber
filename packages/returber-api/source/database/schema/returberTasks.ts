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
        name: text('name').notNull(),
        address: text('address').notNull(),
        postalCode: text('postal_code').notNull(),
        city: text('city').notNull(),
        region: text('region').notNull(),
        country: text('country').notNull(),
        locationIndexID: integer('location_index_id').notNull(),
        returnables: integer('returnables').notNull(),
        rate: integer('country').notNull(),
        status: text('status').notNull(),
        assignedTo: text('assigned_to'),
        assignedAt: text('assigned_at'),
        completedAt: text('completed_at'),
        cancelledAt: text('cancelled_at'),
    },
    (returberTasks) => ({
        nameIdx: index('nameIdx').on(returberTasks.name),
    }),
);
