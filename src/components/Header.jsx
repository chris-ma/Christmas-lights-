import { useEffect, useRef } from 'react';

const FLAKES = ['❄️', '⛄', '✦', '❅', '✧', '•'];

function Snowflakes() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const flakes = [];
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('span');
      el.className = 'snowflake';
      el.textContent = FLAKES[i % FLAKES.length];
      const left = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 6;
      const size = 10 + Math.random() * 12;
      el.style.cssText = `
        left:${left}%; font-size:${size}px;
        animation-duration:${duration}s,${duration * 0.8}s;
        animation-delay:${delay}s,${delay}s;
        color:rgba(255,255,255,0.75);
      `;
      container.appendChild(el);
      flakes.push(el);
    }
    return () => flakes.forEach(f => f.remove());
  }, []);
  return <div ref={containerRef} style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }} />;
}

export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #e63946 0%, #c8102e 40%, #1a7a3e 100%)',
      borderBottom: '3px solid rgba(0,0,0,0.1)',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      <Snowflakes />

      {/* Wavy bottom edge decoration */}
      <div style={{
        position: 'absolute', bottom: -1, left: 0, right: 0,
        height: '8px',
        background: 'var(--bg)',
        clipPath: 'ellipse(52% 100% at 50% 100%)',
      }} />

      {/* Top row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px 8px',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo bubble */}
        <div style={{
          width: '48px', height: '48px', flexShrink: 0,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px',
          backdropFilter: 'blur(4px)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          🎄
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: 'clamp(20px, 5.5vw, 28px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '0.3px',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
            Sydney Christmas Lights
          </h1>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', marginTop: '2px', fontWeight: 500 }}>
            🎅 2025 Season · 22 Verified Displays
          </p>
        </div>

        {/* Light bulbs */}
        <div style={{ flexShrink: 0, display: 'flex', gap: '5px', alignItems: 'center' }}>
          {['#e63946','#f5a623','#2db560','#fff','#e63946'].map((c, i) => (
            <span key={i} className="twinkle" style={{
              display: 'inline-block',
              width: '10px', height: '14px',
              borderRadius: '3px 3px 6px 6px',
              background: c,
              boxShadow: `0 0 8px ${c}, 0 0 16px ${c}55`,
              animationDuration: `${1.2 + i * 0.3}s`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Search row */}
      <div style={{ padding: '4px 16px 18px', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '15px', top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '17px', pointerEvents: 'none',
          }}>
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
