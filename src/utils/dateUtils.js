export function formatTanggalIndo(dateString) {
  if (!dateString) return '-';
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(dateString);
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

export function terbilang(angka) {
  const huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  
  if (angka < 12) {
    return huruf[angka];
  } else if (angka < 20) {
    return huruf[angka - 10] + " Belas";
  } else if (angka < 100) {
    return (huruf[Math.floor(angka / 10)] + " Puluh " + huruf[angka % 10]).trim();
  }
  return angka.toString();
}

export function hitungSelisihHari(awal, akhir) {
  if (!awal || !akhir) return '-';
  const t1 = new Date(awal);
  const t2 = new Date(akhir);
  const diff = Math.ceil(Math.abs(t2.getTime() - t1.getTime()) / (1000 * 3600 * 24)) + 1;
  const spelledOut = terbilang(diff).trim();
  return diff + ' (' + spelledOut + ') Hari';
}
