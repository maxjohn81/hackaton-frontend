"use client";

import { useEffect, useMemo, useState } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface Intersection {
 id: string;
 lat: number;
 lng: number;
 nom: string;
 adresse: string;
}

interface Car {
 id: number;
 lat: number;
 lng: number;
}

const intersections: Intersection[] = [
 {
  id: "F-101",
  lat: -21.4527,
  lng: 47.0857,
  nom: "Centre Ville",
  adresse: "Avenue de l’Indépendance",
 },
 {
  id: "F-102",
  lat: -21.4485,
  lng: 47.0892,
  nom: "Ankofafa",
  adresse: "Route de Toliara",
 },
 {
  id: "F-103",
  lat: -21.4591,
  lng: 47.081,
  nom: "Ambozontany",
  adresse: "Quartier résidentiel",
 },
];

export default function TrafficMap() {
 const [activeId, setActiveId] = useState("F-101");
 const [cars, setCars] = useState<Car[]>([
  { id: 1, lat: -21.4527, lng: 47.0857 },
  { id: 2, lat: -21.4485, lng: 47.0892 },
 ]);

 const activeIntersection = useMemo(
  () => intersections.find((i) => i.id === activeId),
  [activeId]
 );

 // 🚗 simulation trafic
 useEffect(() => {
  const interval = setInterval(() => {
   setCars((prev) =>
    prev.map((c) => ({
     ...c,
     lat: c.lat + (Math.random() - 0.5) * 0.001,
     lng: c.lng + (Math.random() - 0.5) * 0.001,
    }))
   );
  }, 1200);

  return () => clearInterval(interval);
 }, []);

 // 🛣️ route (geojson)
 const route = {
  type: "Feature",
  geometry: {
   type: "LineString",
   coordinates: intersections.map((i) => [i.lng, i.lat]),
  },
 };

 return (
  <Map
   initialViewState={{
    latitude: -21.4527,
    longitude: 47.0857,
    zoom: 14,
   }}
   style={{ width: "100%", height: "100vh" }}
   mapStyle="https://api.maptiler.com/maps/satellite/style.json?key=W0hv9LBqvHML0snhFCiI" 
     >
   {/* 🛣️ ROUTE */}
   <Source id="route" type="geojson" data={route}>
    <Layer
     id="route-line"
     type="line"
     paint={{
      "line-color": "#3b82f6",
      "line-width": 4,
     }}
    />
   </Source>

   {/* 📍 INTERSECTIONS */}
   {intersections.map((it) => (
    <Marker
     key={it.id}
     latitude={it.lat}
     longitude={it.lng}
     onClick={() => setActiveId(it.id)}
    >
     <div
      className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer ${it.id === activeId ? "bg-amber-500 scale-125" : "bg-red-500"
       }`}
     />
    </Marker>
   ))}

   {/* ℹ️ POPUP actif */}
   {activeIntersection && (
    <Popup
     latitude={activeIntersection.lat}
     longitude={activeIntersection.lng}
     closeButton={false}
     closeOnClick={false}
    >
     <div>
      <strong>{activeIntersection.nom}</strong>
      <br />
      {activeIntersection.adresse}
     </div>
    </Popup>
   )}

   {/* 🚗 VOITURES */}
   {cars.map((car) => (
    <Marker key={car.id} latitude={car.lat} longitude={car.lng}>
     <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
    </Marker>
   ))}
  </Map>
 );
}