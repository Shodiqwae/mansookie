import React from "react";
import type { MenuItem } from "../types/index";

interface SizeModalProps {
  item: MenuItem;
  onClose: () => void;
  onSelectSize: (item: MenuItem, sizeId: string) => void;
}

const SizeModal: React.FC<SizeModalProps> = ({ item, onClose, onSelectSize }) => {
  return (
    <div className="size-modal-overlay" onClick={onClose}>
      <div className="size-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Pilih Ukuran - {item.name}</h3>
        <div className="size-options">
          {item.sizes.map((size) => {
            const finalPrice = item.price * size.priceMultiplier;
            return (
              <button
                key={size.id}
                className="size-option"
                onClick={() => onSelectSize(item, size.id)}
              >
                <div className="size-label">{size.label}</div>
                <div className="size-price">
                  Rp{Math.round(finalPrice).toLocaleString("id-ID")}
                </div>
              </button>
            );
          })}
        </div>
        <button className="size-modal-close" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default SizeModal;