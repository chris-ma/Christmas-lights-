import SantaHatRating from './SantaHatRating';

const STATUS_STYLE = {
  confirmed: { bg: '#1e8a45', label: '✓ Confirmed 2025' },
  unconfirmed: { bg: '#555566', label: '? Unconfirmed' },
};

export default function LocationCard({ location, average, count, userRating, onSubmitRating }) {
  const status = STATUS_STYLE[location.status] ?? STATUS_STYLE.unconfirmed;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", width: '100%' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={location.imageUrl}
          alt={`Christmas lights at ${location.address}, ${location.suburb}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.src = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80';
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(14,36,22,0.85) 0%, transparent 50%)',
        }} />

        {/* Status badge */}
        <span style={{
          position: 'absolute', top: '10px', left: '10px',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px', fontWeight: 700,
          background: status.bg,
          color: '#fff',
          letterSpacing: '0.3px',
        }}>
          {status.label}
        </span>

        {/* Region badge */}
        <span style={{
          position: 'absolute', top: '10px', right: '10px',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px', fontWeight: 600,
          background: 'rgba(0,0,0,0.65)',
          color: '#ffd23f',
        }}>
          {location.region}
        </span>

        {/* Address on image */}
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '17px', fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}>
            {location.address}
          </h3>
          <p style={{ fontSize: '13px', color: '#b8d4bc', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
            {location.suburb} {location.postcode}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ fontSize: '13px', color: '#b8d4bc', lineHeight: 1.6, marginBottom: '12px' }}>
          {location.description}
        </p>

        {/* Meta chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {location.displayHours && (
            <span style={{
              fontSize: '12px', color: '#eaf5ec',
              background: 'rgba(30,138,69,0.2)',
              border: '1px solid rgba(30,138,69,0.35)',
              borderRadius: '8px',
              padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              🕖 {location.displayHours}
            </span>
          )}
          {location.charity && (
            <span style={{
              fontSize: '12px', color: '#ffd23f',
              background: 'rgba(255,210,63,0.1)',
              border: '1px solid rgba(255,210,63,0.25)',
              borderRadius: '8px',
              padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              ❤️ {location.charity}
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1f3d28', paddingTop: '14px' }}>
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
