import { useEffect, useState } from 'react';
import { CSV_URL_SPPD, DUMMY_RIWAYAT } from '../../data/constants';
import { loadCsv } from '../../utils/csvLoader';

export default function RiwayatPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      if (CSV_URL_SPPD) {
        try {
          const data = await loadCsv(CSV_URL_SPPD);
          const mapped = data.map(row => {
            const keys = Object.keys(row);
            const nomorKey = keys.find(k => k.includes('NOMOR_SPT') || k.includes('Nomor SPT') || k.includes('NOMOR'));
            const jenisKey = keys.find(k => k.includes('JENIS_SPT') || k.includes('Jenis SPT') || k.includes('JENIS'));
            const tujuanKey = keys.find(k => k.includes('TUJUAN'));
            const pegawaiKey = keys.find(k => k.includes('PEGAWAI_1') || k.includes('PEGAWAI'));
            const tglKey = keys.find(k => k.includes('TGL_BERANGKAT') || k.includes('TANGGAL'));
            
            return {
              nomorSpt: nomorKey ? row[nomorKey] : '-',
              jenisSpt: (jenisKey ? row[jenisKey] : '-').toString().trim().toUpperCase(),
              tujuan: tujuanKey ? row[tujuanKey] : '-',
              pegawaiUtama: pegawaiKey ? row[pegawaiKey] : '-',
              tglBerangkat: tglKey ? row[tglKey] : '-'
            };
          }).filter(r => r.nomorSpt && r.nomorSpt !== '-');
          setRows(mapped.length > 0 ? mapped : []);
        } catch { setRows([]); }
      } else { setRows(DUMMY_RIWAYAT); }
    }
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 font-bold border-b border-slate-200 text-slate-500 uppercase">
            <tr>
              <th className="p-4">Nomor SPT</th><th className="p-4">Klasifikasi</th><th className="p-4">Tujuan</th>
              <th className="p-4">Pelaksana Utama</th><th className="p-4">Durasi Tugas</th><th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition">
                <td className="p-4 font-bold text-slate-900">{r.nomorSpt}</td>
                <td className="p-4"><span className={`px-2 py-0.5 text-[10px] font-black rounded-md ${r.jenisSpt === 'BUPATI' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{r.jenisSpt}</span></td>
                <td className="p-4 text-xs font-semibold truncate max-w-[180px]">{r.tujuan}</td>
                <td className="p-4 font-bold">{r.pegawaiUtama}</td>
                <td className="p-4 text-[11px] text-slate-400">{r.tglBerangkat}</td>
                <td className="p-4 text-center"><span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs">Spreadsheet</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
