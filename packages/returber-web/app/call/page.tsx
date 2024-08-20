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
    PickTimeType,
    returnPrices,
    environment,
} from '@/data/index';

import {
    closeX,
} from '@/data/icons';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import Camera from '@/components/Camera';
import ReturnablesCount from '@/components/ReturnablesCount';
import TimePicker from '@/components/TimePicker';
import LinkButton from '@/components/LinkButton';



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

    // Only wait for camera loading once.
    const [
        cameraLoaded,
        setCameraLoaded,
    ] = useState(false);

    const [
        showLoadingCamera,
        setShowLoadingCamera,
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
    ] = useState([
        {
            count: 0,
            multiplier: returnPrices[language] / 2,
            max: returnPrices[language],
        },
    ]);

    const [
        customTimeText,
        setCustomTimeText,
    ] = useState('');

    const [
        pickTimeType,
        setPickTimeType,
    ] = useState<PickTimeType>('next-hrs');

    const [
        returberErrors,
        setReturberErrors,
    ] = useState('');

    const [
        returberCall,
        setReturberCall,
    ] = useState(false);

    const [
        returberSuccess,
        setReturberSuccess,
    ] = useState(false);


    const returber = async () => {
        setReturberCall(true);

        try {
            if (!location || !image || !returnables.reduce((acc, item) => acc + item.count, 0)) {
                return;
            }


            const data = {
                image,
                location,
                returnables,
                pickTimeType,
                customTimeText,
                language,
            };

            const request = await fetch(environment.API + '/post-returber-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();

            if (!response.status) {
                setReturberErrors(
                    localization[language].somethingWentWrongTryAgain,
                );
                setReturberSuccess(false);
            } else {
                setReturberSuccess(true);
            }
        } catch (error) {
            setReturberErrors(
                localization[language].somethingWentWrongTryAgain,
            );
            setReturberSuccess(false);
        }
    }


    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;
    }, []);

    useEffect(() => {
        setReturnables([
            {
                count: 0,
                multiplier: returnPrices[language] / 2,
                max: returnPrices[language],
            },
        ]);
    }, [
        language,
    ]);

    useEffect(() => {
        if (!image) {
            return;
        }

        const loadLocation = async () => {
            window.navigator.geolocation.getCurrentPosition((data) => {
                setLocation(data.coords);
            });
        }

        loadLocation();
    }, [
        image,
    ]);


    if (returberCall) {
        return (
            <div
                className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center gap-12"
            >
                {returberErrors && (
                    <div>
                        {returberErrors}
                    </div>
                )}

                {returberSuccess && (
                    <div>
                        {localization[language].callReturberSuccess}
                    </div>
                )}

                <LinkButton
                    text={localization[language].callNewReturber}
                    onClick={() => {
                        setImage(null);
                        setReturnables([
                            {
                                count: 0,
                                multiplier: returnPrices[language] / 2,
                                max: returnPrices[language],
                            },
                        ]);
                        setCustomTimeText('');
                        setPickTimeType('next-hrs');

                        setReturberErrors('');
                        setReturberCall(false);
                        setReturberSuccess(false);
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh"
        >
            {!image
            && !showLoadingCamera
            && (
                <div
                    className="grid place-content-center h-dvh"
                >
                    <button
                        className="min-w-[310px] lg:min-w-[400px] lg:text-3xl font-bold select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => {
                            setShowLoadingCamera(true);
                            setShowCamera(true);
                        }}
                    >
                        {localization[language].callPictureReturnables}
                    </button>
                </div>
            )}

            {showCamera && (
                <Camera
                    cameraLoaded={cameraLoaded}
                    cancelText={localization[language].cancel}
                    cancelAction={() => {
                        setShowLoadingCamera(false);
                        setShowCamera(false);

                        setCameraLoaded(true);
                    }}
                    handleImage={(image) => {
                        setImage(image);

                        setShowLoadingCamera(false);
                        setShowCamera(false);

                        setCameraLoaded(true);
                    }}
                    setReturnables={setReturnables}
                />
            )}

            {showLoadingCamera && (
                <div
                    className="grid place-content-center"
                >
                    <div
                        className="mt-4 animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-blue-300"
                    />
                </div>
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
                                draggableMarker={true}
                            />
                        </div>
                    ) : (
                        <MapLoader />
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
                            className="rounded-full select-none max-h-[400px] shadow-xl w-auto"
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

                    {returnables.map((returnable, index) => (
                        <ReturnablesCount
                            key={index}
                            returnables={returnable.count}
                            setReturnables={(value) => {
                                const newReturnables = [...returnables];
                                newReturnables[index].count = value;
                                setReturnables(newReturnables);
                            }}
                            returnableMaxValue={returnable.max}
                            setReturnablesMaxValue={(value) => {
                                const newReturnables = [...returnables];
                                newReturnables[index].max = value;
                                setReturnables(newReturnables);
                            }}
                            returnablesMultiplier={returnable.multiplier}
                            setReturnablesMultiplier={(value) => {
                                const newReturnables = [...returnables];
                                newReturnables[index].multiplier = value;
                                setReturnables(newReturnables);
                            }}
                            type={returnables.length > 1 ? `#${index + 1}` : undefined}
                        />
                    ))}

                    <div
                        className="grid place-content-center mt-4 mb-12"
                    >
                        <Image
                            src="/icons/multiple-icon.png"
                            alt="add more"
                            width={32}
                            height={32}
                            onClick={() => {
                                setReturnables([
                                    ...returnables,
                                    {
                                        count: 0,
                                        multiplier: returnPrices[language] / 2,
                                        max: returnPrices[language],
                                    },
                                ]);
                            }}
                            className="cursor-pointer"
                        />
                    </div>

                    <TimePicker
                        pickTimeType={pickTimeType}
                        setPickTimeType={setPickTimeType}
                        customTimeText={customTimeText}
                        setCustomTimeText={setCustomTimeText}
                    />

                    {returnables[0].count > 0 ? (
                        <button
                            className="mt-8 mb-24 w-full text-xl lg:text-3xl select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                            onClick={() => returber()}
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
