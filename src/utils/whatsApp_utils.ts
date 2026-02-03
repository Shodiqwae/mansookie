import type { SelectedItem } from "../types/index";
import { WHATSAPP_NUMBER } from "../data/constans";

export const sendPreorderToWhatsApp = (
  selectedItems: SelectedItem[],
  preorderForm: { name: string; phone: string; address: string; notes: string },
  total: number
) => {
  const orderList = selectedItems
    .map((item) => {
      const size = item.sizes.find((s) => s.id === item.selectedSize);
      const multiplier = size?.priceMultiplier || 1;
      const basePrice = item.price * multiplier;
      
      let finalPrice = basePrice;
      let discountText = "";
      
      if (size && size.discountPercentage) {
        finalPrice = basePrice - (basePrice * size.discountPercentage) / 100;
        discountText = ` (Disc ${size.discountPercentage}%)`;
      }

      return `• ${item.name} - ${size?.label}${discountText} (${item.quantity}x) - Rp${(finalPrice * item.quantity).toLocaleString("id-ID")}`;
    })
    .join("\n");

  const whatsappMessage = `🍪 *PRE-ORDER MANSOOKIE* 🍪

📝 *Detail Pesanan:*
${orderList}

💰 *Total: Rp${total.toLocaleString("id-ID")}*

👤 *Data Pemesan:*
Nama: ${preorderForm.name}
No. HP: ${preorderForm.phone}
Alamat: ${preorderForm.address}
${preorderForm.notes ? `Catatan: ${preorderForm.notes}` : ""}

Terima kasih telah memesan di Mansookie! 🙏`;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};

export const sendContactToWhatsApp = (name: string, email: string, message: string) => {
  const whatsappMessage = `Halo Mansookie! 👋

Nama: ${name}
Email: ${email}
Pesan: ${message}`;

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, "_blank");
};