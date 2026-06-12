import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard Statistik', group: 'Dashboard Control' },
  { id: 'form', icon: 'fa-file-invoice', label: 'Generate SPPD', group: 'Dashboard Control' },
  { id: 'riwayat', icon: 'fa-clock-rotate-left', label: 'Dashboard Riwayat', group: 'Dashboard Control' },
  { id: 'pegawai', icon: 'fa-id-card-clip', label: 'Database Pegawai', group: 'Database Record' },
  { id: 'setting', icon: 'fa-sliders', label: 'Database Setting', group: 'Database Record' },
  { id: 'log', icon: 'fa-terminal', label: 'Log Audit System', group: 'Database Record' },
];

export default function Sidebar({ activeTab, onTabChange }) {
  const { user, logout } = useAuth();
  let lastGroup = '';

  return (
    <div className="w-64 bg-slate-900 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-slate-800 bg-slate-950">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Lambang_Kabupaten_Bener_Meriah.png"
            className="h-9 object-contain" alt="Logo" />
          <div>
            <h1 className="text-white font-black text-xs tracking-wider">GESIT 1.0</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Kab. Bener Meriah</p>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {menuItems.map((item, idx) => {
            const showGroup = item.group !== lastGroup;
            if (showGroup) lastGroup = item.group;
            return (
              <div key={item.id}>
                {showGroup && (
                  <p className={`text-[9px] font-black text-slate-600 uppercase px-3 mb-2 tracking-widest ${idx > 0 ? 'pt-4' : ''}`}>{item.group}</p>
                )}
                <button type="button" onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-xl transition ${activeTab === item.id ? 'bg-slate-800 text-blue-500 border-r-4 border-blue-500' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'}`}>
                  <i className={`fa-solid ${item.icon} text-sm w-5`}></i> {item.label}
                </button>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-[11px] font-bold text-slate-400 truncate">{user?.nama} ({user?.role})</p>
        </div>
        <button type="button" onClick={logout}
          className="w-full py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-[11px] font-black rounded-lg transition text-center cursor-pointer">LOGOUT</button>
      </div>
    </div>
  );
}
