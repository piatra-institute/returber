'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Tensor } from 'onnxruntime-web';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    PickTimeType,
    returnPrices,
    environment,
    yoloClasses,
    closeX,
} from '@/data/index';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import CameraLoader from '@/components/CameraLoader';
import ImageViewer from '@/components/ImageViewer';
import ReturnablesCount from '@/components/ReturnablesCount';
import TimePicker from '@/components/TimePicker';
import LinkButton from '@/components/LinkButton';



export default function Call() {
    const router = useRouter();


    const {
        language,
    } = useContext(LanguageContext);


    const mounted = useRef(false);
    const map = useRef<any>();


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
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
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

    const handleImageAnalysis = (
        tensor: Tensor,
    ) => {
        let returnables = 0;
        for (let i = 0; i < tensor.dims[0]; i++) {
            const result = tensor.data.slice(
                i * 7,
                i * 7 + 7
            );
            const cls_id = result[5] as string;
            const label =  (yoloClasses as any)[cls_id];
            if (label === 'bottle') {
                returnables += 1;
            }
        }

        setReturnables(r => [
            {
                ...r[0],
                count: returnables,
            },
        ]);
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

                <div
                    className="text-center font-bold"
                    onClick={() => {
                        router.back();
                    }}
                >
                    {localization[language].home}
                </div>
            </div>
        );
    }

    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh"
        >
            <CameraLoader
                takePictureText={localization[language].callPictureReturnables}
                image={image}
                setImage={setImage}
                setLocation={setLocation}
                handleImageAnalysis={handleImageAnalysis}
            />

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

                    <ImageViewer
                        image={image}
                        setImage={setImage}
                    />

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
                            multiples={returnables.length > 1}
                        />
                    ))}

                    <div
                        className="flex items-center justify-center mt-4 mb-12"
                    >
                        <Image
                            src="/icons/different-returnables-icon.svg"
                            alt="different returnables"
                            width={48}
                            height={48}
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

                        {returnables.length > 1 && (
                            <button
                                onClick={() => {
                                    setReturnables(returnables.slice(0, -1));
                                }}
                                className="cursor-pointer ml-2"
                            >
                                {closeX}
                            </button>
                        )}
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
