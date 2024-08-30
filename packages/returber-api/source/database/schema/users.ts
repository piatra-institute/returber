import {
    sqliteTable,
    text,
    integer,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';



export const users = sqliteTable(
    'users',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        name: text('name').notNull(),
        email: text('email').notNull(),
        picture: text('picture').notNull(),
        payments: text('payments').notNull(),
        collectedTasks: integer('collected_tasks').notNull(),
        failedTasks: integer('failed_tasks').notNull(),
        cancelledTasks: integer('cancelled_tasks').notNull(),
        completedTasks: integer('completed_tasks').notNull(),
    },
    (users) => ({
        emailIdx: uniqueIndex('emailIdx').on(users.email),
    }),
);


export type User = typeof users.$inferSelect;
