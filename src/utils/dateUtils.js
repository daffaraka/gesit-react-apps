export function formatTanggalIndo(dateString) {
  if (!dateString) return '-';
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(dateString);
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

export function hitungSelisihHari(awal, akhir) {
  const t1 = new Date(awal);
  const t2 = new Date(akhir);
  return (Math.ceil(Math.abs(t2.getTime() - t1.getTime()) / (1000 * 3600 * 24)) + 1) + ' Hari';
}
