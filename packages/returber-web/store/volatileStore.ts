import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Required for zustand.
import type { } from '@redux-devtools/extension';



export interface VolatileState {
    showLoading: boolean;
    setShowLoading: (loading: boolean) => void;

    clearVolatileStore: () => void;
}


export const initialVolatileState = {
    showLoading: false,
};


const useVolatileStore = create<VolatileState>()(
    devtools(
    immer(
        (set) => ({
            showLoading: initialVolatileState.showLoading,
            setShowLoading: (showLoading: boolean) => set({ showLoading }),

            clearVolatileStore: () => set(() => ({
                ...initialVolatileState,
            })),
        }),
    ),
    ),
);


export default useVolatileStore;
