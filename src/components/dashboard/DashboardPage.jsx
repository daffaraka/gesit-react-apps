import { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { LineChart, DoughnutChart } from './Charts';
import { CSV_URL_PEGAWAI, CSV_URL_SPPD, DUMMY_PEGAWAI, DUMMY_RIWAYAT } from '../../data/constants';
import { loadCsv } from '../../utils/csvLoader';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, pegawai: 0, setda: 0, bupati: 0 });
  const [debugMsg, setDebugMsg] = useState('');

  useEffect(() => {
    async function load() {
      let pegawaiCount = DUMMY_PEGAWAI.length;
      if (CSV_URL_PEGAWAI) {
        try {
          const data = await loadCsv(CSV_URL_PEGAWAI);
          pegawaiCount = data.filter(r => Object.values(r).some(v => v)).length;
        } catch (e) { setDebugMsg(prev => prev + ' | Err Pegawai: ' + e.message); }
      }

      let riwayat = [];
      if (CSV_URL_SPPD) {
        try {
          const data = await loadCsv(CSV_URL_SPPD);
          setDebugMsg(prev => prev + ` | SPPD Loaded: ${data.length} rows`);
          riwayat = data.map(row => {
            const keys = Object.keys(row);
            const nomorKey = keys.find(k => k.includes('NOMOR_SPT') || k.includes('Nomor SPT') || k.includes('NOMOR'));
            const jenisKey = keys.find(k => k.includes('JENIS_SPT') || k.includes('Jenis SPT') || k.includes('JENIS'));
            const tglKey = keys.find(k => k.toLowerCase().includes('tgl') || k.toLowerCase().includes('tanggal'));
            
            let bulan = -1; // 0-11
            if (tglKey && row[tglKey]) {
              const tglStr = row[tglKey].toString().toLowerCase();
              if (tglStr.includes('jan') || tglStr.includes('-01-')) bulan = 0;
              else if (tglStr.includes('feb') || tglStr.includes('-02-')) bulan = 1;
              else if (tglStr.includes('mar') || tglStr.includes('-03-')) bulan = 2;
              else if (tglStr.includes('apr') || tglStr.includes('-04-')) bulan = 3;
              else if (tglStr.includes('mei') || tglStr.includes('may') || tglStr.includes('-05-')) bulan = 4;
              else if (tglStr.includes('jun') || tglStr.includes('-06-')) bulan = 5;
              else if (tglStr.includes('jul') || tglStr.includes('-07-')) bulan = 6;
              else if (tglStr.includes('agu') || tglStr.includes('aug') || tglStr.includes('-08-')) bulan = 7;
              else if (tglStr.includes('sep') || tglStr.includes('-09-')) bulan = 8;
              else if (tglStr.includes('okt') || tglStr.includes('oct') || tglStr.includes('-10-')) bulan = 9;
              else if (tglStr.includes('nov') || tglStr.includes('-11-')) bulan = 10;
              else if (tglStr.includes('des') || tglStr.includes('dec') || tglStr.includes('-12-')) bulan = 11;
            }

            return {
              nomorSpt: nomorKey ? row[nomorKey] : '-',
              jenisSpt: (jenisKey ? row[jenisKey] : '-').toString().trim().toUpperCase(),
              bulan: bulan
            };
          }).filter(r => r.nomorSpt && r.nomorSpt !== '-');
        } catch (err) {
          setDebugMsg(prev => prev + ' | Err SPPD: ' + err.toString());
          console.error('Error loading SPPD:', err);
        }
      }

      const cSetda = riwayat.filter(x => x.jenisSpt === 'SETDA').length;
      const cBupati = riwayat.filter(x => x.jenisSpt === 'BUPATI').length;
      
      const monthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      riwayat.forEach(r => {
        if (r.bulan >= 0 && r.bulan <= 11) {
          monthlyData[r.bulan] += 1;
        } else {
          // Default ke bulan berjalan (June = 5) jika tidak terdeteksi
          monthlyData[5] += 1;
        }
      });

      setStats({ total: riwayat.length, pegawai: pegawaiCount, setda: cSetda, bupati: cBupati, monthlyData });
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
          <div className="h-64"><LineChart monthlyData={stats.monthlyData || [0,0,0,0,0,0,0,0,0,0,0,0]} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h4 className="text-xs font-black uppercase text-slate-400 mb-4">Rasio Penandatangan</h4>
          <div className="h-64 flex items-center justify-center"><DoughnutChart setdaCount={stats.setda} bupatiCount={stats.bupati} /></div>
        </div>
      </div>
    </div>
  );
}
