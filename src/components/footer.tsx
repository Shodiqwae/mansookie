import React from "react";
import { scrollToElement } from "../utils/scrol_util";
import { COMPANY_INFO } from "../data/constans";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">@{COMPANY_INFO.name.toLowerCase()}</div>
          <p>
            Cookies terenak dengan bahan premium dan cinta untuk menemani
            momen spesial kamu.
          </p>
        </div>

        {/* <div className="footer-section">
          <h4>Navigasi</h4>
          <a onClick={() => scrollToElement("home")}>Home</a>
          <a onClick={() => scrollToElement("about")}>Tentang Kami</a>
          <a onClick={() => scrollToElement("menu")}>Menu</a>
          <a onClick={() => scrollToElement("contact")}>Hubungi Kami</a>
        </div> */}

        <div className="footer-section">
          <h4>Kontak</h4>
          <p>📱 {COMPANY_INFO.phone}</p>
          <p>📍 {COMPANY_INFO.location}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 {COMPANY_INFO.name}. Semua hak dilindungi. Made with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;