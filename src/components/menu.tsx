import React, { useState } from "react";
import type { MenuItem, SelectedItem } from "../types/index";
import { menuItems } from "../data/menu_data";
import MenuCard from "./menu_card";
import SizeModal from "./sizemodal";

interface MenuProps {
  selectedItems: SelectedItem[];
  onAddToCart: (item: MenuItem, sizeId: string) => void;
}

const Menu: React.FC<MenuProps> = ({ selectedItems, onAddToCart }) => {
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedItemForSize, setSelectedItemForSize] = useState<MenuItem | null>(null);

  const handleToggleMenuItem = (item: MenuItem): void => {
    setSizeModalOpen(true);
    setSelectedItemForSize(item);
  };

  const handleSelectSize = (item: MenuItem, sizeId: string): void => {
    onAddToCart(item, sizeId);
    setSizeModalOpen(false);
    setSelectedItemForSize(null);
  };

  return (
    <>
      {sizeModalOpen && selectedItemForSize && (
        <SizeModal
          item={selectedItemForSize}
          onClose={() => {
            setSizeModalOpen(false);
            setSelectedItemForSize(null);
          }}
          onSelectSize={handleSelectSize}
        />
      )}

      <section className="menu" id="menu">
        <div className="menu-content">
          <h2 className="section-title">Menu Pilihan Kami</h2>
          <p className="menu-subtitle">
            Pilih cookies favorit kamu dan jadilah yang pertama merasakan
            kelezatannya
          </p>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                isInCart={!!selectedItems.find((i) => i.id === item.id)}
                onToggle={handleToggleMenuItem}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;