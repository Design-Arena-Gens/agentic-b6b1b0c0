'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRideStore } from '@/store/rideStore';

// Fix for default markers in React-Leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDQwQzE1IDQwIDMwIDE5LjUgMzAgMTJDMzAgNS4zNzI1OCAyMy4yODQzIDAgMTUgMEM2LjcxNTcyIDAgMCA1LjM3MjU4IDAgMTJDMCAxOS41IDE1IDQwIDE1IDQwWiIgZmlsbD0iIzBFQTVFOSIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

const destinationIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDQwQzE1IDQwIDMwIDE5LjUgMzAgMTJDMzAgNS4zNzI1OCAyMy4yODQzIDAgMTUgMEM2LjcxNTcyIDAgMCA1LjM3MjU4IDAgMTJDMCAxOS41IDE1IDQwIDE1IDQwWiIgZmlsbD0iI0QyMjZEMyIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -40]
});

function MapUpdater() {
  const map = useMap();
  const { pickup, destination } = useRideStore();

  useEffect(() => {
    if (pickup && destination) {
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [destination.lat, destination.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 13);
    }
  }, [pickup, destination, map]);

  return null;
}

export default function MapView() {
  const { pickup, destination } = useRideStore();

  // Default center: Algiers
  const center: [number, number] = [36.7538, 3.0588];

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapUpdater />

      {pickup && (
        <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
          <Popup>
            <strong>Départ:</strong><br />
            {pickup.address}
          </Popup>
        </Marker>
      )}

      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
          <Popup>
            <strong>Destination:</strong><br />
            {destination.address}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
