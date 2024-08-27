import {
    useRef,
    useMemo,
} from 'react';

import L from 'leaflet';

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {
    ReturberLocation,
} from '@/data/index';



const markerIcon = L.icon({
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -40],
});

const markerCollectIcon = L.icon({
    iconUrl: '/marker-icon-original.png',
    shadowUrl: '/marker-shadow.png',
    iconAnchor: [12, 41],
    popupAnchor: [1, -40],
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
    markers,
    atMarkerClick,
    MarkerRender,
}: {
    location: GeolocationCoordinates;
    map: React.RefObject<L.Map>;
    atNewLocation: (location: { lat: number; lng: number }) => void;
    draggableMarker?: boolean;
    markers?: ReturberLocation[];
    atMarkerClick?: (index: number) => void;
    MarkerRender?: React.ComponentType<
        {
            item: any;
            index: number;
            onClick: (index: number) => void;
        }
    >;
}) {
    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={20}
            scrollWheelZoom={true}
            zoomControl={false}
            minZoom={12}
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

            {markers && markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{
                        lat: marker.latitude,
                        lng: marker.longitude,
                    }}
                    icon={markerCollectIcon}
                    eventHandlers={{
                        click: () => {
                            if (!atMarkerClick) {
                                return;
                            }

                            atMarkerClick(index);
                        },
                    }}
                >
                    <Popup>
                        <div
                            className="grid place-items-center gap-4"
                        >
                            <h2>
                                {marker.name}
                            </h2>

                            {MarkerRender
                            && atMarkerClick
                            && (
                                <MarkerRender
                                    item={marker}
                                    index={index}
                                    onClick={atMarkerClick}
                                />
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
