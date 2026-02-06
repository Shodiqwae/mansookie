import React, { useState, useEffect, useRef } from "react";
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
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen && paymentMethod === "QRIS") {
      setTimeLeft(300); // Reset to 5 minutes
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, paymentMethod]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleDownloadQris = () => {
    const link = document.createElement("a");
    link.href = qrisImage;
    link.download = "qris_payment.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handleCloseAttempt = () => {
    if (paymentMethod === "QRIS") {
      setPendingAction(() => onClose);
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSwitchToCash = () => {
    if (paymentMethod === "QRIS") {
      setPendingAction(() => () => setPaymentMethod("Cash"));
      setShowCancelConfirm(true);
    } else {
      setPaymentMethod("Cash");
    }
  };

  const confirmPendingAction = () => {
    if (pendingAction) {
      pendingAction();
    }
    // If we are just switching modes, we might not want to close everything deeply,
    // but the requirement implies "cancelling the QRIS payment" which usually resets things.
    // However, if we switch to Cash, we just set paymentMethod to Cash.
    // We should reset proofFile if we switch away from QRIS probably.
    if (pendingAction && pendingAction !== onClose) {
        setProofFile(null);
    } else if (pendingAction === onClose) {
        setPaymentMethod(null);
        setProofFile(null);
    }
    
    setShowCancelConfirm(false);
    setPendingAction(null);
  };

  const cancelPendingAction = () => {
    setShowCancelConfirm(false);
    setPendingAction(null);
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
        {showCancelConfirm ? (
           <div style={{ textAlign: "center", padding: "20px" }}>
             <h4>Yakin ingin membatalkan pembayaran?</h4>
             <p>Waktu pembayaran QRIS anda masih berjalan.</p>
             <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
               <button 
                 onClick={cancelPendingAction}
                 style={{
                   padding: "8px 16px",
                   borderRadius: "5px",
                   border: "1px solid #ccc",
                   backgroundColor: "#fff",
                   cursor: "pointer"
                 }}
               >
                 Tidak
               </button>
               <button 
                 onClick={confirmPendingAction}
                 style={{
                   padding: "8px 16px",
                   borderRadius: "5px",
                   border: "none",
                   backgroundColor: "#d9534f",
                   color: "white",
                   cursor: "pointer"
                 }}
               >
                 Ya, Batalkan
               </button>
             </div>
           </div>
        ) : (
          <>
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
                onClick={handleSwitchToCash}
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
                <div style={{ marginBottom: "10px", fontWeight: "bold", color: timeLeft < 60 ? "red" : "black" }}>
                  Sisa Waktu: {formatTime(timeLeft)}
                </div>
                <img 
                  src={qrisImage} 
                  alt="QRIS Code" 
                  style={{ maxWidth: "200px", width: "100%", marginBottom: "10px", borderRadius: "8px" }} 
                />
                <button
                  type="button"
                  onClick={handleDownloadQris}
                  style={{
                    display: "block",
                    margin: "0 auto 10px auto",
                    padding: "5px 10px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Download QRIS
                </button>
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
                onClick={handleCloseAttempt}
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
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
