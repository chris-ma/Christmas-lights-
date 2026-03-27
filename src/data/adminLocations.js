import { REGIONS } from './locations';

const STORAGE_KEY = 'xmas_admin_locations';

export function loadAdminLocations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveAdminLocations(locs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locs));
}

export function addAdminLocation(loc) {
  const locs = loadAdminLocations();
  locs.push(loc);
  saveAdminLocations(locs);
  return locs;
}

export function deleteAdminLocation(id) {
  const locs = loadAdminLocations().filter(l => l.id !== id);
  saveAdminLocations(locs);
  return locs;
}

// Parse a CSV string into location objects
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  const errors = [];
  const parsed = [];

  lines.slice(1).forEach((line, i) => {
    if (!line.trim()) return;
    // Handle quoted fields containing commas
    const fields = [];
    let current = '';
    let inQuote = false;
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === ',' && !inQuote) { fields.push(current.trim()); current = ''; continue; }
      current += ch;
    }
    fields.push(current.trim());

    const row = {};
    headers.forEach((h, idx) => { row[h] = fields[idx] ?? ''; });

    const lat = parseFloat(row.lat);
    const lng = parseFloat(row.lng);

    if (!row.address) { errors.push(`Row ${i + 2}: missing address`); return; }
    if (isNaN(lat) || isNaN(lng)) { errors.push(`Row ${i + 2}: invalid lat/lng`); return; }

    parsed.push({
      id: row.id || `admin-${Date.now()}-${i}`,
      address: row.address,
      suburb: row.suburb || '',
      postcode: row.postcode || '',
      region: Object.values(REGIONS).includes(row.region) ? row.region : REGIONS.WESTERN,
      lat,
      lng,
      description: row.description || '',
      imageUrl: row.imageUrl || row.image_url || '',
      status: row.status === 'unconfirmed' ? 'unconfirmed' : 'confirmed',
      displayHours: row.displayHours || row.display_hours || '',
      charity: row.charity || '',
      adminAdded: true,
    });
  });

  return { parsed, errors };
}

export const CSV_TEMPLATE = `id,address,suburb,postcode,region,lat,lng,description,imageUrl,status,displayHours,charity
my-location-id,123 Example Street,Surry Hills,2010,Inner West,-33.8890,151.2100,Amazing lights display with 50000 LEDs,,confirmed,7:00pm – 10:30pm,
`;

export { REGIONS };
