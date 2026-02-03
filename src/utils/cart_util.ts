import type { SelectedItem } from "../types/index";

export const calculateTotal = (selectedItems: SelectedItem[]): number => {
  return selectedItems.reduce((total, item) => {
    const size = item.sizes.find((s) => s.id === item.selectedSize);
    const multiplier = size ? size.priceMultiplier : 1;
    const basePrice = item.price * multiplier;
    
    let finalPrice = basePrice;
    if (size && size.discountPercentage) {
      finalPrice = basePrice - (basePrice * size.discountPercentage) / 100;
    }
    
    return total + finalPrice * item.quantity;
  }, 0);
};

export const updateItemQuantity = (
  selectedItems: SelectedItem[],
  cartItemId: string,
  change: number
): SelectedItem[] => {
  return selectedItems.map((item) => {
    if (item.cartItemId === cartItemId) {
      const newQty = Math.max(1, item.quantity + change);
      return { ...item, quantity: newQty };
    }
    return item;
  });
};

export const removeItemFromCart = (
  selectedItems: SelectedItem[],
  cartItemId: string
): SelectedItem[] => {
  return selectedItems.filter((item) => item.cartItemId !== cartItemId);
};