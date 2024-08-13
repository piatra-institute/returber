import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



export default function Map({
    location,
    map,
}: {
    location: GeolocationCoordinates;
    map: React.RefObject<L.Map>;
}) {
    return (
        <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={14} scrollWheelZoom={true}
            className="shadow-xl h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full"
            ref={map}
        >
            <TileLayer
                attribution=""
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[location.latitude, location.longitude]}>
                <Popup>
                    popup
                </Popup>
            </Marker>
        </MapContainer>
    );
}
