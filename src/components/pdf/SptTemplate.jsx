import { forwardRef, Fragment } from 'react';

const SptTemplate = forwardRef(function SptTemplate({ formData, pegawaiList, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo }, ref) {
  const isBupati = formData.jenis_spt === 'BUPATI';

  return (
    <div ref={ref} className="pdf-page">
      {/* KOP SURAT */}
      {isBupati ? (
        <div className="pdf-text-center" style={{ marginBottom: '0px' }}>
          <img src="/garuda.jpg" alt="Garuda" style={{ display: 'block', margin: '0 auto 8px auto', width: '100px', height: 'auto' }} />
          <span style={{ fontSize: '15pt', fontWeight: 'bold', fontFamily: "Arial, sans-serif", letterSpacing: '3px', display: 'block', width: '100%', marginTop: '5px' }}>BUPATI BENER MERIAH</span>
          <img src="/arab.jpg" alt="Huruf Arab" style={{ display: 'block', margin: '10px auto 0 auto', height: '35px', width: 'auto' }} />
        </div>
      ) : (
        <table style={{ width: '100%', borderBottom: '3px double black', marginBottom: '10px' }}>
          <tbody>
            <tr>
              <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle', paddingBottom: '10px' }}>
                <img src="/logo-bener-meriah.jpg" alt="Logo" style={{ width: '120px', maxWidth: 'none', height: 'auto', display: 'inline-block' }} />
              </td>
              <td style={{ width: '85%', textAlign: 'center', lineHeight: '1.1', paddingBottom: '10px' }}>
                <span style={{ fontSize: '13pt', fontWeight: 'bold' }}>PEMERINTAH KABUPATEN BENER MERIAH</span><br />
                <span style={{ fontSize: '15pt', fontWeight: 'bold' }}>SEKRETARIAT DAERAH</span><br />
                <img src="/arab-panjang.jpeg" alt="Huruf Arab"
                  style={{ width: '420px', height: 'auto', marginTop: '10px', marginBottom: '0px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <span style={{ fontSize: '9pt', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>Komplek Perkantoran Pemda, Serule Kayu - Kab. Bener Meriah, Pos. 24581</span>
                <span style={{ fontSize: '9pt', fontStyle: 'italic', display: 'block' }}>E-Mail: bagianumumsetdakab@gmail.com</span>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <h3 className="judul-surat" style={{ marginBottom: 0 }}><u>SURAT PERINTAH TUGAS</u></h3>
      <p className="pdf-text-center" style={{ marginTop: '5px' }}>Nomor: 000.1.2.1/{formData.nomor_spt} /ST/2026</p>
      <br />

      <table className="layout-table">
        <tbody>
          <tr>
            <td style={{ width: '15%' }}>Dasar</td>
            <td style={{ width: '2%' }}>:</td>
            <td style={{ textAlign: 'justify' }}>{formData.dasar}</td>
          </tr>
          <tr>
            <td colSpan="3"><br />
              <div className="pdf-text-center"><b>MEMERINTAHKAN</b></div><br />
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top' }}>Kepada</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td>
              <table className="layout-table">
                <tbody>
                  {pegawaiList.map((p, i) => (
                    <Fragment key={i}>
                      <tr>
                        <td style={{ width: '5%', verticalAlign: 'top' }}>{i + 1}.</td>
                        <td style={{ width: '20%', verticalAlign: 'top' }}>Nama</td>
                        <td style={{ width: '2%', verticalAlign: 'top' }}>:</td>
                        <td><b>{p.nama}</b></td>
                      </tr>
                      {p.nip && p.nip !== '-' && (
                        <tr>
                          <td></td>
                          <td>Nip</td>
                          <td>:</td>
                          <td>{p.nip}</td>
                        </tr>
                      )}
                      {p.pangkat && p.pangkat !== '-' && (
                        <tr>
                          <td></td>
                          <td>Pangkat/Gol</td>
                          <td>:</td>
                          <td>{p.pangkat}</td>
                        </tr>
                      )}
                      {p.jabatan && p.jabatan !== '-' && (
                        <tr>
                          <td></td>
                          <td>Jabatan</td>
                          <td>:</td>
                          <td>{p.jabatan}</td>
                        </tr>
                      )}
                      <tr><td colSpan="4" style={{ height: '10px' }}></td></tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top' }}>Untuk</td>
            <td style={{ verticalAlign: 'top' }}>:</td>
            <td style={{ textAlign: 'justify' }}>{formData.maksud}</td>
          </tr>
          <tr><td colSpan="3"><br /></td></tr>
          <tr>
            <td>Tujuan</td>
            <td>:</td>
            <td>{formData.tujuan}</td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td>:</td>
            <td>{tglBerangkatIndo}</td>
          </tr>
          <tr>
            <td>S/d Tanggal</td>
            <td>:</td>
            <td>{tglKembaliIndo}</td>
          </tr>
        </tbody>
      </table>
      <br /><br />
      <p>Demikianlah untuk dilaksanakan sebagaimana mestinya</p>
      <br />
      <table className="layout-table" style={{ pageBreakInside: 'avoid' }}>
        <tbody>
          <tr>
            <td style={{ width: '65%' }}></td>
            <td style={{ width: '35%', textAlign: 'center' }}>
              <br />
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

export default SptTemplate;
