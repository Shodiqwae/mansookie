import React from "react";
import type { SelectedItem } from "../types/index";

interface CartItemProps {
  item: SelectedItem;
  onUpdateQuantity: (cartItemId: string, change: number) => void;
  onRemove: (cartItemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const size = item.sizes.find((s) => s.id === item.selectedSize);
  const itemPrice = Math.round(
    item.price * (size?.priceMultiplier || 1)
  );

  let finalPrice = itemPrice;
  if (size?.discountPercentage) {
    finalPrice = itemPrice - (itemPrice * size.discountPercentage) / 100;
  }

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-size">{size?.label}</div>
        <div className="cart-item-price">
          {size?.discountPercentage ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span style={{ textDecoration: 'line-through', fontSize: '0.8em', color: '#999' }}>
                 Rp{itemPrice.toLocaleString("id-ID")}
               </span>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                 <span style={{ fontSize: '0.7em', color: '#DC2626', marginRight: '4px', background: '#FEE2E2', padding: '1px 3px', borderRadius: '4px' }}>
                   -{size.discountPercentage}%
                 </span>
                 <span style={{ color: '#DC2626', fontWeight: 'bold' }}>
                   Rp{Math.round(finalPrice).toLocaleString("id-ID")}
                 </span>
               </div>
            </div>
          ) : (
             <span>Rp{itemPrice.toLocaleString("id-ID")}</span>
          )}
        </div>
      </div>

      <div className="quantity-control">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
        >
          -
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
        >
          +
        </button>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.cartItemId)}
      >
        Hapus
      </button>
    </div>
  );
};

export default CartItem;