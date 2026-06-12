const tabTitles = {
  dashboard: 'Dashboard Statistik',
  form: 'Generate SPPD',
  riwayat: 'Dashboard Riwayat',
  pegawai: 'Database Pegawai',
  setting: 'Database Setting',
  log: 'Log Audit System',
};

export default function Topbar({ activeTab }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <h2 className="text-xs font-black uppercase text-slate-500 tracking-widest">{tabTitles[activeTab] || ''}</h2>
      <div className="text-[10px] bg-slate-100 font-bold px-3 py-1.5 rounded-full text-slate-600">GESIT Engine v1.0 (React)</div>
    </header>
  );
}
