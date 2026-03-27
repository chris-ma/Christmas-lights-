export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #081510 0%, #0d1f12 50%, #0a1a0e 100%)',
        borderBottom: '1px solid #1e3a28',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexShrink: 0,
        boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo / Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <span style={{ fontSize: '28px', lineHeight: 1 }}>🎄</span>
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#f0c040',
              letterSpacing: '-0.3px',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            Sydney Christmas Lights
          </h1>
          <p style={{ fontSize: '11px', color: '#7eab8a', marginTop: '1px' }}>
            2025 Season · 22 Verified Locations
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: '280px', width: '100%' }}>
        <span
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '14px',
            color: '#7eab8a',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        <input
          type="search"
          placeholder="Search suburb or address…"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search Christmas light locations"
          style={{
            width: '100%',
            background: '#112318',
            border: '1px solid #1e3a28',
            borderRadius: '8px',
            padding: '7px 12px 7px 32px',
            color: '#e8f5e9',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = '#1a7a3c')}
          onBlur={e => (e.target.style.borderColor = '#1e3a28')}
        />
      </div>
    </header>
  );
}
