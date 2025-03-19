import React, { useState } from "react";
import {
  FaUserCircle,
  FaInfoCircle,
  FaCog,
  FaSignOutAlt,
  FaFileUpload,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "./LogoutUser.css"; // Đường dẫn CSS mới

const LogoutUser = ({ user, logoutUser }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    setIsPanelOpen(false);
    navigate("/candidate/info"); // Điều hướng đến trang thông tin
  };

  const handleSettings = () => {
    setIsPanelOpen(false);
    navigate("/candidate/usersetting"); // Điều hướng đến trang cài đặt
  };

  const handleJobUpload = () => {
    setIsPanelOpen(false);
    navigate("/candidate/cv-post"); // Điều hướng đến trang cài đặt
  };

  return (
    <div className="logout-container-new">
      <div className="user-info" onClick={() => setIsPanelOpen(!isPanelOpen)}>
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="user-avatar" />
        ) : (
          <FaUserCircle className="user-icon" />
        )}
        <span className="user-name">{user?.name || "User"}</span>
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
