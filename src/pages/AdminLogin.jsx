import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Small delay so it doesn't feel instant (timing attack mitigation)
    await new Promise(r => setTimeout(r, 350));
    const ok = onLogin(username, password);
    if (!ok) {
      setError('Invalid username or password.');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #e63946 0%, #c8102e 35%, #1a7a3e 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: '40px 36px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 0 rgba(0,0,0,0.15), 0 24px 60px rgba(0,0,0,0.3)',
        border: '2.5px solid var(--card-border)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎄</div>
          <h1 style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '26px', fontWeight: 700,
            color: 'var(--text)', marginBottom: '4px',
          }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Sydney Christmas Lights 2025</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '2.5px solid var(--card-border)',
                fontSize: '15px',
                fontFamily: 'inherit',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--green)')}
              onBlur={e => (e.target.style.borderColor = 'var(--card-border)')}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                border: `2.5px solid ${error ? 'var(--red)' : 'var(--card-border)'}`,
                fontSize: '15px',
                fontFamily: 'inherit',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = error ? 'var(--red)' : 'var(--green)')}
              onBlur={e => (e.target.style.borderColor = error ? 'var(--red)' : 'var(--card-border)')}
            />
          </div>

          {error && (
            <div style={{
              background: 'var(--red-light)', border: '2px solid var(--red)',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', color: 'var(--red-dark)', fontWeight: 600,
              marginBottom: '16px',
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '16px', borderRadius: '12px', justifyContent: 'center' }}
          >
            {loading ? '⏳ Checking…' : '🔑 Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: 'var(--muted)' }}>
          <a href="/" style={{ color: 'var(--green-dark)', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to map
          </a>
        </p>
      </div>
    </div>
  );
}
