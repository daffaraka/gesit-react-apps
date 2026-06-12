import { useState, useRef, useEffect } from 'react';
import PdfContainer from '../pdf/PdfContainer';
import { generatePdf } from '../pdf/pdfGenerator';
import { formatTanggalIndo, hitungSelisihHari } from '../../utils/dateUtils';
import { CSV_URL_PEGAWAI, DUMMY_PEGAWAI } from '../../data/constants';
import { loadCsv } from '../../utils/csvLoader';

export default function GenerateFormPage({ onNotify }) {
  const [formData, setFormData] = useState({
    nomor_spt: '', jenis_spt: 'SETDA', dasar: '', maksud: '', alat_angkut: 'Kendaraan Dinas',
    tempat_berangkat: 'Redelong', tujuan: '', tgl_berangkat: '', tgl_kembali: '', tgl_surat: ''
  });
  
  const [pegawaiList, setPegawaiList] = useState([{ nama: '', jabatan: '', pangkat: '', nip: '' }]);
  const [dbPegawai, setDbPegawai] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrls, setGeneratedUrls] = useState(null);
  const pdfRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (CSV_URL_PEGAWAI) {
        try {
          const data = await loadCsv(CSV_URL_PEGAWAI);
          setDbPegawai(data.map(r => ({
            nama: (r['NAMA'] || r['Nama'] || '').trim(),
            jabatan: (r['JABATAN'] || r['Jabatan'] || '-').trim(),
            pangkat: (r['PANGKAT'] || r['Pangkat/Gol'] || '-').trim(),
            nip: (r['NIP'] || r['Nip'] || '-').trim()
          })).filter(p => p.nama));
        } catch { setDbPegawai(DUMMY_PEGAWAI); }
      } else { setDbPegawai(DUMMY_PEGAWAI); }
    }
    load();
  }, []);

  function handleInputChange(e) {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  function addPegawai() {
    setPegawaiList(prev => [...prev, { nama: '', jabatan: '', pangkat: '', nip: '' }]);
  }

  function updatePegawai(index, field, value) {
    const newList = [...pegawaiList];
    newList[index][field] = value;
    if (field === 'nama') {
      const match = dbPegawai.find(p => p.nama.toLowerCase() === value.toLowerCase());
      if (match) {
        newList[index] = { ...newList[index], ...match };
      }
    }
    setPegawaiList(newList);
  }

  function removePegawai(index) {
    setPegawaiList(prev => prev.filter((_, i) => i !== index));
  }

  async function handleGenerate(e) {
    e.preventDefault();
    if (pegawaiList.length === 0 || !pegawaiList[0].nama) {
      onNotify('Silakan tambahkan minimal 1 Pegawai Pelaksana Utama.', 'error');
      return;
    }

    setIsGenerating(true);
    
    const lama = hitungSelisihHari(formData.tgl_berangkat, formData.tgl_kembali);
    const tglBerangkatIndo = formatTanggalIndo(formData.tgl_berangkat);
    const tglKembaliIndo = formatTanggalIndo(formData.tgl_kembali);
    const tglSuratIndo = formatTanggalIndo(formData.tgl_surat);

    setPdfData({ formData, pegawaiList, lama, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo });

    setTimeout(async () => {
      if (pdfRef.current) {
        const sptUrl = await generatePdf(pdfRef.current.getSptElement(), `SPT_${formData.nomor_spt}.pdf`);
        const sppdUrl = await generatePdf(pdfRef.current.getSppdElement(), `SPPD_${formData.nomor_spt}.pdf`);
        
        if (sptUrl && sppdUrl) {
          setGeneratedUrls({ spt: sptUrl, sppd: sppdUrl });
          onNotify(`Dokumen berhasil dibuat menggunakan HTML-to-PDF lokal.`, 'success');
        } else {
          onNotify('Gagal generate PDF!', 'error');
        }
      }
      setIsGenerating(false);
    }, 500);
  }

  if (generatedUrls) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-5 shadow-sm fade-in max-w-4xl mx-auto">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
          <i className="fa-solid fa-check-double"></i>
        </div>
        <div>
          <h3 className="text-lg font-black text-emerald-800 uppercase tracking-wide">DOKUMEN BERHASIL DIBUAT!</h3>
          <p className="text-sm font-semibold text-emerald-600 mt-1">Klik tombol di bawah ini untuk membuka dokumen PDF yang baru saja di-generate.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <a href={generatedUrls.spt} target="_blank" rel="noreferrer" className="px-6 py-3 w-full sm:w-auto bg-white border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-black text-xs rounded-xl shadow-sm transition-all">
            <i className="fa-solid fa-file-pdf text-red-500 mr-1.5 text-base"></i> BUKA DOKUMEN SPT (2 LEMBAR)
          </a>
          <a href={generatedUrls.sppd} target="_blank" rel="noreferrer" className="px-6 py-3 w-full sm:w-auto bg-blue-50 border-2 border-blue-300 hover:border-blue-500 text-blue-700 hover:text-blue-800 font-black text-xs rounded-xl shadow-sm transition-all">
            <i className="fa-solid fa-file-pdf text-red-500 mr-1.5 text-base"></i> BUKA DOKUMEN SPPD (2 LEMBAR)
          </a>
        </div>
        <div className="pt-4 border-t border-emerald-200/60">
          <button type="button" onClick={() => setGeneratedUrls(null)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors">
            <i className="fa-solid fa-rotate-right mr-1"></i> Buat Surat Baru Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <form onSubmit={handleGenerate} className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden divide-y divide-slate-100">
        
        {/* Section 1: KLASIFIKASI PENANDATANGAN & NOMOR */}
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
            <i className="fa-solid fa-stamp mr-1"></i> Klasifikasi Penandatangan & Nomor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Pejabat Penandatangan</label>
              <select id="jenis_spt" value={formData.jenis_spt} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required>
                <option value="SETDA">SEKRETARIS DAERAH (SETDA)</option>
                <option value="BUPATI">BUPATI BENER MERIAH</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Nomor Surat Tugas</label>
              <input type="text" id="nomor_spt" value={formData.nomor_spt} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" placeholder="Contoh: 123" required />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Dasar Perjalanan Dinas</label>
            <textarea id="dasar" rows="2" value={formData.dasar} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-blue-500" required></textarea>
          </div>
        </div>

        {/* Section 2: KOMPONEN PELAKSANA TUGAS */}
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
            <i className="fa-solid fa-users-rectangle mr-1"></i> Komponen Pelaksana Tugas (Max 7)
          </h3>
          <div className="space-y-3">
            {pegawaiList.map((p, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-1">
                  <select 
                    value={p.nama} 
                    onChange={e => updatePegawai(idx, 'nama', e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" 
                    required={idx === 0}
                  >
                    <option value="">{idx === 0 ? "-- Pilih Pegawai Pelaksana Utama (Wajib) --" : "-- Pilih Anggota Pengikut --"}</option>
                    {dbPegawai.map((dbP, dbIdx) => (
                      <option key={dbIdx} value={dbP.nama}>{dbP.nama}</option>
                    ))}
                  </select>
                </div>
                {idx > 0 && (
                  <button type="button" onClick={() => removePegawai(idx)} className="text-red-500 hover:text-red-700 w-10 shrink-0 text-center cursor-pointer">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
                {idx === 0 && <div className="w-10 shrink-0"></div>}
              </div>
            ))}
          </div>
          <button type="button" onClick={addPegawai} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
            <i className="fa-solid fa-circle-plus mr-1"></i> Tambah Anggota Pengikut
          </button>
        </div>

        {/* Section 3: DETAIL PERJALANAN */}
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-black uppercase text-blue-600 tracking-wider">
            <i className="fa-solid fa-map-location-dot mr-1"></i> Detail Perjalanan
          </h3>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Maksud / Tujuan Kegiatan</label>
            <input type="text" id="maksud" value={formData.maksud} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tempat Berangkat</label>
              <input type="text" id="tempat_berangkat" value={formData.tempat_berangkat} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tempat Tujuan</label>
              <input type="text" id="tujuan" value={formData.tujuan} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tanggal Berangkat</label>
              <input type="date" id="tgl_berangkat" value={formData.tgl_berangkat} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tanggal Kembali</label>
              <input type="date" id="tgl_kembali" value={formData.tgl_kembali} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tanggal Surat</label>
              <input type="date" id="tgl_surat" value={formData.tgl_surat} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Moda Transportasi</label>
            <input type="text" id="alat_angkut" value={formData.alat_angkut} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-blue-500" required />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 flex justify-end">
          <button type="submit" disabled={isGenerating} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50 transition">
            <i className={`fa-solid ${isGenerating ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}`}></i> 
            {isGenerating ? 'Menyusun PDF...' : 'Proses & Buat PDF Lokal'}
          </button>
        </div>
      </form>
      <PdfContainer data={pdfData} ref={pdfRef} />
    </div>
  );
}
