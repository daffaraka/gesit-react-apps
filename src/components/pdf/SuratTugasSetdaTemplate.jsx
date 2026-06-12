import { forwardRef, Fragment } from 'react';

const SuratTugasSetdaTemplate = forwardRef(function SuratTugasSetdaTemplate({ formData, pegawaiList, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo }, ref) {
  const utama = pegawaiList[0] || {};
  const pengikut = pegawaiList.slice(1);

  return (
    <div ref={ref} className="pdf-page">
      {/* KOP SURAT SETDA */}
      <table style={{ width: '100%', borderBottom: '3px double black', marginBottom: '10px' }}>
        <tbody>
          <tr>
            <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle', paddingBottom: '10px' }}>
              <img src="/logo-bener-meriah.jpg" alt="Logo" style={{ width: '75px', height: 'auto' }} />
            </td>
            <td style={{ width: '85%', textAlign: 'center', lineHeight: '1.1', paddingBottom: '10px' }}>
              <span style={{ fontSize: '13pt', fontWeight: 'bold' }}>PEMERINTAH KABUPATEN BENER MERIAH</span><br />
              <span style={{ fontSize: '15pt', fontWeight: 'bold' }}>SEKRETARIAT DAERAH</span><br />
              <img src="/huruf-arab.jpeg" alt="Huruf Arab"
                style={{ width: '420px', height: 'auto', marginTop: '5px', marginBottom: '0px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
              <span style={{ fontSize: '9pt', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>Komplek Perkantoran Pemda, Serule Kayu - Kab. Bener Meriah, Pos. 24581</span>
              <span style={{ fontSize: '9pt', fontStyle: 'italic', display: 'block' }}>E-Mail: bagianumumsetdakab@gmail.com</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="judul-surat" style={{ marginBottom: 0 }}><u>SURAT TUGAS</u></h3>
      <p className="pdf-text-center" style={{ marginTop: '5px' }}>Nomor: 000.1.2.3/{formData.nomor_spt} /ST/2026</p>
      <br />

      <table className="layout-table">
        <tbody>
          <tr>
            <td style={{ width: '15%' }}>Dasar</td>
            <td style={{ width: '2%' }}>:</td>
            <td style={{ textAlign: 'justify' }}>{formData.dasar}</td>
          </tr>
        </tbody>
      </table>
      <br />

      <div className="pdf-text-center" style={{ fontWeight: 'bold', marginBottom: '15px' }}>
        MEMERINTAHKAN
      </div>

      <table className="layout-table">
        <tbody>
          <tr>
            <td style={{ width: '15%', verticalAlign: 'top' }}>Kepada</td>
            <td style={{ width: '2%', verticalAlign: 'top' }}>:</td>
            <td style={{ width: '5%', verticalAlign: 'top' }}>1.</td>
            <td style={{ width: '20%', verticalAlign: 'top' }}>Nama</td>
            <td style={{ width: '2%', verticalAlign: 'top' }}>:</td>
            <td style={{ fontWeight: 'bold' }}>{utama.nama}</td>
          </tr>
          {utama.nip && utama.nip !== '-' && (
            <tr>
              <td colSpan="3"></td>
              <td>Nip</td>
              <td>:</td>
              <td>{utama.nip}</td>
            </tr>
          )}
          {utama.pangkat && utama.pangkat !== '-' && (
            <tr>
              <td colSpan="3"></td>
              <td>Pangkat/Gol</td>
              <td>:</td>
              <td>{utama.pangkat}</td>
            </tr>
          )}
          <tr>
            <td colSpan="3"></td>
            <td style={{ verticalAlign: 'top' }}>Jabatan</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td style={{ textAlign: 'justify' }}>{utama.jabatan}</td>
          </tr>

          {/* List Pengikut */}
          {pengikut.length > 0 && (
            <>
              <tr><td colSpan="6" style={{ height: '10px' }}></td></tr>
              {pengikut.map((p, i) => (
                <Fragment key={i}>
                  <tr>
                    <td colSpan="2"></td>
                    <td style={{ verticalAlign: 'top' }}>{i + 2}.</td>
                    <td style={{ verticalAlign: 'top' }}>Nama</td>
                    <td style={{ verticalAlign: 'top' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{p.nama}</td>
                  </tr>
                  {p.nip && p.nip !== '-' && (
                    <tr>
                      <td colSpan="3"></td>
                      <td>Nip</td>
                      <td>:</td>
                      <td>{p.nip}</td>
                    </tr>
                  )}
                  {p.pangkat && p.pangkat !== '-' && (
                    <tr>
                      <td colSpan="3"></td>
                      <td>Pangkat/Gol</td>
                      <td>:</td>
                      <td>{p.pangkat}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="3"></td>
                    <td style={{ verticalAlign: 'top' }}>Jabatan</td>
                    <td style={{ verticalAlign: 'top' }}>:</td>
                    <td style={{ textAlign: 'justify' }}>{p.jabatan}</td>
                  </tr>
                  <tr><td colSpan="6" style={{ height: '10px' }}></td></tr>
                </Fragment>
              ))}
            </>
          )}

          <tr><td colSpan="6" style={{ height: '10px' }}></td></tr>
          
          <tr>
            <td style={{ verticalAlign: 'top' }}>Untuk</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td colSpan="4" style={{ textAlign: 'justify' }}>{formData.maksud_perjalanan}</td>
          </tr>
          <tr><td colSpan="6" style={{ height: '10px' }}></td></tr>

          <tr>
            <td style={{ verticalAlign: 'top' }}>Tujuan</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td colSpan="4">{formData.tujuan}</td>
          </tr>
          <tr><td colSpan="6" style={{ height: '10px' }}></td></tr>

          <tr>
            <td style={{ verticalAlign: 'top' }}>Tanggal</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td colSpan="4">{tglBerangkatIndo}</td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top' }}>S/d Tanggal</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td colSpan="4">{tglKembaliIndo}</td>
          </tr>
        </tbody>
      </table>
      
      <br />
      <p>Demikianlah untuk dilaksanakan sebagaimana mestinya</p>

      <table className="layout-table" style={{ pageBreakInside: 'avoid' }}>
        <tbody>
          <tr>
            <td style={{ width: '60%' }}></td>
            <td style={{ width: '40%', textAlign: 'center' }}>
              Redelong, {tglSuratIndo}<br />
              <b>SEKRETARIS DAERAH<br />KABUPATEN BENER MERIAH,</b><br /><br /><br /><br /><br />
              <b style={{ fontSize: '11pt', textDecoration: 'underline' }}>RISWANDIKA PUTRA, S.STP, M.A.P</b><br />
              <span>Pembina Utama Muda, IV/c</span><br />
              <span>NIP. 197909251999121001</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default SuratTugasSetdaTemplate;
