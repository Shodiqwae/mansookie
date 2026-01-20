export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  badge?: string;
  badgeColor?: string;
  image?: string; // optional image filename
  sizes: Array<{ id: string; label: string; priceMultiplier: number }>;
}

export interface SelectedItem extends MenuItem {
  quantity: number;
  selectedSize: string;
  cartItemId: string; // Unique ID untuk kombinasi cookies + size
}

interface FormData { 
  name: string;
  email: string; 
  message: string;
}