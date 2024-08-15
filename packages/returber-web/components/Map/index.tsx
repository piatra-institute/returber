import {
    useRef,
    useMemo,
} from 'react';

import L from 'leaflet';

import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const markerIcon = L.icon({
    iconAnchor: [12, 41],
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
});


function DraggableMarker({
    center,
    atNewLocation,
} : {
    center: {
        lat: number;
        lng: number;
    },
    atNewLocation: (location: { lat: number; lng: number }) => void;
}) {
    const markerRef = useRef<any>(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const newLocation = marker.getLatLng();
                    atNewLocation({
                        lat: newLocation.lat,
                        lng: newLocation.lng,
                    });
                }
            },
        }),
        [
            atNewLocation,
        ],
    );

    const map = useMapEvents({
        dragend() {
            const center = map.getCenter();
            atNewLocation({
                lat: center.lat,
                lng: center.lng,
            });
        },
        locationfound(e) {
            atNewLocation({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
            });
            map.flyTo(e.latlng, map.getZoom());
        },
        dblclick(e) {
            map.locate();
        },
    });

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={center}
            icon={markerIcon}
            ref={markerRef}
        />
    );
}



export default function Map({
    location,
    map,
    atNewLocation,
    draggableMarker,
}: {
    location: GeolocationCoordinates;
    map: React.RefObject<L.Map>;
    atNewLocation: (location: { lat: number; lng: number }) => void;
    draggableMarker?: boolean;
}) {
    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={20}
            scrollWheelZoom={true}
            zoomControl={false}
            className="shadow-xl h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full"
            ref={map}
        >
            <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {draggableMarker ? (
                <DraggableMarker
                    center={{
                        lat: location.latitude,
                        lng: location.longitude,
                    }}
                    atNewLocation={atNewLocation}
                />
            ) : (
                <Marker
                    position={{
                        lat: location.latitude,
                        lng: location.longitude
                    }}
                    icon={markerIcon}
                />
            )}
        </MapContainer>
    );
}
