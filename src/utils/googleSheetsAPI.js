export const saveSppdToSpreadsheet = async (webhookUrl, payload) => {
  if (!webhookUrl) {
    throw new Error("Webhook URL belum diatur.");
  }
  
  try {
    // Karena Apps Script menggunakan doGet/doPost, POST JSON sering kena CORS preflight,
    // Kita gunakan POST form-urlencoded atau text/plain dengan mode: no-cors
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', // Penting untuk bypass blokir CORS browser ke Apps Script
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      }
    });

    // Karena mode 'no-cors' mereturn opaque response, kita tidak bisa membaca JSON dari response.
    // Selama fetch tidak throw network error, kita asumsikan request berhasil terkirim.
    return { status: 'SUCCESS' };
  } catch (error) {
    console.error("Error saving to spreadsheet:", error);
    throw error;
  }
};
