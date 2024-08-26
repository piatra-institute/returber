'use client';

import {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    ReturberLocation,
    environment,
} from '@/data/index';

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
        <>
            <div>
                @ {formatIsoString(item.createdAt)}
            </div>

            <div>
                {item.returnables.reduce((acc: any, item: any) => item.count + acc, 0)} items
            </div>
        </>
    );
}


export default function Collect() {
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
        const loadLocations = async () => {
            try {
                if (!location) {
                    return;
                }

                const response = await fetch(environment.API + '/get-returber-tasks', {
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
                    <ImageViewer
                        image={locations[selectedLocation].image}
                        setImage={() => {
                            setSelectedLocation(null);
                        }}
                    />

                    <LinkButton
                        text="collect"
                        onClick={() => {
                            const {
                                latitude,
                                longitude,
                            } = locations[selectedLocation];

                            window.open(
                                `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
                            );
                        }}
                    />
                </div>
            )}
        </div>
    );
}
