'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    useRouter,
    useParams,
} from 'next/navigation';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    environment,
    ROUTES,
} from '@/data/index';

import ReturberHome from '@/components/ReturberHome';
import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import CameraLoader from '@/components/CameraLoader';
import ImageViewer from '@/components/ImageViewer';
import Toggle from '@/components/Toggle';

import {
    useVolatileStore,
} from '@/store';



export default function Return() {
    const router = useRouter();
    const params = useParams();


    const {
        language,
    } = useContext(LanguageContext);


    const map = useRef<any>();


    const {
        setShowLoading,
    } = useVolatileStore();


    const [
        editMode,
        setEditMode,
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
        setShowLoading(true);

        setReturnPointCall(true);

        try {
            if (!location || !image) {
                setShowLoading(false);
                return;
            }

            const data = {
                image,
                location: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
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

            setShowLoading(false);
        } catch (error) {
            setReturnPointErrors(
                localization[language].somethingWentWrongTryAgain,
            );
            setReturnPointSuccess(false);

            setShowLoading(false);
        }
    }

    const editReturnPoint = async () => {
        setShowLoading(true);

        try {
            const id = params.id[0];
            const data = {
                id,
                status: activePoint ? 'active' : 'inactive',
                queue,
            };

            const request = await fetch(environment.API + '/update-return-point', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();

            setShowLoading(false);

            if (response.status) {
                router.push(ROUTES.return);
            }
        } catch (error) {
            setShowLoading(false);
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

    useEffect(() => {
        if (params.id) {
            setEditMode(true);

            const loadReturnPoint = async () => {
                try {
                    const id = params.id[0];

                    const request = await fetch(environment.API + '/get-return-point-by-id', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id,
                        }),
                    });
                    const response = await request.json();

                    if (!response.status) {
                    } else {
                        const {
                            image,
                            latitude,
                            longitude,
                            status,
                            queue,
                        } = response.data;

                        setImage(image);
                        setLocation({
                            latitude,
                            longitude,
                            accuracy: 0,
                            altitude: 0,
                            altitudeAccuracy: 0,
                            heading: 0,
                            speed: 0,
                        });
                        setActivePoint(status === 'active');
                        setQueue(queue);
                    }

                    setShowLoading(false);
                } catch (error) {
                    setShowLoading(false);
                }
            }

            loadReturnPoint();
        }
    }, [
        params,
        setShowLoading,
    ]);


    if (returnPointCall) {
        return (
            <div
                className="max-w-[320px] md:max-w-[400px] m-auto h-dvh grid place-content-center gap-12"
            >
                <ReturberHome />

                {returnPointErrors && (
                    <div
                        className="text-center"
                    >
                        {returnPointErrors}
                    </div>
                )}

                {returnPointSuccess ? (
                    <div
                        className="text-center"
                    >
                        {localization[language].returnPointCreatedSuccess}
                    </div>
                ) : (
                    <div
                        style={{
                            height: '24px',
                        }}
                    />
                )}
            </div>
        );
    }

    return (
        <div
            className="max-w-[320px] md:max-w-[400px] m-auto h-dvh"
        >
            <ReturberHome
                absolute={!image}
            />

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
                                draggableMarker={editMode ? false : true}
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
                            onFocus={(e) => {
                                e.target.select();
                            }}
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
                            if (editMode) {
                                editReturnPoint();
                            } else {
                                createReturnPoint();
                            }
                        }}
                    >
                        {editMode
                            ? localization[language].returnEditReturnLocation
                            : localization[language].returnAddReturnLocation
                        }
                    </button>
                </>
            )}
        </div>
    );
}
