import { useEffect, useRef } from 'react';

const FLAKES = ['❄️', '✦', '·', '❅', '✧'];

function Snowflakes() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const flakes = [];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.className = 'snowflake';
      el.textContent = FLAKES[i % FLAKES.length];
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 5;
      const size = 10 + Math.random() * 10;
      el.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s, ${duration * 0.8}s;
        animation-delay: ${delay}s, ${delay}s;
        color: rgba(255,255,255,0.7);
      `;
      container.appendChild(el);
      flakes.push(el);
    }
    return () => flakes.forEach(f => f.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden', pointerEvents: 'none',
      }}
    />
  );
}

export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header
      style={{
        position: 'relative',
        background: 'linear-gradient(160deg, #0a1f10 0%, #0d2a14 60%, #1a1a0a 100%)',
        borderBottom: '2px solid #1f3d28',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <Snowflakes />

      {/* Top row: branding */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px 8px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: '36px', lineHeight: 1, flexShrink: 0 }}>🎄</span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            className="glow"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 5vw, 26px)',
              fontWeight: 900,
              color: '#ffd23f',
              lineHeight: 1.1,
              letterSpacing: '-0.3px',
            }}
          >
            Sydney Christmas Lights
          </h1>
          <p style={{ fontSize: '12px', color: '#7aaa87', marginTop: '2px' }}>
            🎅 2025 Season · 22 Verified Displays
          </p>
        </div>

        {/* Light string decoration */}
        <div style={{ flexShrink: 0, display: 'flex', gap: '6px', alignItems: 'center' }}>
          {['#e63946','#ffd23f','#1e8a45','#e63946','#ffd23f'].map((c, i) => (
            <span
              key={i}
              className="twinkle"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '12px',
                borderRadius: '3px 3px 5px 5px',
                background: c,
                boxShadow: `0 0 6px ${c}`,
                animationDuration: `${1.2 + i * 0.3}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Search row */}
      <div style={{ padding: '0 16px 14px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '13px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            className="search-input"
            type="search"
            placeholder="Search suburb or address…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="Search Christmas light locations"
          />
        </div>
      </div>
    </header>
  );
}
