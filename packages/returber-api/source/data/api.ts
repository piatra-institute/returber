import { z } from 'zod';



const location = z.object({
    latitude: z.number(),
    longitude: z.number(),
}).strict();

const returnPointStatus = z.literal('active').or(z.literal('inactive'));


export const APIAcceptReturberTask = z.object({
    id: z.string(),
    location,
}).strict();

export const APICancelReturberTask = z.object({
    id: z.string(),
}).strict();

export const APICompleteReturberTask = z.object({
    id: z.string(),
}).strict();

export const APIPostReturberTask = z.object({
    image: z.string(),
    location,
    returnables: z.string(),
    pickTimeType: z.literal('next-hrs').or(z.literal('custom')).optional().default('next-hrs'),
    customTimeText: z.string().optional().default(''),
    language: z.string().optional().default('en'),
}).strict();

export const APIGetReturberTasks = z.object({
    location,
}).strict();


export const APICreateReturnPoint = z.object({
    image: z.string(),
    location,
    status: returnPointStatus,
    queue: z.number().nonnegative(),
}).strict();

export const APIMarkForDeletionReturnPoint = z.object({
    id: z.string(),
}).strict();

export const APIUpdateReturnPoint = z.object({
    id: z.string(),
    status: returnPointStatus,
    queue: z.number().nonnegative().optional(),
}).strict();

export const APIGetReturnPoints = z.object({
    location,
}).strict();
