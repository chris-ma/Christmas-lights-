import { useState } from 'react';

export default function SantaHatRating({ locationId, average, count, userRating, onSubmit }) {
  const [hovered, setHovered] = useState(null);
  const displayValue = hovered ?? userRating ?? 0;

  return (
    <div>
      <p style={{ fontSize: '12px', color: '#7aaa87', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '10px' }}>
        RATE THIS DISPLAY
      </p>

      {/* Hat buttons */}
      <div
        role="group"
        aria-label={`Rate out of 5 Santa hats`}
        style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}
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
              opacity: val <= displayValue ? 1 : 0.2,
              filter: val <= displayValue ? 'none' : 'grayscale(1)',
            }}
          >
            🎅
          </button>
        ))}
      </div>

      {/* Score line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {average !== null ? (
          <>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#ffd23f', lineHeight: 1 }}>
              {average}
            </span>
            <div>
              <p style={{ fontSize: '11px', color: '#7aaa87', lineHeight: 1.3 }}>out of 5</p>
              <p style={{ fontSize: '11px', color: '#7aaa87', lineHeight: 1.3 }}>
                {count} {count === 1 ? 'rating' : 'ratings'}
              </p>
            </div>
            {userRating && (
              <span style={{
                marginLeft: 'auto',
                fontSize: '12px',
                color: '#1e8a45',
                background: 'rgba(30,138,69,0.15)',
                border: '1px solid rgba(30,138,69,0.3)',
                borderRadius: '8px',
                padding: '3px 8px',
                fontWeight: 600,
              }}>
                Your pick: {userRating} 🎅
              </span>
            )}
          </>
        ) : (
          <span style={{ fontSize: '13px', color: '#7aaa87' }}>
            No ratings yet — be the first! 🎄
          </span>
        )}
      </div>
    </div>
  );
}
