import React, { useState } from "react";
import type { SelectedItem } from "../types/index";
import { calculateTotal } from "../utils/cart_util";
import { sendPreorderToWhatsApp } from "../utils/whatsApp_utils";
import CartItem from "./cartitem";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("Silakan pilih menu terlebih dahulu!");
      return;
    }

    const total = calculateTotal(selectedItems);
    sendPreorderToWhatsApp(selectedItems, preorderForm, total);

    setPreorderForm({ name: "", phone: "", address: "", notes: "" });
    onClearCart();
    alert("Pesanan Anda akan dikirim ke WhatsApp!");
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
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={selectedItems.length === 0}
                style={{
                  opacity: selectedItems.length === 0 ? 0.5 : 1,
                  cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                🚀 Kirim Pre-Order via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreOrder;