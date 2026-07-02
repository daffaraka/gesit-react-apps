import { useState, useEffect } from 'react';

export default function SettingPage() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const savedUrl = localStorage.getItem('GESIT_WEBHOOK_SPPD') || '';
    setWebhookUrl(savedUrl);
  }, []);

  const handleSave = () => {
    localStorage.setItem('GESIT_WEBHOOK_SPPD', webhookUrl);
    setSaveStatus('Berhasil disimpan!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-xs font-black uppercase text-slate-400">
          <i className="fa-solid fa-server mr-1 text-blue-500"></i> Konfigurasi Cloud Variables
        </h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 text-xs font-semibold">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[9px] font-black text-slate-400 block uppercase mb-1">MODE_APLIKASI</span>
            <span className="font-mono text-slate-800 break-all text-[11px]">REACT_FRONTEND (Local)</span>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase block">Google Apps Script Webhook URL (Untuk Simpan Data SPPD)</label>
            <input 
              type="text" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-blue-500" 
            />
            <p className="text-[10px] text-slate-400">URL ini digunakan untuk mengirim POST request (otomatis menambahkan row ke Sheet SPPD) setiap kali Anda meng-generate surat.</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-emerald-600 font-bold text-[11px]">{saveStatus}</span>
        <button 
          type="button" 
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition"
        >
          <i className="fa-solid fa-save mr-1"></i> Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
