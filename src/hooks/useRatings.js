import { useState, useCallback } from 'react';

function loadRating(locationId) {
  try {
    const stored = localStorage.getItem(`xmas_rating_${locationId}`);
    return stored ? JSON.parse(stored) : { ratings: [], userRating: null };
  } catch {
    return { ratings: [], userRating: null };
  }
}

function saveRating(locationId, data) {
  localStorage.setItem(`xmas_rating_${locationId}`, JSON.stringify(data));
}

export function useRatings(locationIds) {
  const [ratingsMap, setRatingsMap] = useState(() => {
    const map = {};
    locationIds.forEach(id => { map[id] = loadRating(id); });
    return map;
  });

  const submitRating = useCallback((locationId, value) => {
    setRatingsMap(prev => {
      const current = prev[locationId] || { ratings: [], userRating: null };
      const previous = current.userRating;
      let ratings = [...(current.ratings || [])];

      if (previous !== null) {
        const idx = ratings.indexOf(previous);
        if (idx !== -1) ratings.splice(idx, 1);
      }
      ratings.push(value);

      const updated = { ratings, userRating: value };
      saveRating(locationId, updated);
      return { ...prev, [locationId]: updated };
    });
  }, []);

  const getAverageRating = useCallback((locationId) => {
    const data = ratingsMap[locationId];
    if (!data || !data.ratings || data.ratings.length === 0) return null;
    const sum = data.ratings.reduce((a, b) => a + b, 0);
    return (sum / data.ratings.length).toFixed(1);
  }, [ratingsMap]);

  const getUserRating = useCallback((locationId) => {
    return ratingsMap[locationId]?.userRating ?? null;
  }, [ratingsMap]);

  const getRatingCount = useCallback((locationId) => {
    return ratingsMap[locationId]?.ratings?.length ?? 0;
  }, [ratingsMap]);

  return { submitRating, getAverageRating, getUserRating, getRatingCount };
}
