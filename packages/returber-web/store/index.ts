import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Required for zustand.
import type { } from '@redux-devtools/extension';

import {
    User,
} from '@/data/index';

import useVolatileStore from './volatileStore';



export interface State {
    user: User | null;
    setUser: (user: User | null) => void;
    clearStore: () => void;
}


const useStore = create<State>()(
    devtools(
    persist(
    immer(
        (set) => ({
            user: null,
            setUser: (user: User | null) => set({ user }),
            clearStore: () => set(() => ({
                user: null,
            })),
        }),
    ),
        {
            name: 'RTBR',
        },
    ),
    ),
);


export default useStore;

export {
    useVolatileStore,
};
