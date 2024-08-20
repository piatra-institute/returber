import {
    sqliteTable,
    integer,
    real,
    text,
} from 'drizzle-orm/sqlite-core';



export const returberTaskLocationIndex = sqliteTable('returber_task_location_index', {
    id: integer('id').primaryKey(),
    minX: real('minX'),
    maxX: real('maxX'),
    minY: real('minY'),
    maxY: real('maxY'),
});

export const returberTaskLocationIndexRowid = sqliteTable('returber_task_location_index_rowid', {
    rowid: integer('rowid').primaryKey(),
    nodeno: text('nodeno'),
});

export const returberTaskLocationIndexNode = sqliteTable('returber_task_location_index_node', {
    nodeno: integer('nodeno').primaryKey(),
    data: text('data'),
});

export const returberTaskLocationIndexParent = sqliteTable('returber_task_location_index_parent', {
    nodeno: integer('nodeno').primaryKey(),
    parentnode: text('parentnode'),
});
