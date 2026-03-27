import { ALL_REGIONS } from '../data/locations';

const REGION_EMOJI = {
  'All Regions': '🗺️',
  'CBD': '🏙️',
  'Inner West': '🏘️',
  'Eastern Suburbs': '🌊',
  'Western Sydney': '⭐',
  'Northern Beaches': '🏖️',
  'Hills District': '🌳',
  'South West': '🏡',
};

export default function FilterBar({ selectedRegion, onRegionChange, showConfirmedOnly, onToggleConfirmed }) {
  return (
    <div
      style={{
        background: '#0c1d12',
        borderBottom: '1px solid #1f3d28',
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Confirmed toggle — first so it's always visible */}
      <button
        onClick={onToggleConfirmed}
        aria-pressed={showConfirmedOnly}
        className={`btn btn-chip ${showConfirmedOnly ? 'gold-active' : ''}`}
        style={{ flexShrink: 0 }}
      >
        ✅ Confirmed
      </button>

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: '#1f3d28', flexShrink: 0 }} />

      {/* Region chips */}
      {ALL_REGIONS.map(region => (
        <button
          key={region}
          onClick={() => onRegionChange(region)}
          aria-pressed={selectedRegion === region}
          className={`btn btn-chip ${selectedRegion === region ? 'active' : ''}`}
          style={{ flexShrink: 0 }}
        >
          {REGION_EMOJI[region] || '📍'} {region}
        </button>
      ))}
    </div>
  );
}
