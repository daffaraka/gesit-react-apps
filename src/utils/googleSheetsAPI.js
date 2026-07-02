export const saveSppdToSpreadsheet = async (webhookUrl, payload) => {
  if (!webhookUrl) {
    throw new Error("Webhook URL belum diatur.");
  }
  
  try {
    // Karena Apps Script menggunakan doGet/doPost, POST JSON sering kena CORS preflight,
    // Kita gunakan POST form-urlencoded atau text/plain dengan redirect: follow
    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Meminimalisir CORS Preflight Error
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving to spreadsheet:", error);
    throw error;
  }
};
