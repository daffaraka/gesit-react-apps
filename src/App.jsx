import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPanel from './components/auth/LoginPanel';
import DashboardLayout from './components/layout/DashboardLayout';

function MainApp() {
  const { user } = useAuth();
  if (!user) return <LoginPanel />;
  return <DashboardLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
