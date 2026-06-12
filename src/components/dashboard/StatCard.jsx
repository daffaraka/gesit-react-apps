export default function StatCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{title}</p>
        <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
      <div className={`w-10 h-10 ${colorClass} rounded-xl flex items-center justify-center text-base`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
    </div>
  );
}
