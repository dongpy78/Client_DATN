import React, { useContext, useEffect, useState } from "react";
import {
  FaUserCircle,
  FaInfoCircle,
  FaCog,
  FaSignOutAlt,
  FaFileUpload,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./LogoutUser.css";
import {
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { GlobalContext } from "../../contexts/GlobalProviders";

const LogoutUser = () => {
  const { user, setUser } = useContext(GlobalContext); // Lấy user và setUser từ GlobalContext
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleProfile = () => {
    setIsPanelOpen(false);
    navigate("/candidate/info");
  };

  const handleSettings = () => {
    setIsPanelOpen(false);
    navigate("/candidate/usersetting");
  };

  const handleJobUpload = () => {
    setIsPanelOpen(false);
    navigate("/candidate/cv-post");
  };

  return (
    <div className="logout-container-new">
      <div className="user-info" onClick={() => setIsPanelOpen(!isPanelOpen)}>
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="user-avatar" />
        ) : (
          <FaUserCircle className="user-icon" />
        )}
        <span className="user-name">{user?.name || "Người dùng"}</span>
        <span className="icon-dropdown-header">
          <RiArrowDropDownLine />
        </span>
      </div>
      <div className={`logout-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="panel-content">
          <div className="panel-item" onClick={handleProfile}>
            <FaInfoCircle className="panel-icon" />
            <span>Xem thông tin</span>
          </div>
          <div className="panel-item" onClick={handleSettings}>
            <FaCog className="panel-icon" />
            <span>Cài đặt</span>
          </div>
          <div className="panel-item" onClick={handleJobUpload}>
            <FaFileUpload className="panel-icon" />
            <span>Công việc đã nộp</span>
          </div>
          <div className="panel-item" onClick={logoutUser}>
            <FaSignOutAlt className="panel-icon" />
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutUser;
