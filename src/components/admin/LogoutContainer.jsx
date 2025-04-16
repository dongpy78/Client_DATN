import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalProviders";
import Wrapper from "/public/assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { showSuccessToast } from "../../utils/toastNotifications";

const LogoutContainer = () => {
  const { company, setCompany, logoutUser } = useContext(GlobalContext);
  // const { user, logoutUser } = useContext(GlobalContext);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // Lấy thông tin từ localStorage khi component mount lần đầu
    const userStorage = getFromLocalStorage("user"); // Lấy từ "user" thay vì "company"
    if (userStorage && !company) {
      setCompany({
        ...userStorage,
        name: `${userStorage.firstName} ${userStorage.lastName}`.trim(),
        avatar: userStorage.image,
      });
    }
  }, [setCompany, company]); // Sử dụng setCompany và company

  // const logoutUser = () => {
  //   deleteFromLocalStorage("user");
  //   deleteFromLocalStorage("accessToken");
  //   setUser(null); // Xóa user khỏi GlobalContext
  //   showSuccessToast("Logout Success");
  //   window.location.href = "/";
  // };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {company?.avatar ? (
          <img
            src={company.avatar}
            alt="Avatar"
            className="avatar"
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
        ) : (
          <FaUserCircle />
        )}
        {company?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
