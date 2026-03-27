import { useAdminAuth } from '../hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminRoute() {
  const { authenticated, login, logout } = useAdminAuth();

  if (!authenticated) return <AdminLogin onLogin={login} />;
  return <AdminDashboard onLogout={logout} />;
}
