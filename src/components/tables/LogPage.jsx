export default function LogPage() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 font-bold border-b border-slate-200 text-slate-500 uppercase">
            <tr><th className="p-4">Waktu Server</th><th className="p-4">Akun Operator</th><th className="p-4">Aktivitas Engine</th><th className="p-4">Nomor SPT</th><th className="p-4">Status Log</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-500">
            <tr>
              <td className="p-4 font-bold text-slate-400">{new Date().toLocaleString()}</td>
              <td className="p-4">Admin</td>
              <td className="p-4 font-bold text-slate-700">SYSTEM_START_REACT</td>
              <td className="p-4">-</td>
              <td className="p-4"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-black text-[9px]">SUCCESS</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
