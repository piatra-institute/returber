'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import Image from 'next/image';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    currencyMap,
} from '@/data/index';

import LinkButton from '@/components/LinkButton';
import Camera from '@/components/Camera';



export default function Call() {
    const {
        language,
    } = useContext(LanguageContext);


    const mounted = useRef(false);


    const [
        showCamera,
        setShowCamera,
    ] = useState(false);

    const [
        location,
        setLocation,
    ] = useState(null);

    const [
        image,
        setImage,
    ] = useState<string | null>(null);

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

    const [
        pickTimeType,
        setPickTimeType,
    ] = useState<'next-24hrs' | 'custom'>('next-24hrs');


    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
    }, []);


    useEffect(() => {
        setStartPickTime(Date.now());
        setEndPickTime(Date.now() + 1000 * 60 * 60 * 24);
    }, []);


    return (
        <div
            className="grid place-items-center min-h-screen h-full"
        >
            <div
                // className="absolute"
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


            {!image && (
                <LinkButton
                    text={localization[language].callTakePicture}
                    onClick={() => {
                        setShowCamera(true);
                    }}
                />
            )}

            {showCamera && (
                <Camera
                    cancelText={localization[language].cancel}
                    handleImage={(image) => {
                        setImage(image);
                        setShowCamera(false);
                    }}
                    setShowCamera={setShowCamera}
                />
            )}

            {image && (
                <>
                    <div
                        className="relative"
                    >
                        <Image
                            src={image}
                            alt="user image"
                            height={400}
                            width={400}
                            priority={false}
                            draggable={false}
                            className="rounded-full select-none"
                        />

                        <button
                            className="absolute top-0 left-[50%] -translate-x-[50%] text-2xl p-2 bg-[#f0f4ed] rounded-b-full"
                            onClick={() => {
                                setImage(null);
                            }}
                        >
                            &#128938;
                        </button>
                    </div>

                    <div
                        className="flex flex-col gap-2 text-center"
                    >
                        <input
                            placeholder="overwrite"
                            value={returnables}
                            onChange={(e) => {
                                setReturnables(parseInt(e.target.value));
                            }}
                            className="text-center w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />

                        <div>
                            {localization[language].callReturnables}
                        </div>

                        <div>
                            {returnables * 0.25} {currencyMap[language]}
                        </div>
                    </div>

                    <div
                        className="flex flex-col gap-2 text-center"
                    >
                        <div>
                            {localization[language].callPickTime}
                        </div>

                        <div>
                            anytime next 24 hrs
                        </div>

                        <div>
                            custom
                        </div>
                    </div>

                    {returnables > 0 && (
                        <button
                            className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            returber
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
