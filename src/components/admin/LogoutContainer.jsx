import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalProviders";
import Wrapper from "../../../public/assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { showSuccessToast } from "../../utils/toastNotifications";

const LogoutContainer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext); // Lấy user và setUser từ GlobalContext
  // const { user, logoutUser } = useContext(GlobalContext);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // Lấy thông tin từ localStorage khi component mount lần đầu
    const userStorage = getFromLocalStorage("user");
    if (userStorage && !user) {
      setUser({
        ...userStorage,
        name: `${userStorage.firstName} ${userStorage.lastName}`.trim(),
        avatar: userStorage.image,
      });
    }
  }, [setUser, user]);

  const logoutUser = () => {
    deleteFromLocalStorage("user");
    deleteFromLocalStorage("accessToken");
    setUser(null); // Xóa user khỏi GlobalContext
    showSuccessToast("Logout Success");
    window.location.href = "/";
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
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
        {user?.name}
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
