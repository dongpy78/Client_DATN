import React, { useState } from "react";
import links from "../../utils/links";
// import logo from "../../../public/assets/img/logo/logo.png";
import logo1 from "/logo-main.svg";

import { FaBars, FaTimes } from "react-icons/fa"; // Import icon menu
import { Link } from "react-router-dom"; // Nếu dùng React Router
import "../../styles/mobile-menu.css";

const MobileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mobile-menu-container">
      {/* Button mở menu */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FaTimes style={{ color: "#5d87ff", fontSize: "28px" }} />
        ) : (
          <FaBars style={{ color: "#5d87ff", fontSize: "28px" }} />
        )}
      </button>

      {/* Menu chính */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              style={{ height: "53px", width: "170px" }}
              src={logo1}
              alt=""
            />
          </Link>
        </div>
        <ul style={{ marginTop: "24px" }}>
          {links.map((link, index) => (
            <li key={index}>
              <Link onClick={() => setMenuOpen(false)} to={link.path}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="header-btn f-right d-lg-block">
          <Link
            style={{ marginTop: "16px", width: "184px" }}
            to="/auth/register"
            className="btn-user head-btn1"
          >
            Đăng ký
          </Link>
          <Link
            style={{ marginTop: "12px", width: "184px" }}
            to="/auth/login"
            className="btn-user head-btn2"
          >
            Đăng nhập
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
