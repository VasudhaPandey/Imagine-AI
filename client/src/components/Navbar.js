
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}
      <a href="/" className="logo-link">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <span>Imagine AI</span>
        </div>
      </a>

      {/* Navigation links */}
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="#product">Product</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
      </div>

      {/* Launch Button */}
      <button className="launch-btn">
        <span>→</span>
        Launch App
      </button>

    </nav>
  );
}

export default Navbar;
