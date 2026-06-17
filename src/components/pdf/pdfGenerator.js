import html2pdf from 'html2pdf.js';

export async function generatePdf(element, filename) {
  const opt = {
    margin: [5, 10, 15, 10], // top, left, bottom, right
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'legal', orientation: 'portrait' }
  };

  try {
    const blobUrl = await html2pdf().set(opt).from(element).output('bloburl');
    return blobUrl;
  } catch (error) {
    console.error('PDF Generation error:', error);
    return false;
  }
}
