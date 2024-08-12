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

import {
    closeX,
} from '@/data/icons';

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
        returnablesMultiplier,
        setReturnablesMultiplier,
    ] = useState(0.25);

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
            className="grid place-items-center h-dvh"
        >
            {!image && (
                <button
                    className="lg:min-w-[500px] lg:text-3xl font-bold select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                    onClick={() => {
                        setShowCamera(true);
                    }}
                >
                    {localization[language].callPictureReturnables}
                </button>
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
                        // className="absolute"
                    >
                        <div
                            id="map"
                            // style={{
                            //     height: '200px',
                            //     width: '200px',
                            // }}
                        >
                            map
                        </div>
                    </div>

                    <div
                        className="relative mb-8"
                    >
                        <Image
                            src={image}
                            alt="user image"
                            height={400}
                            width={400}
                            priority={false}
                            draggable={false}
                            className="rounded-full select-none max-h-[400px] w-auto"
                        />

                        <button
                            className="select-none absolute top-0 left-[50%] -translate-x-[50%] text-2xl p-2 bg-[#f0f4ed] rounded-b-full"
                            onClick={() => {
                                setImage(null);
                            }}
                        >
                            {closeX}
                        </button>
                    </div>

                    <div
                        className="flex flex-col gap-2 text-center mb-8"
                    >
                        <input
                            placeholder="overwrite"
                            value={returnables}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (isNaN(value)) {
                                    setReturnables(0);
                                    return;
                                }

                                setReturnables(value);
                            }}
                            className="text-center w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />

                        <div>
                            {localization[language].callReturnables}
                        </div>

                        <div>
                            {returnables * returnablesMultiplier} {currencyMap[language]}
                        </div>
                    </div>

                    <div
                        className="flex flex-col gap-2 text-center mb-8"
                    >
                        <div
                            className="mb-2"
                        >
                            {localization[language].callPickTime}
                        </div>

                        <button
                            className={pickTimeType === 'next-24hrs'
                                ? 'select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                                : 'select-none py-2 px-8 font-bold rounded-full'
                            }
                            onClick={() => {
                                setPickTimeType('next-24hrs');
                                setStartPickTime(Date.now());
                                setEndPickTime(Date.now() + 1000 * 60 * 60 * 24);
                            }}
                        >
                            {localization[language].callNext24Hours}
                        </button>

                        <button
                            className={pickTimeType === 'custom'
                                ? 'select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                                : 'select-none py-2 px-8 font-bold rounded-full'
                            }
                            onClick={() => {
                                setPickTimeType('custom');
                            }}
                        >
                            {localization[language].callCustom}
                        </button>
                    </div>

                    {returnables > 0 ? (
                        <button
                            className="mb-8 lg:min-w-[500px] lg:text-3xl select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            returber
                        </button>
                    ) : (
                        <div
                            className="mb-8 h-[52px]"
                        />
                    )}
                </>
            )}
        </div>
    );
}
