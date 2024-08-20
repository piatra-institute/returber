import { z } from 'zod';



export const APICreateReturnPoint = z.object({
    name: z.string(),
    image: z.string(),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }).strict(),
}).strict();
