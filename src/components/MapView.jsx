import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// leaflet CSS imported globally in main.jsx
import LocationCard from './LocationCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createMarkerIcon(status) {
  const color = status === 'confirmed' ? '#e63946' : '#aaaaaa';
  const borderColor = status === 'confirmed' ? '#fff' : '#ddd';
  const symbol = status === 'confirmed' ? '🎄' : '?';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
      <defs>
        <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-opacity="0.35"/>
        </filter>
      </defs>
      <path d="M18 0 C8.059 0 0 8.059 0 18 C0 30 18 48 18 48 C18 48 36 30 36 18 C36 8.059 27.941 0 18 0Z"
        fill="${color}" stroke="${borderColor}" stroke-width="2.5" filter="url(#sh)"/>
      <text x="18" y="24" text-anchor="middle" font-size="16" dominant-baseline="middle">${symbol}</text>
    </svg>`;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -50],
  });
}

function FlyToLocation({ target }) {
  const map = useMap();
  if (target) map.flyTo([target.lat, target.lng], 16, { duration: 1.2 });
  return null;
}

export default function MapView({
  locations,
  flyToTarget,
  isMobile,
  onMarkerClick,
  getAverageRating,
  getRatingCount,
  getUserRating,
  onSubmitRating,
}) {
  const markerRefs = useRef({});

  return (
    <MapContainer
      center={[-33.87, 151.21]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
      aria-label="Interactive map of Sydney Christmas light displays"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
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
          eventHandlers={isMobile ? { click: () => onMarkerClick(loc) } : undefined}
        >
          {/* Desktop only — Leaflet popup anchored to marker */}
          {!isMobile && (
            <Popup maxWidth={320} minWidth={320}>
              <LocationCard
                location={loc}
                average={getAverageRating(loc.id)}
                count={getRatingCount(loc.id)}
                userRating={getUserRating(loc.id)}
                onSubmitRating={onSubmitRating}
              />
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}
