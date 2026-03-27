import { useState } from 'react';

export default function SantaHatRating({ locationId, average, count, userRating, onSubmit }) {
  const [hovered, setHovered] = useState(null);
  const displayValue = hovered ?? userRating ?? 0;

  return (
    <div>
      <p style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px',
        color: 'var(--muted)', marginBottom: '10px', textTransform: 'uppercase',
      }}>
        Rate this display
      </p>

      {/* Hat buttons */}
      <div
        role="group"
        aria-label="Rate out of 5 Santa hats"
        style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}
      >
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            className="santa-btn"
            aria-label={`Rate ${val} Santa hat${val > 1 ? 's' : ''}`}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSubmit(locationId, val)}
            style={{
              opacity: val <= displayValue ? 1 : 0.18,
              filter: val <= displayValue ? 'none' : 'grayscale(1)',
            }}
          >
            🎅
          </button>
        ))}
      </div>

      {/* Score */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {average !== null ? (
          <>
            <div style={{
              background: 'var(--gold-light)',
              border: '2px solid var(--gold)',
              borderRadius: '12px',
              padding: '6px 14px',
              display: 'flex', alignItems: 'baseline', gap: '4px',
            }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--gold-dark)', fontFamily: "'Fredoka', sans-serif" }}>
                {average}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--gold-dark)', fontWeight: 600 }}>/5</span>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
              {count} {count === 1 ? 'rating' : 'ratings'}
            </span>
            {userRating && (
              <span style={{
                fontSize: '12px', fontWeight: 700,
                color: 'var(--green-dark)',
                background: 'var(--green-light)',
                border: '2px solid var(--green)',
                borderRadius: '50px',
                padding: '4px 12px',
              }}>
                You: {userRating} 🎅
              </span>
            )}
          </>
        ) : (
          <span style={{
            fontSize: '13px', color: 'var(--muted)',
            background: 'var(--bg)',
            border: '2px dashed var(--card-border)',
            borderRadius: '10px',
            padding: '8px 14px',
          }}>
            No ratings yet — be the first! 🎄
          </span>
        )}
      </div>
    </div>
  );
}
