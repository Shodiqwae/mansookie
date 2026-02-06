import React, { useState } from "react";
import qrisImage from "../assets/image/qris.jpeg";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: "QRIS" | "Cash", proofFile: File | null) => void;
  total: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  total,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"QRIS" | "Cash" | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleConfirm = () => {
    if (paymentMethod === "QRIS" && !proofFile) {
      alert("Mohon upload bukti pembayaran QRIS terlebih dahulu.");
      return;
    }
    if (paymentMethod) {
      onConfirm(paymentMethod, proofFile);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        width: "90%",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative"
      }}>
        <h3 style={{ marginTop: 0, textAlign: "center" }}>Pilih Metode Pembayaran</h3>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Total yang harus dibayar: <strong>Rp{total.toLocaleString("id-ID")}</strong>
        </p>

        <div className="payment-options" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            type="button"
            onClick={() => setPaymentMethod("QRIS")}
            style={{
              flex: 1,
              padding: "10px",
              border: paymentMethod === "QRIS" ? "2px solid #d4a373" : "1px solid #ddd",
              backgroundColor: paymentMethod === "QRIS" ? "#faedcd" : "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            QRIS
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("Cash")}
            style={{
              flex: 1,
              padding: "10px",
              border: paymentMethod === "Cash" ? "2px solid #d4a373" : "1px solid #ddd",
              backgroundColor: paymentMethod === "Cash" ? "#faedcd" : "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Cash
          </button>
        </div>

        {paymentMethod === "QRIS" && (
          <div className="qris-section" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img 
              src={qrisImage} 
              alt="QRIS Code" 
              style={{ maxWidth: "200px", width: "100%", marginBottom: "10px", borderRadius: "8px" }} 
            />
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
              Silakan scan QRIS di atas untuk pembayaran.
            </p>
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                Upload Bukti Transfer:
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        )}

        {paymentMethod === "Cash" && (
          <div className="cash-section" style={{ 
            backgroundColor: "#f9f9f9", 
            padding: "15px", 
            borderRadius: "5px", 
            marginBottom: "20px",
            fontSize: "14px",
            color: "#555"
          }}>
            <p style={{ margin: 0 }}>
              Pembayaran akan dilakukan secara tunai saat pesanan diterima (COD).
              Pastikan uang pas untuk memudahkan transaksi.
            </p>
          </div>
        )}

        <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!paymentMethod || (paymentMethod === "QRIS" && !proofFile)}
            style={{
              padding: "8px 16px",
              border: "none",
              backgroundColor: (!paymentMethod || (paymentMethod === "QRIS" && !proofFile)) ? "#ccc" : "#d4a373",
              color: "white",
              borderRadius: "5px",
              cursor: (!paymentMethod || (paymentMethod === "QRIS" && !proofFile)) ? "not-allowed" : "pointer",
              fontWeight: "bold"
            }}
          >
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
