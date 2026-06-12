import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPanel() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center auth-bg p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Lambang_Kabupaten_Bener_Meriah.png"
            className="h-20 mx-auto object-contain" alt="Logo" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">GESIT 1.0 LOGIN</h2>
          <p className="text-xs text-slate-400 font-medium">Sistem Perjalanan Dinas Bener Meriah (React Mode)</p>
        </div>
        {error && (
          <div className="text-xs bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 font-bold flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation"></i> <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none" required />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50">
            {loading ? 'Memproses...' : 'Masuk Aplikasi'}
          </button>
        </form>
      </div>
    </div>
  );
}
