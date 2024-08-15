'use client';

import {
    useRef,
    useState,
    useEffect,
} from 'react';

import Map from '@/components/Map/dynamic';
import MapLoader from '@/components/MapLoader';



export default function Collect() {
    const map = useRef<any>();


    const [
        locations,
        setLocations,
    ] = useState([]);

    const [
        selectedLocation,
        setSelectedLocation,
    ] = useState(null);

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
                    />
                </div>
            ) : (
                <MapLoader />
            )}


            {selectedLocation && (
                <>
                    <button
                        className="select-none bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 text-white font-bold py-2 px-8 rounded-full shadow-xl hover:shadow-lg transition duration-200 ease-in-out"
                    >
                        collect
                    </button>
                </>
            )}
        </div>
    );
}
