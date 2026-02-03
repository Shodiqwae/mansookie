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
            const basePrice = item.price * size.priceMultiplier;
            const discountAmount = size.discountPercentage ? (basePrice * size.discountPercentage) / 100 : 0;
            const finalPrice = basePrice - discountAmount;
            
            return (
              <button
                key={size.id}
                className="size-option"
                onClick={() => onSelectSize(item, size.id)}
              >
                <div className="size-label">{size.label}</div>
                <div className="size-price">
                  {size.discountPercentage ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ textDecoration: 'line-through', fontSize: '0.8em', color: '#999' }}>
                         Rp{Math.round(basePrice).toLocaleString("id-ID")}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75em', color: '#DC2626', marginRight: '4px', background: '#FEE2E2', padding: '1px 4px', borderRadius: '4px' }}>
                          -{size.discountPercentage}%
                        </span>
                        <span style={{ color: '#DC2626', fontWeight: 'bold' }}>
                           Rp{Math.round(finalPrice).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span>Rp{Math.round(basePrice).toLocaleString("id-ID")}</span>
                  )}
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