import React, { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  badge: string;
  badgeColor: string;
}

interface SelectedItem extends MenuItem {
  quantity: number;
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

  const updateQuantity = (id: number, change: number) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handlePreorderSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert("Silakan pilih menu terlebih dahulu!");
      return;
    }

    // Format daftar pesanan
    const orderList = selectedItems
      .map(
        (item) =>
          `• ${item.name} (${item.quantity}x) - Rp${(item.price * item.quantity).toLocaleString("id-ID")}`,
      )
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
    const phoneNumber = "6289691361617";
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
    const phoneNumber = "6289691361617";

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
      name: "Classic Chocolate Chip",
      description:
        "Cookies klasik dengan chocolate chip premium yang melumer di mulut",
      price: 15000,
      badge: "BESTSELLER",
      badgeColor: "bestseller",
    },
    {
      id: 2,
      name: "Double Choco Brownies",
      description:
        "Kombinasi sempurna coklat gelap dan coklat susu, super fudgy",
      price: 18000,
      badge: "NEW",
      badgeColor: "new",
    },
    {
      id: 3,
      name: "Matcha White Chocolate",
      description:
        "Rasa matcha yang premium dengan white chocolate yang lembut",
      price: 20000,
      badge: "PREMIUM",
      badgeColor: "bestseller",
    },
    {
      id: 4,
      name: "Strawberry Cheesecake",
      description: "Strawberry segar dengan filling cheesecake yang creamy",
      price: 19000,
      badge: "NEW",
      badgeColor: "new",
    },
  ];

  const toggleMenuItem = (item: MenuItem): void => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const scrollToElement = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Manrope:wght@200..800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          font-family: 'Manrope', sans-serif;
          background-color: #f5ede3;
          min-height: 100vh;
        }

        .btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit:disabled:hover {
  transform: none;
  box-shadow: none;
}

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          background-color: #f5ede3;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .logo {
          font-size: 28px;
          font-weight: 900;
          color: #ff4500;
          letter-spacing: 1px;
        }

        .nav {
          display: flex;
          gap: 45px;
        }

        .nav-link {
          text-decoration: none;
          color: #ff4500;
          font-size: 16px;
          font-weight: 700;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          transform: scale(1.1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #ff4500;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hero {
          padding: 80px 50px;
          background: linear-gradient(135deg, #f5ede3 0%, #fdf8f3 100%);
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-text {
          animation: fadeInLeft 0.8s ease;
        }

        .hero-title {
          font-size: 52px;
          font-weight: 800;
          color: #2c2c2c;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .highlight {
          color: #ff4500;
          display: block;
          font-size: 64px;
          margin-bottom: 10px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 50px;
        }

        .btn-primary, .btn-secondary {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Manrope', sans-serif;
        }

        .btn-primary {
          background-color: #ff4500;
          color: white;
          box-shadow: 0 10px 30px rgba(255, 69, 0, 0.3);
        }

        .btn-primary:hover {
          background-color: #e63e00;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255, 69, 0, 0.4);
        }

        .btn-secondary {
          background-color: transparent;
          color: #ff4500;
          border: 2px solid #ff4500;
        }

        .btn-secondary:hover {
          background-color: #ff4500;
          color: white;
          transform: translateY(-2px);
        }

        .hero-features {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feature-icon {
          font-size: 24px;
        }

        .feature-text {
          font-size: 14px;
          font-weight: 600;
          color: #2c2c2c;
        }

        .hero-image {
          animation: fadeInRight 0.8s ease;
        }

        .cookie-stack-svg {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
        }

        .cookie-stack {
          animation: float 3s ease-in-out infinite;
        }

        .crumb {
          animation: floatCrumb 4s ease-in-out infinite;
        }

        .about {
          padding: 100px 50px;
          background-color: #fff;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 42px;
          font-weight: 800;
          color: #2c2c2c;
          text-align: center;
          margin-bottom: 60px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .about-card {
          background: linear-gradient(135deg, #fff 0%, #fdf8f3 100%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #f5ede3;
        }

        .about-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .about-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .about-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 12px;
        }

        .about-card p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }

        .menu {
          padding: 100px 50px;
          background: linear-gradient(135deg, #f5ede3 0%, #fdf8f3 100%);
        }

        .menu-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-subtitle {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-bottom: 60px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-bottom: 50px;
        }

        .menu-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f5ede3;
        }

        .menu-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .menu-image {
          position: relative;
          background: linear-gradient(135deg, #fdf8f3 0%, #f5ede3 100%);
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .menu-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: #ff4500;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .menu-badge.new {
          background-color: #00b894;
        }

        .menu-badge.bestseller {
          background-color: #ff4500;
        }

        .cookie-svg {
          width: 150px;
          height: 150px;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
        }

        .menu-info {
          padding: 30px;
        }

        .menu-info h3 {
          font-size: 24px;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 12px;
        }

        .menu-info p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .menu-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .menu-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price {
          font-size: 28px;
          font-weight: 800;
          color: #ff4500;
        }

        .unit {
          font-size: 16px;
          color: #999;
        }

        .btn-add {
          background-color: #ff4500;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .btn-add:hover {
          background-color: #e63e00;
          transform: scale(1.05);
        }

        .btn-add.active {
          background-color: #00b894;
        }

        .preorder-section {
          padding: 100px 50px;
          background-color: #fff;
        }

        .preorder-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .preorder-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .preorder-left {
          background: linear-gradient(135deg, #fdf8f3 0%, #f5ede3 100%);
          padding: 40px;
          border-radius: 20px;
        }

        .preorder-title {
          font-size: 28px;
          font-weight: 800;
          color: #2c2c2c;
          margin-bottom: 30px;
        }

        .cart-items {
          margin-bottom: 30px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: white;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-name {
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 5px;
        }

        .cart-item-price {
          color: #ff4500;
          font-weight: 700;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 15px;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .qty-btn:hover {
          background: #ff4500;
          color: white;
        }

        .qty-value {
          width: 35px;
          text-align: center;
          font-weight: 700;
        }

        .remove-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #e63946;
        }

        .cart-summary {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 16px;
        }

        .summary-row.total {
          border-top: 2px solid #f5ede3;
          padding-top: 12px;
          font-size: 20px;
          font-weight: 800;
          color: #ff4500;
        }

        .preorder-right {
          padding: 40px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          font-family: 'Manrope', sans-serif;
          transition: all 0.3s ease;
          background-color: white;
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #ff4500;
          box-shadow: 0 0 0 3px rgba(255, 69, 0, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .btn-submit {
          width: 100%;
          padding: 16px 32px;
          background-color: #ff4500;
          color: white;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit:hover {
          background-color: #e63e00;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 69, 0, 0.3);
        }

        .contact {
          padding: 100px 50px;
          background-color: #f5ede3;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .section-title-left {
          font-size: 42px;
          font-weight: 800;
          color: #2c2c2c;
          text-align: left;
          margin-bottom: 20px;
        }

        .contact-description {
          font-size: 18px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 40px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .contact-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .contact-item h4 {
          font-size: 18px;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 5px;
        }

        .contact-item p {
          font-size: 16px;
          color: #666;
        }

        .social-links h4 {
          font-size: 18px;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 15px;
        }

        .social-icons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .social-icon {
          text-decoration: none;
          color: white;
          background-color: #ff4500;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background-color: #e63e00;
          transform: translateY(-2px);
        }

        .contact-form-container {
          background: linear-gradient(135deg, #fff 0%, #fdf8f3 100%);
          border-radius: 20px;
          padding: 40px;
          border: 1px solid #f5ede3;
        }

        .contact-form h3 {
          font-size: 24px;
          font-weight: 700;
          color: #2c2c2c;
          margin-bottom: 25px;
        }

        .footer {
          padding: 60px 50px 40px;
          background-color: #2c2c2c;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
        }

        .footer-section h4 {
          color: #ff4500;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .footer-section p {
          color: #999;
          font-size: 14px;
          line-height: 1.8;
          margin-bottom: 8px;
        }

        .footer-section a {
          color: #999;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.3s ease;
          display: inline-block;
          margin-bottom: 8px;
        }

        .footer-section a:hover {
          color: #ff4500;
          transform: translateX(5px);
        }

        .footer-bottom {
          border-top: 1px solid #444;
          padding-top: 30px;
          text-align: center;
        }

        .footer-bottom p {
          color: #999;
          font-size: 14px;
        }

        .footer-brand {
          font-size: 24px;
          font-weight: 900;
          color: #ff4500;
          margin-bottom: 10px;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes floatCrumb {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate(10px, -15px);
            opacity: 1;
          }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-title {
            font-size: 42px;
          }

          .highlight {
            font-size: 52px;
          }

          .about-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .preorder-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 20px;
            padding: 20px 30px;
          }

          .nav {
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .logo {
            font-size: 24px;
          }

          .nav-link {
            font-size: 14px;
          }

          .hero {
            padding: 60px 30px;
          }

          .hero-title {
            font-size: 36px;
          }

          .highlight {
            font-size: 44px;
          }

          .hero-subtitle {
            font-size: 14px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }

          .about {
            padding: 60px 30px;
          }

          .section-title {
            font-size: 32px;
          }

          .menu {
            padding: 60px 30px;
          }

          .contact {
            padding: 60px 30px;
          }

          .footer {
            padding: 40px 30px 30px;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">@mansookie</div>
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
          <a onClick={() => scrollToElement("contact")} className="nav-link">
            Contact
          </a>
        </nav>
      </header>

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
            <svg viewBox="0 0 400 400" className="cookie-stack-svg">
              <circle cx="350" cy="80" r="30" fill="#ff4500" opacity="0.1" />
              <circle cx="50" cy="300" r="40" fill="#ff6b35" opacity="0.1" />
              <circle cx="320" cy="350" r="25" fill="#ff4500" opacity="0.15" />

              <g className="cookie-stack">
                <ellipse
                  cx="200"
                  cy="100"
                  rx="80"
                  ry="15"
                  fill="#8B6F47"
                  opacity="0.3"
                />
                <ellipse cx="200" cy="95" rx="85" ry="18" fill="#D4A574" />
                <circle cx="180" cy="95" r="8" fill="#5C4033" />
                <circle cx="210" cy="92" r="7" fill="#5C4033" />
                <circle cx="200" cy="100" r="6" fill="#5C4033" />
                <circle cx="225" cy="95" r="7" fill="#5C4033" />

                <ellipse
                  cx="200"
                  cy="145"
                  rx="82"
                  ry="16"
                  fill="#8B6F47"
                  opacity="0.3"
                />
                <ellipse cx="200" cy="140" rx="90" ry="20" fill="#E0B589" />
                <circle cx="170" cy="140" r="9" fill="#5C4033" />
                <circle cx="200" cy="138" r="8" fill="#5C4033" />
                <circle cx="230" cy="142" r="8" fill="#5C4033" />
                <circle cx="215" cy="145" r="7" fill="#5C4033" />
                <circle cx="185" cy="145" r="7" fill="#5C4033" />

                <ellipse
                  cx="200"
                  cy="195"
                  rx="85"
                  ry="17"
                  fill="#8B6F47"
                  opacity="0.3"
                />
                <ellipse cx="200" cy="190" rx="95" ry="22" fill="#D4A574" />
                <circle cx="175" cy="190" r="10" fill="#5C4033" />
                <circle cx="205" cy="188" r="9" fill="#5C4033" />
                <circle cx="235" cy="192" r="9" fill="#5C4033" />
                <circle cx="190" cy="195" r="8" fill="#5C4033" />
                <circle cx="220" cy="193" r="8" fill="#5C4033" />

                <ellipse
                  cx="200"
                  cy="250"
                  rx="88"
                  ry="18"
                  fill="#8B6F47"
                  opacity="0.3"
                />
                <ellipse cx="200" cy="245" rx="98" ry="24" fill="#E0B589" />
                <circle cx="165" cy="245" r="10" fill="#5C4033" />
                <circle cx="195" cy="243" r="9" fill="#5C4033" />
                <circle cx="225" cy="247" r="10" fill="#5C4033" />
                <circle cx="180" cy="250" r="8" fill="#5C4033" />
                <circle cx="210" cy="248" r="9" fill="#5C4033" />
                <circle cx="240" cy="245" r="8" fill="#5C4033" />

                <ellipse
                  cx="200"
                  cy="310"
                  rx="90"
                  ry="20"
                  fill="#8B6F47"
                  opacity="0.3"
                />
                <ellipse cx="200" cy="305" rx="100" ry="25" fill="#D4A574" />
                <circle cx="160" cy="305" r="11" fill="#5C4033" />
                <circle cx="190" cy="303" r="10" fill="#5C4033" />
                <circle cx="220" cy="307" r="11" fill="#5C4033" />
                <circle cx="175" cy="310" r="9" fill="#5C4033" />
                <circle cx="205" cy="308" r="10" fill="#5C4033" />
                <circle cx="235" cy="305" r="9" fill="#5C4033" />
                <circle cx="250" cy="308" r="8" fill="#5C4033" />
              </g>

              <circle
                cx="120"
                cy="150"
                r="4"
                fill="#D4A574"
                opacity="0.6"
                className="crumb crumb-1"
              />
              <circle
                cx="290"
                cy="200"
                r="5"
                fill="#E0B589"
                opacity="0.6"
                className="crumb crumb-2"
              />
              <circle
                cx="100"
                cy="250"
                r="3"
                fill="#D4A574"
                opacity="0.6"
                className="crumb crumb-3"
              />
              <circle
                cx="310"
                cy="280"
                r="4"
                fill="#E0B589"
                opacity="0.6"
                className="crumb crumb-4"
              />
            </svg>
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
                  <svg viewBox="0 0 200 200" className="cookie-svg">
                    <circle cx="100" cy="100" r="75" fill="#D4A574" />
                    <circle cx="100" cy="100" r="70" fill="#E0B589" />
                    <circle cx="80" cy="85" r="12" fill="#5C4033" />
                    <circle cx="120" cy="80" r="11" fill="#5C4033" />
                    <circle cx="100" cy="105" r="10" fill="#5C4033" />
                    <circle cx="75" cy="115" r="9" fill="#5C4033" />
                    <circle cx="130" cy="110" r="10" fill="#5C4033" />
                  </svg>
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
                      <span className="unit">/box</span>
                    </div>
                    <button
                      className={`btn-add ${selectedItems.find((i) => i.id === item.id) ? "active" : ""}`}
                      onClick={() => toggleMenuItem(item)}
                    >
                      {selectedItems.find((i) => i.id === item.id)
                        ? "✓ Dipilih"
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
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">
                            Rp{item.price.toLocaleString("id-ID")}
                          </div>
                        </div>

                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
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
                    <p>+62 857-2277-8899</p>
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
                    <p>Jakarta, Indonesia</p>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="contact-icon">⏰</span>
                  <div>
                    <h4>Jam Operasional</h4>
                    <p>Senin - Jumat: 09:00 - 18:00</p>
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
                  <a
                    href="https://tiktok.com"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎵 TikTok
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
            <a onClick={() => scrollToElement("home")}>Home</a>
            <a onClick={() => scrollToElement("about")}>Tentang Kami</a>
            <a onClick={() => scrollToElement("menu")}>Menu</a>
            <a onClick={() => scrollToElement("contact")}>Hubungi Kami</a>
          </div>

          <div className="footer-section">
            <h4>Kontak</h4>
            <p>📱 +62 857-2277-8899</p>
            <p>📧 hello@mansookie.com</p>
            <p>📍 Jakarta, Indonesia</p>
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
