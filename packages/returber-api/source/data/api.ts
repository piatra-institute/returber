import { z } from 'zod';



export const APICreateReturnPoint = z.object({
    image: z.string(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }).strict(),
}).strict();


export const APIMarkForDeletionReturnPoint = z.object({
    id: z.string(),
}).strict();


export const APIUpdateReturnPoint = z.object({
    id: z.string(),
    status: z.literal('active').or(z.literal('inactive')),
    queue: z.number().optional(),
}).strict();
