import SantaHatRating from './SantaHatRating';

const STATUS_STYLE = {
  confirmed:   { bg: 'var(--green)',  text: '#fff', label: '✓ Confirmed 2025' },
  unconfirmed: { bg: '#aaa',          text: '#fff', label: '? Unconfirmed' },
};

export default function LocationCard({ location, average, count, userRating, onSubmitRating }) {
  const status = STATUS_STYLE[location.status] ?? STATUS_STYLE.unconfirmed;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", width: '100%' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
        <img
          src={location.imageUrl}
          alt={`Christmas lights at ${location.address}, ${location.suburb}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80';
          }}
        />
        {/* Soft gradient at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 55%)',
        }} />

        {/* Status badge */}
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          padding: '5px 12px',
          borderRadius: '50px',
          fontSize: '11px', fontWeight: 700,
          background: status.bg, color: status.text,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}>
          {status.label}
        </span>

        {/* Region badge */}
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          padding: '5px 12px',
          borderRadius: '50px',
          fontSize: '11px', fontWeight: 600,
          background: 'rgba(255,255,255,0.9)',
          color: 'var(--text)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}>
          {location.region}
        </span>

        {/* Address on image bottom */}
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
          <h3 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '19px', fontWeight: 700,
            color: 'var(--text)', lineHeight: 1.2,
          }}>
            {location.address}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
            {location.suburb} {location.postcode}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '12px' }}>
          {location.description}
        </p>

        {/* Meta chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {location.displayHours && (
            <span style={{
              fontSize: '12px', fontWeight: 600, color: 'var(--green-dark)',
              background: 'var(--green-light)',
              border: '2px solid var(--green)',
              borderRadius: '50px', padding: '5px 12px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              🕖 {location.displayHours}
            </span>
          )}
          {location.charity && (
            <span style={{
              fontSize: '12px', fontWeight: 600, color: 'var(--gold-dark)',
              background: 'var(--gold-light)',
              border: '2px solid var(--gold)',
              borderRadius: '50px', padding: '5px 12px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              ❤️ {location.charity}
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '2px dashed var(--card-border)', paddingTop: '14px' }}>
          <SantaHatRating
            locationId={location.id}
            average={average}
            count={count}
            userRating={userRating}
            onSubmit={onSubmitRating}
          />
        </div>
      </div>
    </div>
  );
}
