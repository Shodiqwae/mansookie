import React from "react";
import cookieImage from "../assets/image/triple_cukis.png";
import { scrollToElement } from "../utils/scrol_util";

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="highlight">Selamat Datang Di Mansookie</span>
            Cookies yang Bikin Hari Lebih Manis
          </h1>
          <p className="hero-subtitle">
            Cookies rumahan yang selalu bikin nagih, dibuat dari bahan
            terjangkau tapi berkualitas
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
  );
};

export default Hero;