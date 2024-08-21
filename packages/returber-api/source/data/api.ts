import { z } from 'zod';



const location = z.object({
    latitude: z.number(),
    longitude: z.number(),
}).strict();


export const APIPostReturberTask = z.object({
    image: z.string(),
    location,
    returnables: z.string(),
    pickTimeType: z.literal('next-hrs').or(z.literal('custom')).optional().default('next-hrs'),
    customTimeText: z.string().optional().default(''),
    language: z.string().optional().default('en'),
}).strict();


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


export const APIGetReturberTasks = z.object({
    location,
}).strict();


export const APICreateReturnPoint = z.object({
    image: z.string(),
    location,
}).strict();


export const APIMarkForDeletionReturnPoint = z.object({
    id: z.string(),
}).strict();


export const APIUpdateReturnPoint = z.object({
    id: z.string(),
    status: z.literal('active').or(z.literal('inactive')),
    queue: z.number().optional(),
}).strict();
