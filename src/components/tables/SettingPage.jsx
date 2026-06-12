export default function SettingPage() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
      <h3 className="text-xs font-black uppercase text-slate-400 mb-4 border-b pb-2">
        <i className="fa-solid fa-server mr-1 text-blue-500"></i> Konfigurasi Cloud Variables
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[9px] font-black text-slate-400 block uppercase">MODE_APLIKASI</span>
          <span className="font-mono text-slate-800 break-all text-[11px]">REACT_FRONTEND (Local)</span>
        </div>
      </div>
    </div>
  );
}
