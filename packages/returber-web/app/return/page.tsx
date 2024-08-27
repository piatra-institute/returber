'use client';

import {
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
    LanguageContext,
} from '@/app/context';

import {
    localization,
    ReturberLocation,
    environment,
} from '@/data/index';

import ReturberHome from '@/components/ReturberHome';
import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';
import LinkButton from '@/components/LinkButton';
import ImageViewer from '@/components/ImageViewer';

import {
    formatIsoString,
} from '@/logic/time';



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
        <div
            className="flex flex-col items-center justify-center text-center"
        >
            <Image
                src={item.status === 'active'
                    ? '/icons/valid-icon.svg'
                    : '/icons/invalid-icon.svg'
                }
                alt="status"
                width={20}
                height={20}
                draggable={false}
                className="select-none"
            />

            {item.status === 'active' ? (
                <>
                    <div
                        className="flex items-center justify-center mt-2"
                    >
                        <Image
                            src="/icons/queue-icon.svg"
                            alt="queue"
                            width={40}
                            height={40}
                            draggable={false}
                            className="select-none"
                        />

                        <div
                            className="text-lg"
                        >
                            {item.queue}
                        </div>
                    </div>

                    <div
                        className="mt-2"
                    >
                        @ {formatIsoString(item.queueUpdatedAt)}
                    </div>
                </>
            ) : (
                <div
                    className="mt-2"
                >
                    @ {formatIsoString(item.statusUpdatedAt)}
                </div>
            )}
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

                setLocations(data);
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
            <ReturberHome />

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

            <div
                className="pb-14"
            >
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
