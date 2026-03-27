import SantaHatRating from './SantaHatRating';

export default function LocationCard({ location, average, count, userRating, onSubmitRating }) {
  return (
    <div style={{ width: '300px', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
        <img
          src={location.imageUrl}
          alt={`Christmas lights at ${location.address}, ${location.suburb}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.src = `https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80`;
          }}
        />
        {/* Status badge */}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 600,
            background: location.status === 'confirmed' ? '#1a7a3c' : '#555',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {location.status === 'confirmed' ? '✓ Confirmed 2025' : '? Unconfirmed'}
        </span>
        {/* Region tag */}
        <span
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 500,
            background: 'rgba(0,0,0,0.7)',
            color: '#f0c040',
          }}
        >
          {location.region}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '12px 14px 14px' }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '15px',
            fontWeight: 700,
            color: '#e8f5e9',
            marginBottom: '2px',
            lineHeight: 1.3,
          }}
        >
          {location.address}
        </h3>
        <p style={{ fontSize: '12px', color: '#7eab8a', marginBottom: '8px' }}>
          {location.suburb} {location.postcode}
        </p>

        <p style={{ fontSize: '12px', color: '#b8d4bc', lineHeight: 1.5, marginBottom: '10px' }}>
          {location.description}
        </p>

        {/* Meta info */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {location.displayHours && (
            <span style={{ fontSize: '11px', color: '#7eab8a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              🕖 {location.displayHours}
            </span>
          )}
          {location.charity && (
            <span style={{ fontSize: '11px', color: '#f0c040', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ❤️ {location.charity}
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #1e3a28', paddingTop: '10px' }}>
          <p style={{ fontSize: '11px', color: '#7eab8a', marginBottom: '6px', fontWeight: 600 }}>
            RATE THIS DISPLAY
          </p>
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
