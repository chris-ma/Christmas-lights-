function StarDisplay({ average, userRating }) {
  const val = average ? parseFloat(average) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{
          fontSize: '16px',
          opacity: i <= Math.round(val) ? 1 : 0.18,
          filter: i <= Math.round(val) ? 'none' : 'grayscale(1)',
        }}>🎅</span>
      ))}
      {average && (
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-dark)', marginLeft: '5px' }}>
          {average}
        </span>
      )}
      {userRating && (
        <span style={{ fontSize: '10px', color: 'var(--green)', marginLeft: '2px', fontWeight: 700 }}>✓</span>
      )}
    </div>
  );
}

function LocationListItem({ loc, onViewOnMap, average, userRating }) {
  return (
    <div style={{
      padding: '14px',
      borderRadius: '16px',
      marginBottom: '10px',
      background: 'var(--surface)',
      border: '2.5px solid var(--card-border)',
      boxShadow: '0 3px 0 rgba(0,0,0,0.06)',
      transition: 'border-color 0.15s, box-shadow 0.15s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--green)';
        e.currentTarget.style.boxShadow = '0 3px 0 var(--green-dark)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.boxShadow = '0 3px 0 rgba(0,0,0,0.06)';
      }}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '24px', flexShrink: 0, lineHeight: 1, marginTop: '2px' }}>
          {loc.status === 'confirmed' ? '🎄' : '❓'}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '15px', fontWeight: 700, color: 'var(--text)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            marginBottom: '1px',
          }}>
            {loc.address}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '7px' }}>
            {loc.suburb} · <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>{loc.region}</span>
          </p>
          <StarDisplay average={average} userRating={userRating} />
        </div>

        <button
          onClick={() => onViewOnMap(loc)}
          className="btn btn-primary"
          style={{ fontSize: '12px', padding: '9px 14px', flexShrink: 0 }}
          aria-label={`View ${loc.address} on map`}
        >
          🗺️ Map
        </button>
      </div>
    </div>
  );
}

/* ── Desktop sidebar ──────────────────────────────────────────── */
function DesktopSidebar({ locations, isOpen, onToggle, onViewOnMap, getAverageRating, getUserRating, totalCount, filteredCount }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, bottom: 0,
      zIndex: 1000,
      width: isOpen ? '340px' : 0,
      overflow: 'hidden',
      transition: 'width 0.35s ease',
    }}>
      {/* Tab handle */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close list' : 'Open list'}
        style={{
          position: 'absolute', top: '50%', right: '-40px',
          transform: 'translateY(-50%)',
          width: '40px', height: '72px',
          background: '#fff',
          border: '2.5px solid var(--card-border)',
          borderLeft: 'none',
          borderRadius: '0 16px 16px 0',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--muted)', fontSize: '18px',
          zIndex: 1001,
          boxShadow: '3px 0 0 rgba(0,0,0,0.06)',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Panel */}
      <div style={{
        width: '340px', height: '100%',
        background: 'var(--bg)',
        borderRight: '2.5px solid var(--card-border)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Panel header */}
        <div style={{
          padding: '18px 16px 14px',
          borderBottom: '2px solid var(--card-border)',
          flexShrink: 0,
          background: '#fff',
        }}>
          <h2 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '20px', fontWeight: 700,
            color: 'var(--text)', marginBottom: '3px',
          }}>
            🎄 Displays ({filteredCount})
          </h2>
          {filteredCount < totalCount && (
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {totalCount - filteredCount} hidden by filters
            </p>
          )}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {locations.length === 0 ? (
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '10px' }}>🎅</p>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No displays match your filters.</p>
            </div>
          ) : locations.map(loc => (
            <LocationListItem
              key={loc.id} loc={loc}
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

/* ── Mobile bottom sheet ──────────────────────────────────────── */
function MobileBottomSheet({ locations, isOpen, onToggle, onViewOnMap, getAverageRating, getUserRating, totalCount, filteredCount }) {
  return (
    <div className={`bottom-sheet ${isOpen ? 'open' : 'closed'}`} style={{ maxHeight: '75dvh' }}>
      {/* Handle */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Collapse list' : 'Expand list'}
        style={{
          width: '100%', padding: '12px 16px 10px',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '44px', height: '5px',
          background: 'var(--card-border)',
          borderRadius: '3px',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '18px', fontWeight: 700,
            color: 'var(--text)',
          }}>
            🎄 {filteredCount} Displays
          </span>
          <span style={{
            background: isOpen ? 'var(--red-light)' : 'var(--green-light)',
            color: isOpen ? 'var(--red)' : 'var(--green)',
            border: `2px solid ${isOpen ? 'var(--red)' : 'var(--green)'}`,
            borderRadius: '50px',
            padding: '4px 14px',
            fontSize: '13px', fontWeight: 700,
          }}>
            {isOpen ? '▼ Hide' : '▲ Show'}
          </span>
        </div>
      </button>

      {/* List */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '0 12px 16px',
        WebkitOverflowScrolling: 'touch',
      }}>
        {locations.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '36px', marginBottom: '8px' }}>🎅</p>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No displays match your filters.</p>
          </div>
        ) : locations.map(loc => (
          <LocationListItem
            key={loc.id} loc={loc}
            onViewOnMap={onViewOnMap}
            average={getAverageRating(loc.id)}
            userRating={getUserRating(loc.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar({ variant = 'desktop', ...props }) {
  if (variant === 'mobile') return <MobileBottomSheet {...props} />;
  return <DesktopSidebar {...props} />;
}
