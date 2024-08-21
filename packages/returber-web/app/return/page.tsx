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
    ReturberLocation,
} from '@/data/index';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import LinkButton from '@/components/LinkButton';



export default function Return() {
    const {
        language,
    } = useContext(LanguageContext);


    const map = useRef<any>();


    const [
        locations,
        setLocations,
    ] = useState<ReturberLocation[]>([
    ]);

    const [
        selectedLocation,
        setSelectedLocation,
    ] = useState<number | null>(null);

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

    useEffect(() => {
        // load locations
    }, []);


    return (
        <div
            className="grid place-items-center h-dvh"
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
                        draggableMarker={false}
                        markers={locations}
                        atMarkerClick={(index) => {
                            setSelectedLocation(index);
                        }}
                    />
                </div>
            ) : (
                <MapLoader />
            )}

            {selectedLocation !== null && (
                <div
                    className="grid place-items-center"
                >
                    <h2>
                        {locations[selectedLocation].title}
                    </h2>
                </div>
            )}

            <div>
                <Link
                    href="/return-point"
                    tabIndex={-1}
                    draggable={false}
                >
                    <LinkButton
                        text={localization[language].returnAddReturnLocation}
                    />
                </Link>
            </div>
        </div>
    );
}
