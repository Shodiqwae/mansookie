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

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-name">{item.name}</div>
        <div className="cart-item-size">{size?.label}</div>
        <div className="cart-item-price">
          Rp{itemPrice.toLocaleString("id-ID")}
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