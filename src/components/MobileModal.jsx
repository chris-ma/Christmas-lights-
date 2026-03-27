import { useEffect } from 'react';
import LocationCard from './LocationCard';

export default function MobileModal({ location, onClose, getAverageRating, getRatingCount, getUserRating, onSubmitRating }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${location.address}, ${location.suburb}`}
      >
        {/* Close button — sits above the image */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid var(--card-border)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            lineHeight: 1,
            color: 'var(--text)',
            fontFamily: 'inherit',
            transition: 'transform 0.15s',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ✕
        </button>

        {/* Scrollable content */}
        <div className="modal-scroll">
          <LocationCard
            location={location}
            average={getAverageRating(location.id)}
            count={getRatingCount(location.id)}
            userRating={getUserRating(location.id)}
            onSubmitRating={onSubmitRating}
          />
        </div>
      </div>
    </>
  );
}
