'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import Link from 'next/link';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    environment,
} from '@/data/index';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import CameraLoader from '@/components/CameraLoader';
import ImageViewer from '@/components/ImageViewer';
import Toggle from '@/components/Toggle';
import LinkButton from '@/components/LinkButton';



export default function Return() {
    const {
        language,
    } = useContext(LanguageContext);


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
        activePoint,
        setActivePoint,
    ] = useState(true);

    const [
        queue,
        setQueue,
    ] = useState(0);


    const [
        returnPointErrors,
        setReturnPointErrors,
    ] = useState('');

    const [
        returnPointCall,
        setReturnPointCall,
    ] = useState(false);

    const [
        returnPointSuccess,
        setReturnPointSuccess,
    ] = useState(false);


    const createReturnPoint = async () => {
        setReturnPointCall(true);

        try {
            if (!location || !image) {
                return;
            }

            const data = {
                image,
                location,
                status: activePoint ? 'active' : 'inactive',
                queue,
            };

            const request = await fetch(environment.API + '/create-return-point', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();

            if (!response.status) {
                setReturnPointErrors(
                    localization[language].somethingWentWrongTryAgain,
                );
                setReturnPointSuccess(false);
            } else {
                setReturnPointSuccess(true);
            }
        } catch (error) {
            setReturnPointErrors(
                localization[language].somethingWentWrongTryAgain,
            );
            setReturnPointSuccess(false);
        }
    }


    useEffect(() => {
        const loadLocation = async () => {
            window.navigator.geolocation.getCurrentPosition((data) => {
                setLocation(data.coords);
            });
        }

        loadLocation();
    }, []);


    if (returnPointCall) {
        return (
            <div
                className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center gap-12"
            >
                {returnPointErrors && (
                    <div>
                        {returnPointErrors}
                    </div>
                )}

                {returnPointSuccess && (
                    <div>
                        {localization[language].returnPointCreatedSuccess}
                    </div>
                )}

                <Link
                    href="/"
                >
                    <LinkButton
                        text={localization[language].home}
                        onClick={() => {}}
                    />
                </Link>
            </div>
        );
    }

    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh"
        >
            <CameraLoader
                takePictureText={localization[language].returnPointPicturePoint}
                image={image}
                setImage={setImage}
                setLocation={setLocation}
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

                    <Toggle
                        text={
                            activePoint
                                ? localization[language].active
                                : localization[language].inactive
                        }
                        checked={activePoint}
                        toggle={() => {
                            setActivePoint(!activePoint);
                        }}
                    />

                    <div
                        className="flex items-center justify-center mt-12 mb-12"
                    >
                        <span>
                            {localization[language].queue}
                        </span>

                        <input
                            value={queue}
                            min={0}
                            step={1}
                            type="number"
                            inputMode="numeric"
                            lang="en"
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (isNaN(value)) {
                                    return;
                                }

                                setQueue(value);
                            }}
                            className="w-[70px] mx-2 text-right px-2 rounded-full"
                        />

                        <span>
                            {localization[language].people}
                        </span>
                    </div>

                    <button
                        className="mt-8 mb-24 w-full text-xl lg:text-3xl select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                        onClick={() => {
                            createReturnPoint();
                        }}
                    >
                        {localization[language].returnAddReturnLocation}
                    </button>
                </>
            )}
        </div>
    );
}
