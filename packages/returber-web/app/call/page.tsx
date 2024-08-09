'use client';

import {
    useRef,
    useEffect,
} from 'react';



export default function Call() {
    const mounted = useRef(false);

    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
    }, []);


    return (
        <div
            className="grid place-items-center h-full"
        >
            <div
                className="absolute"
            >
                <div
                    id="map"
                    style={{
                        height: '200px',
                        width: '200px',
                    }}
                >
                </div>
            </div>

            <div>
                capture image
            </div>

            <div>
                returnables overwrite / data from image / money
            </div>

            <div>
                set pick time
            </div>

            <button
                className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
            >
                returb
            </button>
        </div>
    );
}
