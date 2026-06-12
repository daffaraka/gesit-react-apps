import { useEffect, useState } from 'react';
import { CSV_URL_PEGAWAI, DUMMY_PEGAWAI } from '../../data/constants';
import { loadCsv } from '../../utils/csvLoader';

export default function PegawaiPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      if (CSV_URL_PEGAWAI) {
        try {
          const data = await loadCsv(CSV_URL_PEGAWAI);
          setRows(data.map(row => ({
            nama: (row['NAMA'] || row['Nama'] || '').trim(),
            nip: (row['NIP'] || row['Nip'] || '-').trim(),
            pangkat: (row['PANGKAT'] || row['Pangkat/Gol'] || '-').trim(),
            jabatan: (row['JABATAN'] || row['Jabatan'] || '-').trim()
          })).filter(p => p.nama));
        } catch { setRows(DUMMY_PEGAWAI); }
      } else { setRows(DUMMY_PEGAWAI); }
    }
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 font-bold border-b border-slate-200 text-slate-500 uppercase">
            <tr><th className="p-4">Nama Pegawai</th><th className="p-4">NIP</th><th className="p-4">Pangkat / Golongan</th><th className="p-4">Jabatan Struktural</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
            {rows.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50/80 transition border-b border-slate-100">
                <td className="p-4 font-bold text-slate-900">{p.nama}</td>
                <td className="p-4 font-mono text-xs text-slate-600">{p.nip}</td>
                <td className="p-4 text-xs text-slate-600">{p.pangkat}</td>
                <td className="p-4 text-xs text-slate-700 font-semibold">{p.jabatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
