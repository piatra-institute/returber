'use client';

import {
    useRef,
    useState,
    useEffect,
} from 'react';



export default function Call() {
    const mounted = useRef(false);


    const [
        location,
        setLocation,
    ] = useState(null);

    const [
        image,
        setImage,
    ] = useState(null);

    const [
        returnables,
        setReturnables,
    ] = useState(0);

    const [
        startPickTime,
        setStartPickTime,
    ] = useState(0);

    const [
        endPickTime,
        setEndPickTime,
    ] = useState(0);


    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
    }, []);


    useEffect(() => {
        setStartPickTime(Date.now());
        setEndPickTime(Date.now() + 1000 * 60 * 60);
    }, []);


    return (
        <div
            className="grid place-items-center min-h-screen h-full"
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
                    map
                </div>
            </div>

            <div>
                capture image
            </div>

            {image && (
                <>
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
                </>
            )}
        </div>
    );
}
