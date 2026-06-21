"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      className="h-full w-full rounded-[2rem]"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[48.8566, 2.3522]} icon={markerIcon}>
        <Popup>
          Centre de contrôle trafic
        </Popup>
      </Marker>
    </MapContainer>
  );
}