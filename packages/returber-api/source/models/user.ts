import { v4 as uuid } from 'uuid';

import {
    User,
} from '@/source/database/schema/users';



export const NewUser = (
    email: string,
    name: string,
    picture: string,
): User => ({
    id: uuid(),
    createdAt: new Date().toISOString(),
    email,
    name,
    picture,
    payments: JSON.stringify([]),
    activeTasks: 0,
    collectedTasks: 0,
    failedTasks: 0,
    cancelledTasks: 0,
    completedTasks: 0,
});
