function StarDisplay({ average, userRating }) {
  const val = average ? parseFloat(average) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          style={{
            fontSize: '16px',
            opacity: i <= Math.round(val) ? 1 : 0.2,
            filter: i <= Math.round(val) ? 'none' : 'grayscale(1)',
          }}
        >
          🎅
        </span>
      ))}
      {average && (
        <span style={{ fontSize: '12px', color: '#ffd23f', marginLeft: '5px', fontWeight: 700 }}>
          {average}
        </span>
      )}
      {userRating && (
        <span style={{ fontSize: '11px', color: '#1e8a45', marginLeft: '2px' }}>✓</span>
      )}
    </div>
  );
}

function LocationListItem({ loc, onViewOnMap, average, userRating }) {
  return (
    <div
      style={{
        padding: '14px',
        borderRadius: '14px',
        marginBottom: '8px',
        background: '#0e2416',
        border: '1.5px solid #1f3d28',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#1e8a45')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1f3d28')}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        {/* Status dot */}
        <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px' }}>
          {loc.status === 'confirmed' ? '🎄' : '❓'}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '14px', fontWeight: 700, color: '#eaf5ec',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            marginBottom: '2px',
          }}>
            {loc.address}
          </p>
          <p style={{ fontSize: '12px', color: '#7aaa87', marginBottom: '8px' }}>
            {loc.suburb} · <span style={{ color: '#ffd23f' }}>{loc.region}</span>
          </p>
          <StarDisplay average={average} userRating={userRating} />
        </div>

        <button
          onClick={() => onViewOnMap(loc)}
          className="btn btn-primary"
          style={{ fontSize: '12px', padding: '8px 14px', flexShrink: 0 }}
          aria-label={`View ${loc.address} on map`}
        >
          🗺️ Map
        </button>
      </div>
    </div>
  );
}

/* ── Desktop sidebar (left panel) ──────────────────────────── */
function DesktopSidebar({ locations, isOpen, onToggle, onViewOnMap, getAverageRating, getUserRating, totalCount, filteredCount }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        zIndex: 1000,
        width: isOpen ? '320px' : 0,
        overflow: 'hidden',
        transition: 'width 0.35s ease',
      }}
    >
      {/* Tab handle */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close list' : 'Open list'}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-36px',
          transform: 'translateY(-50%)',
          width: '36px',
          height: '72px',
          background: '#0c1d12',
          border: '1.5px solid #1f3d28',
          borderLeft: 'none',
          borderRadius: '0 12px 12px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7aaa87',
          fontSize: '18px',
          zIndex: 1001,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#ffd23f')}
        onMouseLeave={e => (e.currentTarget.style.color = '#7aaa87')}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Panel */}
      <div style={{
        width: '320px', height: '100%',
        background: '#0c1d12',
        borderRight: '2px solid #1f3d28',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '18px 16px 12px', borderBottom: '1px solid #1f3d28', flexShrink: 0 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px', fontWeight: 700,
            color: '#ffd23f', marginBottom: '4px',
          }}>
            🎄 Displays ({filteredCount})
          </h2>
          {filteredCount < totalCount && (
            <p style={{ fontSize: '12px', color: '#7aaa87' }}>
              {totalCount - filteredCount} hidden by filters
            </p>
          )}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {locations.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: '32px', marginBottom: '8px' }}>🎅</p>
              <p style={{ color: '#7aaa87', fontSize: '14px' }}>No displays match your filters.</p>
            </div>
          ) : locations.map(loc => (
            <LocationListItem
              key={loc.id}
              loc={loc}
              onViewOnMap={onViewOnMap}
              average={getAverageRating(loc.id)}
              userRating={getUserRating(loc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile bottom sheet ────────────────────────────────────── */
function MobileBottomSheet({ locations, isOpen, onToggle, onViewOnMap, getAverageRating, getUserRating, totalCount, filteredCount }) {
  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : 'closed'}`} style={{ maxHeight: '75dvh' }}>
      {/* Handle bar */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Collapse list' : 'Expand list'}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {/* Pill drag handle */}
        <div style={{
          width: '40px', height: '4px',
          background: '#1f3d28',
          borderRadius: '2px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '17px', fontWeight: 700,
            color: '#ffd23f',
          }}>
            🎄 {filteredCount} Displays
          </span>
          <span style={{ color: '#7aaa87', fontSize: '20px', lineHeight: 1 }}>
            {isOpen ? '▼' : '▲'}
          </span>
        </div>
      </button>

      {/* Scrollable list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 12px 16px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {locations.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '28px', marginBottom: '8px' }}>🎅</p>
            <p style={{ color: '#7aaa87', fontSize: '14px' }}>No displays match your filters.</p>
          </div>
        ) : locations.map(loc => (
          <LocationListItem
            key={loc.id}
            loc={loc}
            onViewOnMap={onViewOnMap}
            average={getAverageRating(loc.id)}
            userRating={getUserRating(loc.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Exported component: picks variant ─────────────────────── */
export default function Sidebar({ variant = 'desktop', ...props }) {
  if (variant === 'mobile') return <MobileBottomSheet {...props} />;
  return <DesktopSidebar {...props} />;
}
