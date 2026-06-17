import { forwardRef, useImperativeHandle, useRef } from 'react';
import SptTemplate from './SptTemplate';
import SppdTemplate from './SppdTemplate';
import SuratTugasSetdaTemplate from './SuratTugasSetdaTemplate';
import SppdBelakangTemplate from './SppdBelakangTemplate';

const PdfContainer = forwardRef(function PdfContainer({ data }, ref) {
  const sptRef = useRef(null);
  const sppdRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getSptElement: () => sptRef.current,
    getSppdElement: () => sppdRef.current,
  }));

  if (!data) return <div style={{ display: 'none' }}></div>;

  const { formData, pegawaiList, lama, tglBerangkatIndo, tglKembaliIndo, tglSuratIndo } = data;

  return (
    <div style={{
      position: 'absolute',
      top: '-9999px',
      left: '-9999px',
      width: '215mm',
      backgroundColor: 'white',
      color: 'black',
      padding: '0'
    }}>
      {/* 1. SPT (2 Halaman: SPT + SPPD) */}
      <div ref={sptRef}>
        <SptTemplate
          formData={formData}
          pegawaiList={pegawaiList}
          tglBerangkatIndo={tglBerangkatIndo}
          tglKembaliIndo={tglKembaliIndo}
          tglSuratIndo={tglSuratIndo}
        />
        <div className="html2pdf__page-break" style={{ height: 0, margin: 0, border: 0 }}></div>
        <SppdTemplate
          formData={formData}
          pegawaiList={pegawaiList}
          lama={lama}
          tglBerangkatIndo={tglBerangkatIndo}
          tglKembaliIndo={tglKembaliIndo}
          tglSuratIndo={tglSuratIndo}
        />
      </div>

      {/* 2. SPPD Saja (2 Halaman: SPPD Depan + SPPD Belakang) */}
      <div ref={sppdRef}>
        <SppdTemplate
          formData={formData}
          pegawaiList={pegawaiList}
          lama={lama}
          tglBerangkatIndo={tglBerangkatIndo}
          tglKembaliIndo={tglKembaliIndo}
          tglSuratIndo={tglSuratIndo}
        />
        <div className="html2pdf__page-break" style={{ height: 0, margin: 0, border: 0 }}></div>
        <SppdBelakangTemplate
          formData={formData}
          pegawaiList={pegawaiList}
          tglBerangkatIndo={tglBerangkatIndo}
          tglSuratIndo={tglSuratIndo}
        />
      </div>
    </div>
  );
});

export default PdfContainer;
