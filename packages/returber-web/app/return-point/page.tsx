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



export default function Return() {
    const {
        language,
    } = useContext(LanguageContext);


    const map = useRef<any>();


    const [
        location,
        setLocation,
    ] = useState<GeolocationCoordinates | null>(null);


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


            <button
                className="mt-8 mb-24 w-full text-xl lg:text-3xl select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                onClick={() => {}}
            >
                {localization[language].returnAddReturnLocation}
            </button>
        </div>
    );
}
