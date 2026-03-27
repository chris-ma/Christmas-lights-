import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { locations } from './data/locations';
import { useRatings } from './hooks/useRatings';
import { useWindowSize } from './hooks/useWindowSize';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [showConfirmedOnly, setShowConfirmedOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flyToTarget, setFlyToTarget] = useState(null);

  const { isMobile } = useWindowSize();

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
    if (isMobile) setSidebarOpen(false);
  }

  const sharedSidebarProps = {
    locations: filteredLocations,
    isOpen: sidebarOpen,
    onToggle: () => setSidebarOpen(v => !v),
    onViewOnMap: handleViewOnMap,
    getAverageRating,
    getUserRating,
    totalCount: locations.length,
    filteredCount: filteredLocations.length,
  };

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        showConfirmedOnly={showConfirmedOnly}
        onToggleConfirmed={() => setShowConfirmedOnly(v => !v)}
      />

      {/* Map + Sidebar layer */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>

        {/* Desktop: left sidebar panel */}
        {!isMobile && (
          <Sidebar {...sharedSidebarProps} variant="desktop" />
        )}

        {/* Map */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            left: !isMobile && sidebarOpen ? '320px' : 0,
            transition: 'left 0.35s ease',
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

        {/* Mobile: bottom sheet */}
        {isMobile && (
          <Sidebar {...sharedSidebarProps} variant="mobile" />
        )}
      </div>
    </div>
  );
}
