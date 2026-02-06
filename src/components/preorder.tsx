import React, { useState } from "react";
import type { SelectedItem } from "../types/index";
import { calculateTotal } from "../utils/cart_util";
import { sendPreorderToWhatsApp } from "../utils/whatsApp_utils";
import { sendToGoogleSheets } from "../utils/excel_util";
import CartItem from "./cartitem";
import PaymentModal from "./payment_modal";

interface PreOrderProps {
  selectedItems: SelectedItem[];
  onUpdateQuantity: (cartItemId: string, change: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

const PreOrder: React.FC<PreOrderProps> = ({
  selectedItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [preorderForm, setPreorderForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("Silakan pilih menu terlebih dahulu!");
      return;
    }
    
    setShowPaymentModal(true);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePaymentConfirm = async (method: "QRIS" | "Cash", proofFile: File | null) => {
    setIsSubmitting(true);
    setShowPaymentModal(false);

    try {
      const total = calculateTotal(selectedItems);
      let paymentProof = "";

      if (proofFile) {
        try {
          paymentProof = await fileToBase64(proofFile);
        } catch (err) {
          console.error("Error converting file to base64", err);
          alert("Gagal memproses gambar bukti pembayaran. Lanjut tanpa gambar.");
        }
      }

      const submissionData = {
        ...preorderForm,
        paymentMethod: method,
        paymentProof: paymentProof
      };
      
      // Kirim ke Google Sheets secara background (tidak ditampilkan ke user)
      // Note: Sending large Base64 strings to Google Sheets via GAS might hit limits or be slow.
      sendToGoogleSheets(selectedItems, submissionData, total);
      
      // Kirim ke WhatsApp (ini yang ditampilkan ke user)
      sendPreorderToWhatsApp(selectedItems, preorderForm, total, method);

      // Reset form dan cart
      setPreorderForm({ name: "", phone: "", address: "", notes: "" });
      onClearCart();
      
      alert("Pesanan Anda akan dikirim ke WhatsApp!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal(selectedItems);

  return (
    <section className="preorder-section" id="preorder">
      <div className="preorder-container">
        <h2 className="section-title">Pre-Order Sekarang</h2>
        <div className="preorder-grid">
          {/* Keranjang Belanja */}
          <div className="preorder-left">
            <h3 className="preorder-title">🛒 Keranjang Belanja</h3>

            {selectedItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                <p>Belum ada item dipilih</p>
                <p style={{ fontSize: "14px", marginTop: "10px" }}>
                  Pilih menu favorit kamu dari menu di atas
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {selectedItems.map((item) => (
                    <CartItem
                      key={item.cartItemId}
                      item={item}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemoveItem}
                    />
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>Rp{total.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>Rp{total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Form Pre-Order */}
          <div className="preorder-right">
            <h3 className="preorder-title">📋 Data Pemesan</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="preorder-name">Nama Lengkap *</label>
                <input
                  type="text"
                  id="preorder-name"
                  className="form-input"
                  placeholder="Masukkan nama lengkap"
                  value={preorderForm.name}
                  onChange={(e) =>
                    setPreorderForm({ ...preorderForm, name: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preorder-phone">No. WhatsApp *</label>
                <input
                  type="tel"
                  id="preorder-phone"
                  className="form-input"
                  placeholder="08xx xxxx xxxx"
                  value={preorderForm.phone}
                  onChange={(e) =>
                    setPreorderForm({ ...preorderForm, phone: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preorder-address">Alamat Lengkap *</label>
                <textarea
                  id="preorder-address"
                  className="form-textarea"
                  placeholder="Masukkan alamat pengiriman"
                  value={preorderForm.address}
                  onChange={(e) =>
                    setPreorderForm({ ...preorderForm, address: e.target.value })
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="preorder-notes">Catatan (Opsional)</label>
                <textarea
                  id="preorder-notes"
                  className="form-textarea"
                  placeholder="Catatan tambahan untuk pesanan"
                  value={preorderForm.notes}
                  onChange={(e) =>
                    setPreorderForm({ ...preorderForm, notes: e.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={selectedItems.length === 0 || isSubmitting}
                style={{
                  opacity: selectedItems.length === 0 || isSubmitting ? 0.5 : 1,
                  cursor: selectedItems.length === 0 || isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? "⏳ Mengirim..." : "🚀 Lanjut Pembayaran"}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handlePaymentConfirm}
        total={total}
      />
    </section>
  );
};

export default PreOrder;