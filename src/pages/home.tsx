import React, { useState } from "react";
import "../style/landing.css";
import cookieImage from "../assets/image/triple_cukis.png";
import cooklat from "../assets/image/coklat-c.jpeg";
import original from "../assets/image/original-c.jpeg";
import relvelvet from "../assets/image/redvelvet-c.jpeg";
import redorivel from "../assets/image/red-ori-c.jpeg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  badge?: string;
  badgeColor?: string;
  image?: string; // optional image filename
  sizes: Array<{ id: string; label: string; priceMultiplier: number }>;
}

interface SelectedItem extends MenuItem {
  quantity: number;
  selectedSize: string;
  cartItemId: string; // Unique ID untuk kombinasi cookies + size
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Home: React.FC = () => {
  const [] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [preorderForm, setPreorderForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const updateQuantity = (cartItemId: string, change: number) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (cartItemId: string) => {
    setSelectedItems(
      selectedItems.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const size = item.sizes.find((s) => s.id === item.selectedSize);
      const multiplier = size ? size.priceMultiplier : 1;
      return total + item.price * multiplier * item.quantity;
    }, 0);
  };

  const handlePreorderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("Silakan pilih menu terlebih dahulu!");
      return;
    }

    const orderListWithDuplicates = selectedItems.map((item) => {
      const size = item.sizes.find((s) => s.id === item.selectedSize);
      const multiplier = size?.priceMultiplier || 1;
      const itemPrice = Math.round(item.price * multiplier);
      return {
        name: item.name,
        size: size?.label || "Unknown",
        quantity: item.quantity,
        price: itemPrice,
      };
    });

    // Ini untuk debug, bisa dihapus nanti
    console.log("Items dengan size berbeda:", orderListWithDuplicates);

    // Format daftar pesanan
    const orderList = selectedItems
      .map((item) => {
        const size = item.sizes.find((s) => s.id === item.selectedSize);
        const multiplier = size?.priceMultiplier || 1;
        const itemPrice = Math.round(item.price * multiplier);
        return `• ${item.name} - ${size?.label} (${item.quantity}x) - Rp${(itemPrice * item.quantity).toLocaleString("id-ID")}`;
      })
      .join("\n");

    const total = calculateTotal();

    // Format pesan WhatsApp
    const whatsappMessage = `🍪 *PRE-ORDER MANSOOKIE* 🍪

📝 *Detail Pesanan:*
${orderList}

💰 *Total: Rp${total.toLocaleString("id-ID")}*

👤 *Data Pemesan:*
Nama: ${preorderForm.name}
No. HP: ${preorderForm.phone}
Alamat: ${preorderForm.address}
${preorderForm.notes ? `Catatan: ${preorderForm.notes}` : ""}

Terima kasih telah memesan di Mansookie! 🙏`;

    // Nomor WhatsApp
    const phoneNumber = "6281282702311";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Buka WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form dan cart
    setPreorderForm({ name: "", phone: "", address: "", notes: "" });
    setSelectedItems([]);

    alert("Pesanan Anda akan dikirim ke WhatsApp!");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (form.elements.namedItem("contact-name") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("contact-email") as HTMLInputElement)
      .value;
    const message = (
      form.elements.namedItem("contact-message") as HTMLTextAreaElement
    ).value;

    // Nomor WhatsApp (format: 62xxxxxxxxxx tanpa 0)
    const phoneNumber = "6281282702311";

    // Format pesan
    const whatsappMessage = `Halo Mansookie! 👋

Nama: ${name}
Email: ${email}
Pesan: ${message}`;

    // Buat URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Buka WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form
    form.reset();

