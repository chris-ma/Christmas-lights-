import { useState } from 'react';

export default function SantaHatRating({ locationId, average, count, userRating, onSubmit }) {
  const [hovered, setHovered] = useState(null);
  const displayValue = hovered ?? userRating ?? 0;

  return (
    <div>
      {/* Stars row */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '6px' }}
        role="group"
        aria-label={`Rate ${locationId} out of 5 Santa hats`}
      >
        {[1, 2, 3, 4, 5].map(val => (
          <button
            key={val}
            className="santa-hat-btn"
            aria-label={`Rate ${val} Santa hat${val > 1 ? 's' : ''}`}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSubmit(locationId, val)}
            style={{
              opacity: val <= displayValue ? 1 : 0.25,
              filter: val <= displayValue ? 'none' : 'grayscale(1)',
            }}
          >
            🎅
          </button>
        ))}
        {userRating && (
          <span style={{ fontSize: '11px', color: '#7eab8a', marginLeft: '4px' }}>
            (your rating)
          </span>
        )}
      </div>

      {/* Average display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {average !== null ? (
          <>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#f0c040' }}>{average}</span>
            <span style={{ fontSize: '12px', color: '#7eab8a' }}>
              / 5 · {count} {count === 1 ? 'rating' : 'ratings'}
            </span>
          </>
        ) : (
          <span style={{ fontSize: '12px', color: '#7eab8a' }}>No ratings yet — be the first!</span>
        )}
      </div>
    </div>
  );
}
