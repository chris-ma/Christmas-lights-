import { useState } from 'react';

function StarDisplay({ average, userRating }) {
  const val = average ? parseFloat(average) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          style={{
            fontSize: '12px',
            opacity: i <= Math.round(val) ? 1 : 0.2,
            filter: i <= Math.round(val) ? 'none' : 'grayscale(1)',
          }}
        >
          🎅
        </span>
      ))}
      {average && (
        <span style={{ fontSize: '11px', color: '#f0c040', marginLeft: '4px' }}>
          {average}
        </span>
      )}
      {userRating && (
        <span style={{ fontSize: '10px', color: '#7eab8a', marginLeft: '2px' }}>✓</span>
      )}
    </div>
  );
}

export default function Sidebar({
  locations,
  isOpen,
  onToggle,
  onViewOnMap,
  getAverageRating,
  getUserRating,
  totalCount,
  filteredCount,
}) {
  return (
    <div
      className="sidebar"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        width: isOpen ? '300px' : '0',
        overflow: 'hidden',
      }}
    >
      {/* Toggle tab */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close location list' : 'Open location list'}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-32px',
          transform: 'translateY(-50%)',
          width: '32px',
          height: '64px',
          background: '#0d1f12',
          border: '1px solid #1e3a28',
          borderLeft: 'none',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7eab8a',
          fontSize: '16px',
          zIndex: 1001,
        }}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Sidebar panel */}
      <div
        style={{
          width: '300px',
          height: '100%',
          background: '#0d1f12',
          borderRight: '1px solid #1e3a28',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid #1e3a28',
            flexShrink: 0,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#f0c040',
              marginBottom: '2px',
            }}
          >
            🎄 Displays ({filteredCount})
          </h2>
          {filteredCount < totalCount && (
            <p style={{ fontSize: '11px', color: '#7eab8a' }}>
              {totalCount - filteredCount} hidden by filters
            </p>
          )}
        </div>

        {/* Location list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {locations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#7eab8a', fontSize: '13px' }}>
              No locations match your filters.
            </div>
          ) : (
            locations.map(loc => (
              <div
                key={loc.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '6px',
                  background: '#112318',
                  border: '1px solid #1e3a28',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#1a7a3c')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e3a28')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#e8f5e9',
                        marginBottom: '1px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {loc.address}
                    </p>
                    <p style={{ fontSize: '11px', color: '#7eab8a', marginBottom: '6px' }}>
                      {loc.suburb} · {loc.region}
                    </p>
                    <StarDisplay
                      average={getAverageRating(loc.id)}
                      userRating={getUserRating(loc.id)}
                    />
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '9px',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        background: loc.status === 'confirmed' ? '#1a7a3c' : '#333344',
                        color: '#fff',
                        fontWeight: 600,
                      }}
                    >
                      {loc.status === 'confirmed' ? '✓' : '?'}
                    </span>
                    <button
                      onClick={() => onViewOnMap(loc)}
                      style={{
                        fontSize: '10px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'transparent',
                        border: '1px solid #1e3a28',
                        color: '#7eab8a',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#1a7a3c';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#7eab8a';
                      }}
                    >
                      View map
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
