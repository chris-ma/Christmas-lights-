import { useState, useCallback } from 'react';

const SESSION_KEY = 'xmas_admin_session';

function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(isLoggedIn);

  const login = useCallback((username, password) => {
    const validUser = import.meta.env.VITE_ADMIN_USERNAME;
    const validPass = import.meta.env.VITE_ADMIN_PASSWORD;
    if (username === validUser && password === validPass) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }, []);

  return { authenticated, login, logout };
}
