import { ALL_REGIONS } from '../data/locations';

const REGION_EMOJI = {
  'All Regions':      '🗺️',
  'CBD':              '🏙️',
  'Inner West':       '🏘️',
  'Eastern Suburbs':  '🌊',
  'Western Sydney':   '⭐',
  'Northern Beaches': '🏖️',
  'Hills District':   '🌳',
  'South West':       '🏡',
};

export default function FilterBar({ selectedRegion, onRegionChange, showConfirmedOnly, onToggleConfirmed }) {
  return (
    <div style={{
      background: '#fff',
      borderBottom: '2.5px solid var(--card-border)',
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexShrink: 0,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      WebkitOverflowScrolling: 'touch',
    }}>
      {/* Confirmed toggle first — always visible */}
      <button
        onClick={onToggleConfirmed}
        aria-pressed={showConfirmedOnly}
        className={`btn btn-chip ${showConfirmedOnly ? 'gold-active' : ''}`}
        style={{ flexShrink: 0 }}
      >
        ✅ Confirmed
      </button>

      <div style={{ width: '2px', height: '28px', background: 'var(--card-border)', flexShrink: 0 }} />

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
