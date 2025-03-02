import React from "react";
import logo from "../../../public/assets/img/logo/logo.png";
import links from "../../utils/links";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        {/* Header Start */}
        <div className="header-area header-transparrent">
          <div className="headder-top header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-2">
                  {/* Logo */}
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9">
                  <div className="menu-wrapper">
                    {/* Main-menu */}
                    <div className="main-menu">
                      <nav className="d-none d-lg-block">
                        <ul id="navigation">
                          {links.map((link, index) => (
                            <li key={index}>
                              <Link to={link.path}>{link.text}</Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                    {/* Header-btn */}
                    <div className="header-btn d-none f-right d-lg-block">
                      <Link to="/auth/register" className="btn-user head-btn1">
                        Đăng ký
                      </Link>
                      <Link to="/auth/login" className="btn-user head-btn2">
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Mobile Menu */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none">
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Header End */}
      </header>
    </>
  );
};

export default Header;
