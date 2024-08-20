import {
    sqliteTable,
    integer,
    real,
    text,
} from 'drizzle-orm/sqlite-core';



export const returnPointLocationIndex = sqliteTable('return_point_location_index', {
    id: integer('id').primaryKey(),
    minX: real('minX'),
    maxX: real('maxX'),
    minY: real('minY'),
    maxY: real('maxY'),
});

export const returnPointLocationIndexRowid = sqliteTable('return_point_location_index_rowid', {
    rowid: integer('rowid').primaryKey(),
    nodeno: text('nodeno'),
});

export const returnPointLocationIndexNode = sqliteTable('return_point_location_index_node', {
    nodeno: integer('nodeno').primaryKey(),
    data: text('data'),
});

export const returnPointLocationIndexParent = sqliteTable('return_point_location_index_parent', {
    nodeno: integer('nodeno').primaryKey(),
    parentnode: text('parentnode'),
});
