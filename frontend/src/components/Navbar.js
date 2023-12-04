import React from 'react';
import '../css/Navbar.css'; // Import your CSS file for styling

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <h1>Anime-Chart</h1>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}
