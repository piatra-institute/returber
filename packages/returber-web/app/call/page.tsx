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

import Map from '@/components/Map/dynamic';
import Camera from '@/components/Camera';



export default function Call() {
    const {
        language,
    } = useContext(LanguageContext);


    const mounted = useRef(false);
    const map = useRef<any>();


    const [
        showCamera,
        setShowCamera,
    ] = useState(false);

    const [
        location,
        setLocation,
    ] = useState<GeolocationCoordinates | null>(null);

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
        customTimeText,
        setCustomTimeText,
    ] = useState('');

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
        if (!image) {
            return;
        }

        const loadLocation = () => {
            window.navigator.geolocation.getCurrentPosition((data) => {
                setLocation(data.coords);
            });
        }

        loadLocation();
    }, [
        image,
    ]);


    return (
        <div
            className="max-w-[300px] md:max-w-[400px] m-auto h-dvh"
        >
            {!image && (
                <div
                    className="grid place-content-center h-dvh"
                >
                    <button
                        className="min-w-[300px] lg:min-w-[400px] lg:text-3xl font-bold select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => {
                            setShowCamera(true);
                        }}
                    >
                        {localization[language].callPictureReturnables}
                    </button>
                </div>
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
                        className="h-14"
                    />

                    {location ? (
                        <div
                            className="grid place-content-center mb-12"
                        >
                            <Map
                                location={location}
                                map={map}
                                atNewLocation={(newLocation) => {
                                    setLocation({
                                        ...location,
                                        latitude: newLocation.lat,
                                        longitude: newLocation.lng,
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] mb-12"
                        />
                    )}

                    <div
                        className="relative mb-8 flex flex-col items-center"
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
                            value={returnables.toString()}
                            type="number"
                            inputMode="numeric"
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (isNaN(value)) {
                                    setReturnables(0);
                                    return;
                                }

                                setReturnables(value);
                            }}
                            className="text-center lg:min-w-[250px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />

                        <div>
                            {localization[language].callReturnables}
                        </div>

                        <div>
                            {returnablesMultiplier}
                        </div>

                        <input
                            type="range"
                            min={0}
                            max={0.5}
                            step={0.05}
                            value={returnablesMultiplier}
                            onChange={(e) => {
                                setReturnablesMultiplier(parseFloat(e.target.value));
                            }}
                        />

                        <div
                            className="text-xl"
                        >
                            {(returnables * returnablesMultiplier).toFixed(2)} {currencyMap[language]}
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
                                ? 'select-none lg:min-w-[250px] bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                                : 'select-none py-2 px-8 font-bold rounded-full'
                            }
                            onClick={() => {
                                setPickTimeType('next-24hrs');
                            }}
                        >
                            {localization[language].callNext24Hours}
                        </button>

                        <button
                            className={pickTimeType === 'custom'
                                ? 'select-none lg:min-w-[250px] bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out'
                                : 'select-none py-2 px-8 font-bold rounded-full'
                            }
                            onClick={() => {
                                setPickTimeType('custom');
                            }}
                        >
                            {localization[language].callCustom}
                        </button>

                        {pickTimeType === 'custom' && (
                            <input
                                placeholder="in 2 hours, next Tuesday, etc."
                                value={customTimeText}
                                onChange={(e) => {
                                    setCustomTimeText(e.target.value);
                                }}
                                className="text-center lg:min-w-[250px] px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 mt-4"
                            />
                        )}
                    </div>

                    {returnables > 0 ? (
                        <button
                            className="mt-8 mb-24 w-full text-xl lg:text-3xl select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        >
                            returber
                        </button>
                    ) : (
                        <div
                            className="mt-8 mb-24 h-[52px]"
                        />
                    )}
                </>
            )}
        </div>
    );
}
