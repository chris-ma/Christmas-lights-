import { useState, useRef, useCallback } from 'react';
import {
  loadAdminLocations, saveAdminLocations, addAdminLocation,
  deleteAdminLocation, parseCSV, CSV_TEMPLATE, REGIONS,
} from '../data/adminLocations';

// ── Shared field style ────────────────────────────────────────
const fieldStyle = {
  width: '100%', padding: '10px 12px',
  borderRadius: '10px', border: '2px solid var(--card-border)',
  fontSize: '14px', fontFamily: 'inherit', color: 'var(--text)',
  outline: 'none', boxSizing: 'border-box', background: '#fff',
};
const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' };

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

// ── Add Location Tab ──────────────────────────────────────────
function AddLocationTab({ onAdded }) {
  const [form, setForm] = useState({
    address: '', suburb: '', postcode: '', region: REGIONS.WESTERN,
    lat: '', lng: '', description: '', imageUrl: '', status: 'confirmed',
    displayHours: '', charity: '',
  });
  const [imageMode, setImageMode] = useState('url'); // 'url' | 'upload'
  const [preview, setPreview] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      set('imageUrl', ev.target.result);
      setPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const errs = {};
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.suburb.trim()) errs.suburb = 'Required';
    if (!form.lat || isNaN(parseFloat(form.lat))) errs.lat = 'Must be a number';
    if (!form.lng || isNaN(parseFloat(form.lng))) errs.lng = 'Must be a number';
    if (!form.description.trim()) errs.description = 'Required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const loc = {
      ...form,
      id: `admin-${Date.now()}`,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      adminAdded: true,
    };
    addAdminLocation(loc);
    setSuccess(`✅ "${form.address}" added successfully!`);
    setForm({ address: '', suburb: '', postcode: '', region: REGIONS.WESTERN, lat: '', lng: '', description: '', imageUrl: '', status: 'confirmed', displayHours: '', charity: '' });
    setPreview('');
    onAdded();
    setTimeout(() => setSuccess(''), 4000);
  }

  const inputStyle = (key) => ({ ...fieldStyle, borderColor: errors[key] ? 'var(--red)' : 'var(--card-border)' });

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <div style={{ background: 'var(--green-light)', border: '2px solid var(--green)', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', color: 'var(--green-dark)', fontWeight: 600 }}>
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Field label="Street Address *">
          <input style={inputStyle('address')} value={form.address} onChange={e => set('address', e.target.value)} placeholder="48 Cameron Street" />
          {errors.address && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '3px' }}>{errors.address}</p>}
        </Field>
        <Field label="Suburb *">
          <input style={inputStyle('suburb')} value={form.suburb} onChange={e => set('suburb', e.target.value)} placeholder="Marrickville" />
          {errors.suburb && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '3px' }}>{errors.suburb}</p>}
        </Field>
        <Field label="Postcode">
          <input style={fieldStyle} value={form.postcode} onChange={e => set('postcode', e.target.value)} placeholder="2204" />
        </Field>
        <Field label="Region">
          <select style={fieldStyle} value={form.region} onChange={e => set('region', e.target.value)}>
            {Object.values(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Latitude *">
          <input style={inputStyle('lat')} value={form.lat} onChange={e => set('lat', e.target.value)} placeholder="-33.9125" />
          {errors.lat && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '3px' }}>{errors.lat}</p>}
        </Field>
        <Field label="Longitude *">
          <input style={inputStyle('lng')} value={form.lng} onChange={e => set('lng', e.target.value)} placeholder="151.1563" />
          {errors.lng && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '3px' }}>{errors.lng}</p>}
        </Field>
        <Field label="Status">
          <select style={fieldStyle} value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="confirmed">✓ Confirmed</option>
            <option value="unconfirmed">? Unconfirmed</option>
          </select>
        </Field>
        <Field label="Display Hours">
          <input style={fieldStyle} value={form.displayHours} onChange={e => set('displayHours', e.target.value)} placeholder="7:00pm – 10:30pm" />
        </Field>
      </div>

      <Field label="Description *">
        <textarea
          style={{ ...fieldStyle, minHeight: '80px', resize: 'vertical' }}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Describe the Christmas light display…"
        />
        {errors.description && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '3px' }}>{errors.description}</p>}
      </Field>

      <Field label="Charity (optional)">
        <input style={fieldStyle} value={form.charity} onChange={e => set('charity', e.target.value)} placeholder="Children's Hospital at Westmead" />
      </Field>

      {/* Image input */}
      <div style={{ marginBottom: '20px' }}>
        <span style={labelStyle}>Display Image</span>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          {['url', 'upload'].map(m => (
            <button key={m} type="button" onClick={() => setImageMode(m)}
              className={`btn btn-chip ${imageMode === m ? 'active' : ''}`}
              style={{ padding: '7px 16px', fontSize: '13px' }}>
              {m === 'url' ? '🔗 URL' : '📁 Upload'}
            </button>
          ))}
        </div>
        {imageMode === 'url' ? (
          <input style={fieldStyle} value={form.imageUrl} onChange={e => { set('imageUrl', e.target.value); setPreview(e.target.value); }} placeholder="https://…" />
        ) : (
          <input type="file" accept="image/*" onChange={handleImageUpload}
            style={{ fontSize: '14px', color: 'var(--text)' }} />
        )}
        {preview && (
          <img src={preview} alt="Preview" onError={() => setPreview('')}
            style={{ marginTop: '10px', width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '10px', border: '2px solid var(--card-border)' }} />
        )}
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px', borderRadius: '12px', justifyContent: 'center' }}>
        ➕ Add Location
      </button>
    </form>
  );
}

