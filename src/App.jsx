import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import MobileModal from './components/MobileModal';
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
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const ratingProps = { getAverageRating, getRatingCount, getUserRating, onSubmitRating: submitRating };

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        showConfirmedOnly={showConfirmedOnly}
        onToggleConfirmed={() => setShowConfirmedOnly(v => !v)}
      />

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>

        {!isMobile && (
          <Sidebar
            locations={filteredLocations}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(v => !v)}
            onViewOnMap={handleViewOnMap}
            totalCount={locations.length}
            filteredCount={filteredLocations.length}
            {...ratingProps}
            variant="desktop"
          />
        )}

        <div style={{
          position: 'absolute', inset: 0,
          left: !isMobile && sidebarOpen ? '340px' : 0,
          transition: 'left 0.35s ease',
        }}>
          <MapView
            locations={filteredLocations}
            flyToTarget={flyToTarget}
            isMobile={isMobile}
            onMarkerClick={loc => { setSelectedLocation(loc); setSidebarOpen(false); }}
            {...ratingProps}
          />
        </div>

        {isMobile && (
          <Sidebar
            locations={filteredLocations}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(v => !v)}
            onViewOnMap={handleViewOnMap}
            totalCount={locations.length}
            filteredCount={filteredLocations.length}
            {...ratingProps}
            variant="mobile"
          />
        )}

        {/* Mobile centred modal */}
        {isMobile && selectedLocation && (
          <MobileModal
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
            {...ratingProps}
          />
        )}
      </div>
    </div>
  );
}
