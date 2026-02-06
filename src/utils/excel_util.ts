// utils/excel_utils.ts
import type { SelectedItem } from "../types/index";

interface PreorderData {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod?: string;
  paymentProof?: string; // Base64 string for image
}

export const sendToGoogleSheets = async (
  selectedItems: SelectedItem[],
  preorderData: PreorderData,
  total: number
): Promise<boolean> => {
  try {
    const orderDetails = selectedItems
      .map((item) => {
        const size = item.sizes.find((s) => s.id === item.selectedSize);
        const sizeLabel = size?.label || "";
        const multiplier = size?.priceMultiplier || 1;
        const basePrice = item.price * multiplier;
        
        let finalPrice = basePrice;
        let discountInfo = "";
        
        if (size && size.discountPercentage) {
            finalPrice = basePrice - (basePrice * size.discountPercentage) / 100;
            discountInfo = ` (Disc ${size.discountPercentage}%)`;
        }

        const subtotal = finalPrice * item.quantity;
        
        return `${item.name} - ${sizeLabel}${discountInfo} (${item.quantity}x) = Rp${subtotal.toLocaleString("id-ID")}`;
      })
      .join(" | ");

    const formData = {
      timestamp: new Date().toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      }),
      name: preorderData.name,
      phone: preorderData.phone,
      address: preorderData.address,
      orderDetails: orderDetails,
      total: total,
      notes: preorderData.notes || "-",
      paymentMethod: preorderData.paymentMethod || "-",
      paymentProof: preorderData.paymentProof || "-",
    };

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEOtGxjII8p1hTNXJR-jX_98qAvcDJls3nTHbStG-cdX7hXHitfkkRUks6vyredQHRwA/exec";

    // ✅ HAPUS mode: "no-cors"
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // ✅ Ubah ke text/plain untuk bypass CORS preflight
      },
      body: JSON.stringify(formData),
    });

    // Cek response (optional, tapi bagus untuk debugging)
    const result = await response.json();
    console.log("Google Sheets response:", result);
    
    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    return false; // ⚠️ Return false jika gagal, tapi tetap lanjutkan WhatsApp
  }
};
