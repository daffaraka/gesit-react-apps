import { createContext, useContext, useState, useEffect } from 'react';
import { IS_DEVELOPMENT, DUMMY_USERS, CSV_URL_LOGIN } from '../data/constants';
import { loadCsv } from '../utils/csvLoader';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (IS_DEVELOPMENT) {
      setUser({ user: 'dev', nama: 'Developer', role: 'SuperAdmin' });
    }
  }, []);

  async function login(username, password) {
    setLoading(true);
    setError('');
    try {
      if (CSV_URL_LOGIN) {
        const data = await loadCsv(CSV_URL_LOGIN);
        const matched = data.find(row =>
          (row['USERNAME'] || row['Username'] || row['username']) === username &&
          (row['PASSWORD'] || row['Password'] || row['password']) === password
        );
        if (matched) {
          setUser({
            user: username,
            nama: matched['NAMA'] || matched['Nama'] || 'Admin',
            role: matched['ROLE'] || matched['Role'] || 'User'
          });
        } else {
          setError('Username atau Password salah (dari Database).');
        }
      } else {
        await new Promise(r => setTimeout(r, 500));
        const matched = DUMMY_USERS.find(x => x.user === username && x.pass === password);
        if (matched) {
          setUser(matched);
        } else {
          setError('Link CSV belum diatur. Gunakan admin / 123.');
        }
      }
    } catch {
      setError('Gagal terhubung ke Database Spreadsheet.');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setError('');
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
