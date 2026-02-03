import React from "react";
import type { MenuItem, SelectedItem } from "../types/index";

interface MenuCardProps {
  item: MenuItem;
  selectedItems: SelectedItem[];
  onToggle: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, selectedItems, onToggle }) => {
  // Cek apakah ada item dari produk yang sama di keranjang
  const itemsInCart = selectedItems.filter((i) => i.id === item.id);
  const hasItemInCart = itemsInCart.length > 0;

  return (
    <div className={`menu-card ${hasItemInCart ? "has-in-cart" : ""}`}>
      {/* Badge Item di Keranjang */}
      {hasItemInCart && (
        <div className="menu-cart-indicator">
          <span className="indicator-badge">
            ✓ {itemsInCart.length} di Keranjang
          </span>
        </div>
      )}

      <div className="menu-image">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-item-image"
          />
        ) : (
          <svg viewBox="0 0 200 200" className="cookie-svg">
            <circle cx="100" cy="100" r="75" fill="#D4A574" />
            <circle cx="100" cy="100" r="70" fill="#E0B589" />
            <circle cx="80" cy="85" r="12" fill="#5C4033" />
            <circle cx="120" cy="80" r="11" fill="#5C4033" />
            <circle cx="100" cy="105" r="10" fill="#5C4033" />
            <circle cx="75" cy="115" r="9" fill="#5C4033" />
            <circle cx="130" cy="110" r="10" fill="#5C4033" />
          </svg>
        )}
      </div>

      <div className={`menu-badge ${item.badgeColor}`}>
        {item.badge}
      </div>

      <div className="menu-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="menu-footer">
            <div className="menu-price">
              <span className="price">
                Rp{item.price.toLocaleString("id-ID")}
              </span>
              <span className="unit">/pcs</span>
            </div>
          <button
            className={`btn-add ${!item.active ? 'disabled' : ''}`}
            onClick={() => item.active && onToggle(item)}
            disabled={!item.active}
            style={!item.active ? { opacity: 0.5, cursor: 'not-allowed', background: '#ccc' } : {}}
          >
            {item.active ? "+ Pilih" : "Habis"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;