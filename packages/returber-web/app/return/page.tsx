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
    environment,
} from '@/data/index';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import LinkButton from '@/components/LinkButton';
import ImageViewer from '@/components/ImageViewer';



function MarkerRender({
    item,
    index,
    onClick,
} : {
    item: any;
    index: number;
    onClick: (index: number) => void;
}) {
    return (
        <div>
            {item.status + ' ' + item.queue}
        </div>
    );
}


export default function Return() {
    const {
        language,
    } = useContext(LanguageContext);


    const map = useRef<any>();


    const [
        locations,
        setLocations,
    ] = useState<ReturberLocation[]>([]);

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
        const loadLocations = async () => {
            try {
                if (!location) {
                    return;
                }

                const response = await fetch(environment.API + '/get-return-points', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        location: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                        },
                    }),
                });
                const request = await response.json();

                if (!request.status) {
                    return;
                }

                const {
                    data,
                } = request;

                const locations = data.map((location: any) => {
                    return {
                        id: location.id,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        name: location.name,
                        image: location.image,
                        status: location.status,
                        queue: location.queue,
                    };
                });

                setLocations(locations);
            } catch (error) {
                console.error(error);
            }
        }

        loadLocations();
    }, [
        location,
    ]);


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
                        MarkerRender={MarkerRender}
                    />
                </div>
            ) : (
                <MapLoader />
            )}

            {selectedLocation !== null && (
                <div
                    className="grid place-items-center"
                >
                    <h2
                        className="text-lg mb-6"
                    >
                        {locations[selectedLocation].name}
                    </h2>

                    <ImageViewer
                        image={locations[selectedLocation].image}
                        setImage={() => {
                            setSelectedLocation(null);
                        }}
                    />
                </div>
            )}

            <div>
                <Link
                    href={
                        selectedLocation === null
                            ? '/return-point'
                            : `/return-point/${locations[selectedLocation].id}`
                    }
                    tabIndex={-1}
                    draggable={false}
                >
                    <LinkButton
                        text={selectedLocation === null
                            ? localization[language].returnAddReturnLocation
                            : localization[language].returnEditReturnLocation
                        }
                    />
                </Link>
            </div>
        </div>
    );
}
