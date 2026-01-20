import React from "react";
import { scrollToElement } from "../utils/scrol_util";

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;