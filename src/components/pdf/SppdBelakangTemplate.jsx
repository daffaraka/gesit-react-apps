import React, { forwardRef } from 'react';

const SppdBelakangTemplate = forwardRef(function SppdBelakangTemplate({ formData, pegawaiList, tglBerangkatIndo, tglSuratIndo }, ref) {
  const isBupati = formData.jenis_spt === 'BUPATI';
  return (
    <div ref={ref} className="pdf-page" style={{ fontSize: '8pt', fontFamily: 'Arial, sans-serif' }}>
      <table className="bordered-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <tbody>
          {/* Row 1 */}
          <tr>
            <td style={{ width: '50%', padding: '4px 6px', verticalAlign: 'top' }}></td>
            <td style={{ width: '50%', padding: '4px 6px', verticalAlign: 'top' }}>
              <table style={{ width: '100%', marginBottom: '20px' }}>
                <tbody>
                  <tr><td style={{ width: '100px' }}>Berangkat</td><td style={{ width: '10px' }}>:</td><td>{formData.tempat_berangkat}</td></tr>
                  <tr><td>Dari</td><td></td><td></td></tr>
                  <tr><td colSpan="3">(tempat Kedudukan)</td></tr>
                  <tr><td>Pada Tanggal</td><td>:</td><td>{tglBerangkatIndo}</td></tr>
                  <tr><td>Ke</td><td>:</td><td>{formData.tujuan}</td></tr>
                </tbody>
              </table>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p style={{ margin: 0 }}>Pejabat Pelaksana Teknis Kegiatan</p>
                <br /><br /><br />
                <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>PLOIT PITTERSON, SE</p>
                <p style={{ margin: 0 }}>Nip. 19800421 201406 1 008</p>
              </div>
            </td>
          </tr>

          {/* Rows II to V */}
          {[
            { num: 'II.' },
            { num: 'III.' },
            { num: 'IV.' },
            { num: 'V.' }
          ].map((row, idx) => (
            <tr key={idx}>
              <td style={{ padding: '4px 12px', verticalAlign: 'top' }}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr><td style={{ width: '30px' }}>{row.num}</td><td style={{ width: '80px' }}>Tiba di</td><td>:</td></tr>
                    <tr><td></td><td>Pada</td><td>:</td></tr>
                    <tr><td></td><td>Tanggal</td><td></td></tr>
                    <tr><td></td><td>Kepala</td><td>:</td></tr>
                  </tbody>
                </table>
              </td>
              <td style={{ padding: '4px 12px', verticalAlign: 'top' }}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr><td style={{ width: '100px' }}>Berangkat</td><td>:</td></tr>
                    <tr><td>Dari</td><td></td></tr>
                    <tr><td>Ke</td><td>:</td></tr>
                    <tr><td>Pada Tanggal</td><td>:</td></tr>
                    <tr><td>Kepala</td><td>:</td></tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}

          {/* Row VI */}
          <tr>
            <td style={{ padding: '4px 12px', verticalAlign: 'top' }}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr><td style={{ width: '30px' }}>VI.</td><td style={{ width: '120px' }}>Tiba di</td><td>:</td></tr>
                  <tr><td></td><td colSpan="2">Tempat Kedudukan</td></tr>
                  <tr><td></td><td>Pada</td><td>:</td></tr>
                  <tr><td></td><td>Tanggal</td><td></td></tr>
                </tbody>
              </table>
            </td>
            <td style={{ padding: '4px 12px', verticalAlign: 'top', textAlign: 'justify' }}>
              Telah diperiksa, dengan keterangan bahwa perjalanan tersebut diatas benar dilakukan atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya
            </td>
          </tr>

          {/* Row VII */}
          <tr>
            <td colSpan="2" style={{ padding: '4px 12px', fontWeight: 'bold' }}>
              VII. CATATAN LAIN-LAIN
            </td>
          </tr>

          {/* Row VIII */}
          <tr>
            <td colSpan="2" style={{ padding: '4px 12px' }}>
              <span style={{ fontWeight: 'bold' }}>VIII. PERHATIAN</span><br />
              <div style={{ textAlign: 'justify', marginTop: '4px' }}>
                Pejabat yang berwenang menerbitkan SPD, pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat / tiba serta bendaharawan bertanggung jawab berdasarkan peraturan-peraturan Keuangan Negara, apabila Negara mendapat rugi akibat kesalahan, kealpaannya.
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Signature */}
      <div style={{ marginTop: '0px', width: '35%', float: 'right', textAlign: 'center' }}>
        <br />
        <p style={{ margin: 0 }}>Redelong, {tglSuratIndo}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>SEKRETARIS DAERAH</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>KABUPATEN BENER MERIAH,</p>
        <br /><br /><br />
        <p style={{ margin: 0, fontWeight: 'bold', textDecoration: 'underline' }}>RISWANDIKA PUTRA, S.STP, M.A.P</p>
        <p style={{ margin: 0 }}>Pembina Utama Madya, IV/d</p>
        <p style={{ marginBottom: '20px' }}>NIP. 19790925 199912 1 001</p>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
});

export default SppdBelakangTemplate;
