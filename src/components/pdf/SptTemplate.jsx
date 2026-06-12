import { forwardRef, Fragment } from 'react';

const SptTemplate = forwardRef(function SptTemplate({ formData, pegawaiList, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo }, ref) {
  const isBupati = formData.jenis_spt === 'BUPATI';

  return (
    <div ref={ref} className="pdf-page">
      {/* KOP SURAT PERMANEN (SELALU GARUDA & BUPATI) */}
      <div className="pdf-text-center" style={{ marginBottom: '10px' }}>
        <img src="/garuda.jpg" alt="Garuda" style={{ display: 'block', margin: '0 auto 8px auto', width: '70px', height: 'auto' }} />
        <span style={{ fontSize: '16pt', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif' }}>BUPATI BENER MERIAH</span><br />
        <img src="/huruf-arab.jpeg" alt="Huruf Arab" style={{ display: 'block', margin: '2px auto 0 auto', height: '24px', width: 'auto' }} />
      </div>

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

      <table className="layout-table" style={{ pageBreakInside: 'avoid' }}>
        <tbody>
          <tr>
            <td style={{ width: '60%' }}></td>
            <td style={{ width: '40%', textAlign: 'center' }}>
              Redelong, {tglSuratIndo}<br />
              {isBupati ? (
                <>
                  <b>BUPATI BENER MERIAH,</b><br /><br /><br /><br /><br />
                  <b style={{ fontSize: '11pt' }}>Ir. TAGORE ABUBAKAR</b><br />
                </>
              ) : (
                <>
                  <b>SEKRETARIS DAERAH<br />KABUPATEN BENER MERIAH,</b><br /><br /><br /><br /><br />
                  <b style={{ fontSize: '11pt', textDecoration: 'underline' }}>RISWANDIKA PUTRA, S.STP, M.A.P</b><br />
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
