import { useState, useMemo, useRef } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { locations, REGIONS } from './data/locations';
import { useRatings } from './hooks/useRatings';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [showConfirmedOnly, setShowConfirmedOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [flyToTarget, setFlyToTarget] = useState(null);

  const allIds = useMemo(() => locations.map(l => l.id), []);
  const { submitRating, getAverageRating, getUserRating, getRatingCount } = useRatings(allIds);

  const filteredLocations = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return locations.filter(loc => {
      if (showConfirmedOnly && loc.status !== 'confirmed') return false;
      if (selectedRegion !== 'All Regions' && loc.region !== selectedRegion) return false;
      if (q && !loc.address.toLowerCase().includes(q) && !loc.suburb.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [searchQuery, selectedRegion, showConfirmedOnly]);

  function handleViewOnMap(loc) {
    setFlyToTarget({ ...loc, _ts: Date.now() });
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        showConfirmedOnly={showConfirmedOnly}
        onToggleConfirmed={() => setShowConfirmedOnly(v => !v)}
      />

      {/* Map + Sidebar layer */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
        <Sidebar
          locations={filteredLocations}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(v => !v)}
          onViewOnMap={handleViewOnMap}
          getAverageRating={getAverageRating}
          getUserRating={getUserRating}
          totalCount={locations.length}
          filteredCount={filteredLocations.length}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: sidebarOpen ? '300px' : '0',
            right: 0,
            bottom: 0,
            transition: 'left 0.3s ease',
          }}
        >
          <MapView
            locations={filteredLocations}
            flyToTarget={flyToTarget}
            getAverageRating={getAverageRating}
            getRatingCount={getRatingCount}
            getUserRating={getUserRating}
            onSubmitRating={submitRating}
          />
        </div>
      </div>
    </div>
  );
}
