'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
} from '@/data/index';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import CameraLoader from '@/components/CameraLoader';
import ImageViewer from '@/components/ImageViewer';
import Toggle from '@/components/Toggle';



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


    useEffect(() => {
        const loadLocation = async () => {
            window.navigator.geolocation.getCurrentPosition((data) => {
                setLocation(data.coords);
            });
        }

        loadLocation();
    }, []);


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
                        onClick={() => {}}
                    >
                        {localization[language].returnAddReturnLocation}
                    </button>
                </>
            )}
        </div>
    );
}
