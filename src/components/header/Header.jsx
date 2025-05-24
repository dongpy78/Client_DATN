import React, { useState, useEffect } from "react";
import logo from "/logo-main.svg";
import logo1 from "/logo-main.svg";
import links from "../../utils/links";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorage";
import { keyLocalStorage } from "../../constants/keyConstant";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import LogoutUser from "./LogoutUser";
import "./header1.css";

const Header = () => {
  useEffect(() => {
    const header = document.querySelector(".header-sticky");
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 245) {
        header.classList.add("sticky-bar", "sticky");
      } else {
        header.classList.remove("sticky-bar", "sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateLoginStatus = () => {
      const token = getFromLocalStorage(keyLocalStorage.accessToken);
      const storedUser = getFromLocalStorage("user");
      // console.log("Header - Token:", token);
      // console.log("Header - User:", storedUser);

      if (token && storedUser) {
        setIsLoggedIn(true);
        setUser({
          name: `${storedUser.firstName} ${storedUser.lastName}`.trim(),
          avatar: storedUser.image || null,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    updateLoginStatus();
  }, []);

  const logoutUser = async () => {
    try {
      await customFetch.post("/auth/logout");
      deleteFromLocalStorage(keyLocalStorage.accessToken);
      deleteFromLocalStorage("user");
      showSuccessToast("Logout success!");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Logout failed");
    }
  };

  return (
    <>
      <header>
        <div className="header-area header-transparrent">
          <div className="header-navbar-top headder-top header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-2">
                  <div className="logo">
                    <Link to="/">
                      <img
                        style={{ width: "170px", height: "53px" }}
                        src={logo1}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9">
                  <div className="menu-wrapper">
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
                    <div className="header-btn d-none f-right d-lg-block">
                      {isLoggedIn ? (
                        <LogoutUser user={user} logoutUser={logoutUser} />
                      ) : (
                        <>
                          <Link
                            to="/auth/register"
                            className="btn-user head-btn1"
                          >
                            Đăng ký
                          </Link>
                          <Link to="/auth/login" className="btn-user head-btn2">
                            Đăng nhập
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none">
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
