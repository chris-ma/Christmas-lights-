import { ALL_REGIONS } from '../data/locations';

export default function FilterBar({ selectedRegion, onRegionChange, showConfirmedOnly, onToggleConfirmed }) {
  return (
    <div
      style={{
        background: '#0d1f12',
        borderBottom: '1px solid #1e3a28',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <span style={{ fontSize: '12px', color: '#7eab8a', whiteSpace: 'nowrap', fontWeight: 500 }}>
        Filter:
      </span>

      {/* Region chips */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
        {ALL_REGIONS.map(region => (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            aria-pressed={selectedRegion === region}
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: selectedRegion === region ? '#1a7a3c' : '#1e3a28',
              background: selectedRegion === region ? '#1a7a3c' : 'transparent',
              color: selectedRegion === region ? '#fff' : '#7eab8a',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              fontFamily: 'inherit',
            }}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '20px', background: '#1e3a28', flexShrink: 0, margin: '0 4px' }} />

      {/* Confirmed toggle */}
      <button
        onClick={onToggleConfirmed}
        aria-pressed={showConfirmedOnly}
        style={{
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: showConfirmedOnly ? '#f0c040' : '#1e3a28',
          background: showConfirmedOnly ? 'rgba(240,192,64,0.15)' : 'transparent',
          color: showConfirmedOnly ? '#f0c040' : '#7eab8a',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'all 0.15s ease',
          fontFamily: 'inherit',
        }}
      >
        ✓ Confirmed 2025
      </button>
    </div>
  );
}
