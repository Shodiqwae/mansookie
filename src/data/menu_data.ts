import type { MenuItem } from "../types";
import cooklat from "../assets/image/coklat-c.jpeg";
import original from "../assets/image/original-c.jpeg";
import relvelvet from "../assets/image/redvelvet-c.jpeg";
import redorivel from "../assets/image/red-ori-c.jpeg";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Cookies Original",
    description:
      "Cookies tipe klasik renyah di luar lembut di dalam, dengan rasa manis pas dan cocok dinikmati bersama minuman hangat.",
    price: 5000,
    badge: "Original",
    badgeColor: "original",
    image: original,
    sizes: [
      { id: "small", label: "Small (4 pcs)", priceMultiplier: 1 },
      { id: "medium", label: "Medium (6 pcs)", priceMultiplier: 1.6 },
    ],
  },
  {
    id: 2,
    name: "Cookies Choco",
    description:
      "Cookies choco dengan rasa manis pahit yang seimbang, renyah di luar, lembut di dalam, dan cocok untuk pencinta cokelat.",
    price: 6000,
    badge: "BESTSELLER",
    badgeColor: "bestseller",
    image: cooklat,
    sizes: [
      { id: "small", label: "Small (4 pcs)", priceMultiplier: 1 },
      { id: "medium", label: "Medium (6 pcs)", priceMultiplier: 1.5 },
    ],
  },
  {
    id: 3,
    name: "Cookies RedVelvet Marshmallow",
    description:
      "Cookies red velvet renyah di luar dan lembut di dalam, dengan marshmallow leleh ringan yang memberi manis seimbang dan tidak berlebihan.",
    price: 11000,
    badge: "PREMIUM",
    badgeColor: "bestseller",
    image: relvelvet,
    sizes: [{ id: "medium", label: "Medium (6 pcs)", priceMultiplier: 1 }],
  },
  {
    id: 4,
    name: "Cookies Red Velvet",
    description:
      "Cookies Red Velvet dengan warna merah yang menggoda, renyah di luar, lembut di dalam, dan manisnya pas bikin nagih.",
    price: 6000,
    badge: "NEW",
    badgeColor: "new",
    image: redorivel,
    sizes: [
      { id: "small", label: "Small (4 pcs)", priceMultiplier: 1 },
      { id: "medium", label: "Medium (6 pcs)", priceMultiplier: 1.5 },
    ],
  },
  {
    id: 5,
    name: "Cookies matcha",
    description:
      "Cookies matcha ini renyah di luar, lembut dan chewy di dalam, dengan aroma teh hijau yang harum dan rasa manis pahit yang seimbang.",
    price: 6000,
    badge: "NEW",
    badgeColor: "new",
    sizes: [
      { id: "small", label: "Small (4 pcs)", priceMultiplier: 1 },
      { id: "medium", label: "Medium (6 pcs)", priceMultiplier: 1.5 },
    ],
  },
];