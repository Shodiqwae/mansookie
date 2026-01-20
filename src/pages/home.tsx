import React, { useState } from "react";
import type { MenuItem, SelectedItem } from "../types/index";
import { updateItemQuantity, removeItemFromCart } from "../utils/cart_util";
import "../style/landing.css";

// Components
import Header from "../components/header";
import Hero from "../components/hero";
import About from "../components/about";
import Menu from "../components/menu";
import PreOrder from "../components/preorder";
import Contact from "../components/contact";
import Footer from "../components/footer";

const Home: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleAddToCart = (item: MenuItem, sizeId: string): void => {
    const cartItemId = `${item.id}-${sizeId}`;

    const existingItem = selectedItems.find((i) => i.cartItemId === cartItemId);

    if (existingItem) {
      alert(
        `${item.name} dengan ukuran ${item.sizes.find((s) => s.id === sizeId)?.label} sudah ada di keranjang!`
      );
      return;
    }

    const itemWithSize = {
      ...item,
      quantity: 1,
      selectedSize: sizeId,
      cartItemId: cartItemId,
    };
    setSelectedItems([...selectedItems, itemWithSize]);
  };

  const handleUpdateQuantity = (cartItemId: string, change: number) => {
    setSelectedItems(updateItemQuantity(selectedItems, cartItemId, change));
  };

  const handleRemoveItem = (cartItemId: string) => {
    setSelectedItems(removeItemFromCart(selectedItems, cartItemId));
  };

  const handleClearCart = () => {
    setSelectedItems([]);
  };

  return (
    <div className="container">
      <Header />
      <Hero />
      <About />
      <Menu selectedItems={selectedItems} onAddToCart={handleAddToCart} />
      <PreOrder
        selectedItems={selectedItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;

