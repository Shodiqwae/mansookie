export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  active: boolean; 
  badge?: string;
  badgeColor?: string;
  image?: string; 
  sizes: Array<{ id: string; label: string; priceMultiplier: number; discountPercentage?: number }>;
}

export interface SelectedItem extends MenuItem {
  quantity: number;
  selectedSize: string;
  cartItemId: string; // Unique ID untuk kombinasi cookies + size
}

