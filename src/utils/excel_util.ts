// utils/excel_utils.ts
import type { SelectedItem } from "../types/index";

interface PreorderData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export const sendToGoogleSheets = async (
  selectedItems: SelectedItem[],
  preorderData: PreorderData,
  total: number
): Promise<boolean> => {
  try {
    // Format data pesanan
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

    // Data yang akan dikirim ke Google Sheets
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
    };

    // URL Google Apps Script Web App
    // Ganti dengan URL deployment Google Apps Script Anda
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzOVF2mD-HsyWj4vqrtoGCf3XE2Tz9UxJo8UpPuiwrx01bvFc19NzbNwmStA1DEmRnk/exec";

     await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Penting untuk Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Karena mode no-cors, kita tidak bisa membaca response
    // Tapi request tetap terkirim
    console.log("Data sent to Google Sheets successfully");
    return true;
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    // Tetap return true agar tidak mengganggu flow WhatsApp
    return true;
  }
};