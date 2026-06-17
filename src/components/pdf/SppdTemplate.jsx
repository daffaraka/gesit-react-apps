import React, { forwardRef } from 'react';

const SppdTemplate = forwardRef(function SppdTemplate({ formData, pegawaiList, lama, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo }, ref) {
  const utama = pegawaiList[0] || {};
  const pengikut = pegawaiList.slice(1);
  const isBupati = formData.jenis_spt === 'BUPATI';

  return (
    <div ref={ref} className="pdf-page">
      <table style={{ width: '100%', borderBottom: '3px double black', marginBottom: '10px' }}>
        <tbody>
          <tr>
            <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle', paddingBottom: '10px' }}>
              <img src="/logo-bener-meriah.jpg" alt="Logo" style={{ width: '120px', maxWidth: 'none', height: 'auto', display: 'inline-block' }} />
            </td>
            <td style={{ width: '85%', textAlign: 'center', lineHeight: '1.1', paddingBottom: '10px' }}>
              <span style={{ fontSize: '11pt', fontWeight: 'bold' }}>PEMERINTAH KABUPATEN BENER MERIAH</span><br />
              <span style={{ fontSize: '13pt', fontWeight: 'bold' }}>SEKRETARIAT DAERAH</span><br />
              <img src="/arab.jpg" alt="Huruf Arab"
                style={{ width: '210', height: 'auto', marginTop: '5px', marginBottom: '0px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
              <span style={{ fontSize: '7pt', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>Komplek Perkantoran Pemda, Serule Kayu - Kab. Bener Meriah, Pos. 24581</span>
              <span style={{ fontSize: '7pt', fontStyle: 'italic', display: 'block' }}>E-Mail: bagianumumsetdakab@gmail.com</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="layout-table" style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%' }}></td>
            <td style={{ width: '50%' }}>
              <table className="layout-table" style={{ fontSize: '8pt' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '20%' }}>Nomor</td>
                    <td style={{ width: '5%' }}>:</td>
                    <td>000.1.2.1/{formData.nomor_spt} /SPPD/2026</td>
                  </tr>
                  <tr>
                    <td>Lembar ke</td>
                    <td>:</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="judul-surat" style={{ marginBottom: '15px' }}><u>SURAT PERJALANAN DINAS (SPD)</u></h3>
      <br />

      <table className="bordered-table" style={{ tableLayout: 'fixed', width: '100%' }}>
        <colgroup>
          <col style={{ width: '4%' }} />
          <col style={{ width: '46%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <tbody>
          <tr>
            <td className="pdf-text-center">1.</td>
            <td style={{ width: '46%' }}>Pejabat yang memberi perintah</td>
            <td colSpan="2">{isBupati ? 'Bupati Bener Meriah' : 'Sekretaris Daerah Kabupaten Bener Meriah'}</td>
          </tr>
          <tr>
            <td className="pdf-text-center">2.</td>
            <td>Nama/NIP Pegawai yang melaksanakan Perjalanan Dinas</td>
            <td colSpan="2">{utama.nama}</td>
          </tr>
          <tr>
            <td className="pdf-text-center">3.</td>
            <td>a. Pangkat dan Golongan<br />&nbsp;&nbsp;&nbsp;b. Jabatan<br />&nbsp;&nbsp;&nbsp;c. Tingkat menurut peraturan perjalanan</td>
            <td colSpan="2">a. {utama.pangkat || '-'}<br />b. {utama.jabatan || '-'}<br />c. -</td>
          </tr>
          <tr>
            <td className="pdf-text-center">4.</td>
            <td>Maksud Perjalanan Dinas</td>
            <td colSpan="2">{formData.maksud}</td>
          </tr>
          <tr>
            <td className="pdf-text-center">5.</td>
            <td>Alat angkut yang dipergunakan<br />&nbsp;&nbsp;&nbsp;a. Tempat berangkat<br />&nbsp;&nbsp;&nbsp;b. Tempat tujuan</td>
            <td colSpan="2">{formData.alat_angkut}<br />a. {formData.tempat_berangkat}<br />b. {formData.tujuan}</td>
          </tr>
          <tr>
            <td className="pdf-text-center">6.</td>
            <td>a. Lamanya Perjalanan Dinas<br />&nbsp;&nbsp;&nbsp;b. Tanggal berangkat<br />&nbsp;&nbsp;&nbsp;c. Tanggal harus kembali</td>
            <td colSpan="2">a. {lama}<br />b. {tglBerangkatIndo}<br />c. {tglKembaliIndo}</td>
          </tr>
          <tr>
            <td className="pdf-text-center">7.</td>
            <td>Pengikut : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nama</td>
            <td className="pdf-text-center">Tanggal Lahir</td>
            <td className="pdf-text-center">Keterangan</td>
          </tr>
          {pengikut.length > 0 ? pengikut.map((p, i) => {
            const isFirst = i === 0;
            const isLast = i === pengikut.length - 1;
            const cellStyle = {
              padding: '4px 6px',
              borderTop: isFirst ? undefined : 'none',
              borderBottom: isLast ? undefined : 'none'
            };
            return (
              <tr key={i}>
                <td className="pdf-text-center" style={{ ...cellStyle, verticalAlign: 'top' }}>{isFirst ? '8.' : ''}</td>
                <td style={{ ...cellStyle, verticalAlign: 'top' }}>{i + 1}. {p.nama}</td>
                <td style={{ ...cellStyle, verticalAlign: 'top' }}></td>
                <td style={{ ...cellStyle, verticalAlign: 'top' }}>{p.jabatan}</td>
              </tr>
            );
          }) : (
            <tr>
              <td className="pdf-text-center" style={{ verticalAlign: 'top' }}>8.</td>
              <td style={{ padding: '4px 6px', height: '30px' }}></td>
              <td style={{ padding: '4px 6px' }}></td>
              <td style={{ padding: '4px 6px' }}></td>
            </tr>
          )}
          <tr>
            <td className="pdf-text-center">9.</td>
            <td>Pembebanan Anggaran<br />&nbsp;&nbsp;&nbsp;a. Kegiatan/ Instansi<br />&nbsp;&nbsp;&nbsp;b. Akun/ Kode Rekening</td>
            <td colSpan="2"><br />Sekretariat Daerah<br /></td>
          </tr>
          <tr>
            <td className="pdf-text-center">10.</td>
            <td>Keterangan lain-lain</td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
      <br /><br />

      <table className="layout-table" style={{ pageBreakInside: 'avoid' }}>
        <tbody>
          <tr>
            <td style={{ width: '60%' }}></td>
            <td style={{ width: '40%', textAlign: 'center' }}>
              Redelong, {tglSuratIndo}<br />
              {isBupati ? (
                <>
                  <b>BUPATI BENER MERIAH,</b><br /><br /><br /><br /><br />
                  <b style={{ fontSize: '9pt' }}>Ir. TAGORE ABUBAKAR</b><br />
                </>
              ) : (
                <>
                  <b>SEKRETARIS DAERAH<br />KABUPATEN BENER MERIAH,</b><br /><br /><br /><br /><br />
                  <b style={{ fontSize: '9pt', textDecoration: 'underline' }}>RISWANDIKA PUTRA, S.STP, M.A.P</b><br />
                  <span>Pembina Utama Muda, IV/c</span><br />
                  <span>NIP. 197909251999121001</span>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default SppdTemplate;
