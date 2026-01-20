import React from "react";
import { scrollToElement } from "../utils/scrol_util";
import logoImage from "../assets/icons/logo.jpeg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="Mansookie Logo" className="logo-image" />
        <span className="logo-text">Mansookie</span>
      </div>
      
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
  );
};

export default Header;