// ── CSV Import Tab ────────────────────────────────────────────
function ImportCSVTab({ onImported }) {
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  function processText(text) {
    const { parsed, errors } = parseCSV(text);
    if (parsed.length) {
      const existing = loadAdminLocations();
      saveAdminLocations([...existing, ...parsed]);
      onImported();
    }
    setResult({ parsed, errors });
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => processText(e.target.result);
    reader.readAsText(file);
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'christmas-lights-template.csv';
    a.click();
  }

  return (
    <div>
      {/* Download template */}
      <div style={{ background: 'var(--green-light)', border: '2px solid var(--green)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontWeight: 700, color: 'var(--green-dark)', marginBottom: '2px' }}>CSV Format</p>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
            Required columns: <code>address, suburb, lat, lng</code> · Optional: all others
          </p>
        </div>
        <button onClick={downloadTemplate} className="btn btn-primary" style={{ padding: '9px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}>
          ⬇️ Template
        </button>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current.click()}
        style={{
          border: `3px dashed ${dragging ? 'var(--green)' : 'var(--card-border)'}`,
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? 'var(--green-light)' : 'var(--bg)',
          transition: 'all 0.2s',
          marginBottom: '20px',
        }}
      >
        <p style={{ fontSize: '40px', marginBottom: '10px' }}>📂</p>
        <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>Drop CSV file here</p>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>or click to browse</p>
        <input ref={inputRef} type="file" accept=".csv,text/csv" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {result && (
        <div>
          {result.parsed.length > 0 && (
            <div style={{ background: 'var(--green-light)', border: '2px solid var(--green)', borderRadius: '12px', padding: '12px 16px', marginBottom: '12px', color: 'var(--green-dark)', fontWeight: 600 }}>
              ✅ Imported {result.parsed.length} location{result.parsed.length !== 1 ? 's' : ''} successfully!
            </div>
          )}
          {result.errors.length > 0 && (
            <div style={{ background: 'var(--red-light)', border: '2px solid var(--red)', borderRadius: '12px', padding: '12px 16px' }}>
              <p style={{ fontWeight: 700, color: 'var(--red-dark)', marginBottom: '6px' }}>⚠️ {result.errors.length} row{result.errors.length !== 1 ? 's' : ''} skipped:</p>
              {result.errors.map((err, i) => <p key={i} style={{ fontSize: '13px', color: 'var(--red-dark)' }}>• {err}</p>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Manage Locations Tab ──────────────────────────────────────
function ManageTab({ locations, onDeleted }) {
  function handleDelete(id, address) {
    if (!confirm(`Delete "${address}"?`)) return;
    deleteAdminLocation(id);
    onDeleted();
  }

  if (!locations.length) {
    return (
      <div style={{ padding: '48px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '48px', marginBottom: '12px' }}>🎄</p>
        <p style={{ color: 'var(--muted)', fontSize: '15px' }}>No admin-added locations yet.</p>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>Use the Add or Import tabs to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px' }}>
        {locations.length} admin-added location{locations.length !== 1 ? 's' : ''} (stored in browser)
      </p>
      {locations.map(loc => (
        <div key={loc.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 14px', borderRadius: '12px', marginBottom: '8px',
          background: '#fff', border: '2px solid var(--card-border)',
          boxShadow: '0 2px 0 rgba(0,0,0,0.05)',
        }}>
          {loc.imageUrl && (
            <img src={loc.imageUrl} alt="" onError={e => (e.target.style.display = 'none')}
              style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '14px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {loc.address}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {loc.suburb} · {loc.region} · <span style={{ color: loc.status === 'confirmed' ? 'var(--green)' : '#aaa', fontWeight: 600 }}>{loc.status}</span>
            </p>
          </div>
          <button
            onClick={() => handleDelete(loc.id, loc.address)}
            style={{ background: 'var(--red-light)', border: '2px solid var(--red)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: 'var(--red-dark)', fontFamily: 'inherit', flexShrink: 0 }}
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Dashboard shell ───────────────────────────────────────────
const TABS = [
  { id: 'add',    label: '➕ Add Location' },
  { id: 'import', label: '📥 Import CSV' },
  { id: 'manage', label: '📋 Manage' },
];

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('add');
  const [adminLocs, setAdminLocs] = useState(loadAdminLocations);

  function refresh() { setAdminLocs(loadAdminLocations()); }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        background: 'linear-gradient(135deg, #e63946 0%, #c8102e 40%, #1a7a3e 100%)',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🎄</span>
          <div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
              Admin Dashboard
            </h1>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Sydney Christmas Lights 2025</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '50px', padding: '7px 14px', fontSize: '13px', fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
            🗺️ View Map
          </a>
          <button onClick={onLogout} style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '50px', padding: '7px 14px', fontSize: '13px', fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { emoji: '📍', label: 'Admin Locations', value: adminLocs.length },
            { emoji: '✅', label: 'Confirmed', value: adminLocs.filter(l => l.status === 'confirmed').length },
            { emoji: '📥', label: 'Via CSV', value: adminLocs.filter(l => l.via === 'csv').length },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '16px', border: '2px solid var(--card-border)', boxShadow: '0 3px 0 rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <p style={{ fontSize: '28px', marginBottom: '4px' }}>{s.emoji}</p>
              <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '26px', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`btn btn-chip ${activeTab === tab.id ? 'active' : ''}`}
              style={{ fontSize: '14px' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '2.5px solid var(--card-border)', boxShadow: '0 4px 0 rgba(0,0,0,0.07)' }}>
          {activeTab === 'add'    && <AddLocationTab onAdded={refresh} />}
          {activeTab === 'import' && <ImportCSVTab onImported={refresh} />}
          {activeTab === 'manage' && <ManageTab locations={adminLocs} onDeleted={refresh} />}
        </div>
      </div>
    </div>
  );
}
