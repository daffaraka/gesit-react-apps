// CSV Database URLs
export const CSV_URL_LOGIN = '';
export const CSV_URL_PEGAWAI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2qrZYdgV-h8vx7pppz-oY1s0GHWrMYi2QwI4KhXhCkh2LzzpQOyd4nPGdHGZqF7izvapyR-vvw87_/pub?gid=39804184&single=true&output=csv';
export const CSV_URL_SPPD = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2qrZYdgV-h8vx7pppz-oY1s0GHWrMYi2QwI4KhXhCkh2LzzpQOyd4nPGdHGZqF7izvapyR-vvw87_/pub?gid=0&single=true&output=csv';

export const IS_DEVELOPMENT = false;

export const DUMMY_USERS = [
  { user: 'admin', pass: '123', nama: 'Admin Setda', role: 'SuperAdmin' }
];

export const DUMMY_PEGAWAI = [
  { nama: "FITRAH ARI SYAFA'AT, S.Tr.Tra", nip: '199X', pangkat: 'Penata Muda', jabatan: 'ADC Bupati Bener Meriah' },
  { nama: 'JONI ISKANDAR, S.Kom', nip: '198X', pangkat: '-', jabatan: 'Staf Khusus Bupati Bener Meriah' },
  { nama: 'GEMPA ALAMSYAH', nip: '-', pangkat: '-', jabatan: 'Sopir' }
];

export const DUMMY_RIWAYAT = [
  { nomorSpt: '123/2026', jenisSpt: 'BUPATI', tujuan: 'Banda Aceh', pegawaiUtama: "FITRAH ARI SYAFA'AT", tglBerangkat: '10 Juni 2026' },
  { nomorSpt: '124/2026', jenisSpt: 'SETDA', tujuan: 'Lhokseumawe', pegawaiUtama: 'JONI ISKANDAR', tglBerangkat: '12 Juni 2026' }
];