    // Alert konfirmasi
    alert(
      "Terima kasih! Kami akan membuka WhatsApp untuk melanjutkan percakapan.",
    );
  };

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const menuItems: MenuItem[] = [
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

  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [selectedItemForSize, setSelectedItemForSize] =
    useState<MenuItem | null>(null);

  const handleAddToCart = (item: MenuItem, sizeId: string): void => {
    const cartItemId = `${item.id}-${sizeId}`;

    // Cek apakah kombinasi cookies + size sudah ada di cart
    const existingItem = selectedItems.find((i) => i.cartItemId === cartItemId);

    if (existingItem) {
      // Jika sudah ada, tampilkan alert
      alert(
        `${item.name} dengan ukuran ${item.sizes.find((s) => s.id === sizeId)?.label} sudah ada di keranjang!`,
      );
      setSizeModalOpen(false);
      setSelectedItemForSize(null);
      return;
    }

    const itemWithSize = {
      ...item,
      quantity: 1,
      selectedSize: sizeId,
      cartItemId: cartItemId,
    };
    setSelectedItems([...selectedItems, itemWithSize]);
    setSizeModalOpen(false);
    setSelectedItemForSize(null);
  };

  const toggleMenuItem = (item: MenuItem): void => {
    // Selalu buka modal, user bisa pilih size yang berbeda
    setSizeModalOpen(true);
    setSelectedItemForSize(item);
  };

  const scrollToElement = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <header className="header">
        
        <nav className="nav">
          <a onClick={() => scrollToElement("home")} className="nav-link">
            Home
          </a>
          <a onClick={() => scrollToElement("about")} className="nav-link">
            About
          </a>
          <a onClick={() => scrollToElement("menu")} className="nav-link">
            Menu
          </a>

          
          <a onClick={() => scrollToElement("preorder")} className="nav-link">
            Pre-Order
          </a>

          <a onClick={() => scrollToElement("contact")} className="nav-link">
            Contact
          </a>

        </nav>
      </header>

      {sizeModalOpen && selectedItemForSize && (
        <div
          className="size-modal-overlay"
          onClick={() => setSizeModalOpen(false)}
        >
          <div className="size-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Pilih Ukuran - {selectedItemForSize.name}</h3>
            <div className="size-options">
              {selectedItemForSize.sizes.map((size) => {
                const finalPrice =
                  selectedItemForSize.price * size.priceMultiplier;
                return (
                  <button
                    key={size.id}
                    className="size-option"
                    onClick={() =>
                      handleAddToCart(selectedItemForSize, size.id)
                    }
                  >
                    <div className="size-label">{size.label}</div>
                    <div className="size-price">
                      Rp{Math.round(finalPrice).toLocaleString("id-ID")}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              className="size-modal-close"
              onClick={() => setSizeModalOpen(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight">Selamat Datang Di Mansookie</span>
              Cookies yang Bikin Hari Lebih Manis
            </h1>
            <p className="hero-subtitle">
              Cookies terenak bakal hadir sebentar lagi! Dibuat dengan bahan
              premium dan cinta untuk menemani setiap momen spesial kamu.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-secondary"
                onClick={() => scrollToElement("menu")}
              >
                Lihat Menu
              </button>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">🍪</span>
                <span className="feature-text">Fresh Daily</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌟</span>
                <span className="feature-text">Premium Quality</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💝</span>
                <span className="feature-text">Made with Love</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img
              src={cookieImage}
              alt="Cookies"
              className="cookie-stack-svg cookie-image-animated"
            />
            <div className="crumb crumb-1"></div>
            <div className="crumb crumb-2"></div>
            <div className="crumb crumb-3"></div>
            <div className="crumb crumb-4"></div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-content">
          <h2 className="section-title">Kenapa Pilih Mansookie?</h2>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">🥇</div>
              <h3>Bahan Premium</h3>
              <p>
                Menggunakan bahan-bahan pilihan berkualitas tinggi untuk rasa
                terbaik
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">👨‍🍳</div>
              <h3>Resep Rahasia</h3>
              <p>
                Dibuat dengan resep spesial yang sudah teruji dan disukai banyak
                orang
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">📦</div>
              <h3>Kemasan Cantik</h3>
              <p>Packaging menarik, cocok untuk hadiah atau moment spesial</p>
            </div>
          </div>
        </div>
      </section>

      <section className="menu" id="menu">
        <div className="menu-content">
          <h2 className="section-title">Menu Pilihan Kami</h2>
          <p className="menu-subtitle">
            Pilih cookies favorit kamu dan jadilah yang pertama merasakan
            kelezatannya
          </p>
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-image">
                  {item.image ? (
                    // JIKA ADA GAMBAR, TAMPILKAN GAMBAR
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-item-image"
                    />
                  ) : (
                    // JIKA TIDAK ADA GAMBAR, TAMPILKAN SVG COOKIE
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
                      className={`btn-add ${selectedItems.find((i) => i.id === item.id) ? "active" : ""}`}
                      onClick={() => toggleMenuItem(item)}
                    >
                      {selectedItems.find((i) => i.id === item.id)
                        ? "✓ Ada di Keranjang"
                        : "+ Pilih"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="preorder-section" id="preorder">
        <div className="preorder-container">
          <h2 className="section-title">Pre-Order Sekarang</h2>
          <div className="preorder-grid">
            {/* Keranjang Belanja */}
            <div className="preorder-left">
              <h3 className="preorder-title">🛒 Keranjang Belanja</h3>

              {selectedItems.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  <p>Belum ada item dipilih</p>
                  <p style={{ fontSize: "14px", marginTop: "10px" }}>
                    Pilih menu favorit kamu dari menu di atas
                  </p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {selectedItems.map((item) => (
                      <div key={item.cartItemId} className="cart-item">
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-size">
                            {
                              item.sizes.find((s) => s.id === item.selectedSize)
                                ?.label
                            }
                          </div>
                          <div className="cart-item-price">
                            Rp
                            {Math.round(
                              item.price *
                                (item.sizes.find(
                                  (s) => s.id === item.selectedSize,
                                )?.priceMultiplier || 1),
                            ).toLocaleString("id-ID")}
                          </div>
                        </div>

                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.cartItemId)}
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>Rp{calculateTotal().toLocaleString("id-ID")}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>Rp{calculateTotal().toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Form Pre-Order */}
            <div className="preorder-right">
              <h3 className="preorder-title">📋 Data Pemesan</h3>
              <form onSubmit={handlePreorderSubmit}>
                <div className="form-group">
                  <label htmlFor="preorder-name">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="preorder-name"
                    className="form-input"
                    placeholder="Masukkan nama lengkap"
                    value={preorderForm.name}
                    onChange={(e) =>
                      setPreorderForm({ ...preorderForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preorder-phone">No. WhatsApp *</label>
                  <input
                    type="tel"
                    id="preorder-phone"
                    className="form-input"
                    placeholder="08xx xxxx xxxx"
                    value={preorderForm.phone}
                    onChange={(e) =>
                      setPreorderForm({
                        ...preorderForm,
                        phone: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preorder-address">Alamat Lengkap *</label>
                  <textarea
                    id="preorder-address"
                    className="form-textarea"
                    placeholder="Masukkan alamat pengiriman"
                    value={preorderForm.address}
                    onChange={(e) =>
                      setPreorderForm({
                        ...preorderForm,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preorder-notes">Catatan (Opsional)</label>
                  <textarea
                    id="preorder-notes"
                    className="form-textarea"
                    placeholder="Catatan tambahan untuk pesanan"
                    value={preorderForm.notes}
                    onChange={(e) =>
                      setPreorderForm({
                        ...preorderForm,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={selectedItems.length === 0}
                  style={{
                    opacity: selectedItems.length === 0 ? 0.5 : 1,
                    cursor:
                      selectedItems.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  🚀 Kirim Pre-Order via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-content">
          <h2 className="section-title">Hubungi Kami</h2>
          <div className="contact-grid">
            <div>
              <h3 className="section-title-left">Ada Pertanyaan?</h3>
              <p className="contact-description">
                Jangan ragu untuk menghubungi kami. Tim Mansookie siap membantu
                kamu dengan respons cepat dan ramah.
              </p>

              <div className="contact-items">
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div>
                    <h4>WhatsApp</h4>
                    <p>+62 812-8270-2311</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <p>hello@mansookie.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Lokasi</h4>
                    <p>Depok, Jawa Barat</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">⏰</span>
                  <div>
                    <h4>Jam Operasional</h4>
                    <p>Sesuai Mood</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h4>Ikuti Kami</h4>
                <div className="social-icons">
                  <a
                    href="https://www.instagram.com/sweetmansookie?igsh=MWtib3lzN3EydXBibw=="
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📸 Instagram
                  </a>
                
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h3>Kirim Pesan</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Nama</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="form-input"
                    placeholder="Nama kamu"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="form-input"
                    placeholder="Email kamu"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Pesan</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Tuliskan pesan kamu di sini..."
                    required
                  />
                </div>

                <button type="submit" className="btn-submit">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">@mansookie</div>
            <p>
              Cookies terenak dengan bahan premium dan cinta untuk menemani
              momen spesial kamu.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigasi</h4>
            <a onClick={() => scrollToElement("home")}>Home </a>
            <a onClick={() => scrollToElement("about")}>Tentang Kami</a>
            <a onClick={() => scrollToElement("menu")}>Menu</a>
            <a onClick={() => scrollToElement("contact")}>Hubungi Kami</a>
          </div>

          <div className="footer-section">
            <h4>Kontak</h4>
            <p>📱 +62 812-8270-2311</p>
            <p>📧 hello@mansookie.com</p>
            <p>📍 Depok, Jawa barat</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Mansookie. Semua hak dilindungi. Made with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
