import { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { LineChart, DoughnutChart } from './Charts';
import { CSV_URL_PEGAWAI, CSV_URL_SPPD, DUMMY_PEGAWAI, DUMMY_RIWAYAT } from '../../data/constants';
import { loadCsv } from '../../utils/csvLoader';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, pegawai: 0, setda: 0, bupati: 0 });

  useEffect(() => {
    async function load() {
      let pegawaiCount = DUMMY_PEGAWAI.length;
      if (CSV_URL_PEGAWAI) {
        try {
          const data = await loadCsv(CSV_URL_PEGAWAI);
          pegawaiCount = data.filter(r => (r['NAMA'] || r['Nama'] || '').trim()).length;
        } catch { /* fallback */ }
      }

      let riwayat = DUMMY_RIWAYAT;
      if (CSV_URL_SPPD) {
        try {
          const data = await loadCsv(CSV_URL_SPPD);
          riwayat = data.map(row => ({
            nomorSpt: row['NOMOR_SPT'] || row['Nomor SPT'] || '-',
            jenisSpt: row['JENIS_SPT'] || row['Jenis SPT'] || '-',
          })).filter(r => r.nomorSpt !== '-');
        } catch { /* fallback */ }
      }

      const cSetda = riwayat.filter(x => x.jenisSpt === 'SETDA').length;
      const cBupati = riwayat.filter(x => x.jenisSpt === 'BUPATI').length;
      setStats({ total: riwayat.length, pegawai: pegawaiCount, setda: cSetda, bupati: cBupati });
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total SPPD Generated" value={stats.total} icon="fa-copy" colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Database Pegawai" value={stats.pegawai} icon="fa-users" colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="Surat Ttd Setda" value={stats.setda} icon="fa-building-user" colorClass="bg-purple-50 text-purple-600" />
        <StatCard title="Surat Ttd Bupati" value={stats.bupati} icon="fa-crown" colorClass="bg-amber-50 text-amber-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs lg:col-span-2">
          <h4 className="text-xs font-black uppercase text-slate-400 mb-4">Grafik Perjalanan Dinas Bulanan (2026)</h4>
          <div className="h-64"><LineChart setdaCount={stats.setda} bupatiCount={stats.bupati} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-black uppercase text-slate-400 mb-4">Rasio Penandatangan</h4>
          <div className="h-64 flex items-center justify-center"><DoughnutChart setdaCount={stats.setda} bupatiCount={stats.bupati} /></div>
        </div>
      </div>
    </div>
  );
}
