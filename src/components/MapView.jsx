import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationCard from './LocationCard';

// Fix default icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createMarkerIcon(status) {
  const color = status === 'confirmed' ? '#1a7a3c' : '#555566';
  const borderColor = status === 'confirmed' ? '#f0c040' : '#888899';
  const symbol = status === 'confirmed' ? '🎄' : '?';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.5"/>
        </filter>
      </defs>
      <path d="M16 0 C7.163 0 0 7.163 0 16 C0 27 16 42 16 42 C16 42 32 27 32 16 C32 7.163 24.837 0 16 0Z"
        fill="${color}" stroke="${borderColor}" stroke-width="2" filter="url(#shadow)"/>
      <text x="16" y="22" text-anchor="middle" font-size="14" dominant-baseline="middle">${symbol}</text>
    </svg>`;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
}

function FlyToLocation({ target }) {
  const map = useMap();
  if (target) {
    map.flyTo([target.lat, target.lng], 16, { duration: 1.2 });
  }
  return null;
}

export default function MapView({
  locations,
  flyToTarget,
  getAverageRating,
  getRatingCount,
  getUserRating,
  onSubmitRating,
}) {
  const markerRefs = useRef({});

  const openPopup = (id) => {
    const marker = markerRefs.current[id];
    if (marker) marker.openPopup();
  };

  // Expose openPopup via a prop callback if needed
  MapView.openPopupForId = openPopup;

  return (
    <MapContainer
      center={[-33.87, 151.21]}
      zoom={11}
      style={{ flex: 1, width: '100%', minHeight: 0 }}
      zoomControl={true}
      aria-label="Interactive map of Sydney Christmas light displays"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {flyToTarget && <FlyToLocation target={flyToTarget} />}

      {locations.map(loc => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createMarkerIcon(loc.status)}
          ref={el => { if (el) markerRefs.current[loc.id] = el; }}
          aria-label={`${loc.address}, ${loc.suburb}`}
        >
          <Popup maxWidth={300} minWidth={300}>
            <LocationCard
              location={loc}
              average={getAverageRating(loc.id)}
              count={getRatingCount(loc.id)}
              userRating={getUserRating(loc.id)}
              onSubmitRating={onSubmitRating}
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
