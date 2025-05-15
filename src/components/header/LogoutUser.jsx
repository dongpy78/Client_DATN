import React, { useContext, useEffect, useState } from "react";
import {
  FaUserCircle,
  FaInfoCircle,
  FaCog,
  FaSignOutAlt,
  FaFileUpload,
  FaHome,
} from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./LogoutUser.css";
import {
  getFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorage";
import { GlobalContext } from "../../contexts/GlobalProviders";

const LogoutUser = () => {
  const { candidate, setCandidate, logoutUser } = useContext(GlobalContext);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = getFromLocalStorage("user");
    if (userStorage) {
      setUserRole(userStorage.roleCode);

      if (!candidate) {
        setCandidate({
          ...userStorage,
          name: `${userStorage.firstName} ${userStorage.lastName}`.trim(),
          avatar: userStorage.image,
        });
      }
    }
  }, [setCandidate, candidate]);

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

  const handleAdminDashboard = () => {
    setIsPanelOpen(false);
    navigate("/admin");
  };

  return (
    <div className="logout-container-new">
      <div className="user-info" onClick={() => setIsPanelOpen(!isPanelOpen)}>
        {candidate?.avatar ? (
          <img src={candidate.avatar} alt="avatar" className="user-avatar" />
        ) : (
          <FaUserCircle className="user-icon" />
        )}
        <span className="user-name">{candidate?.name || "Người dùng"}</span>
        <span className="icon-dropdown-header">
          <RiArrowDropDownLine />
        </span>
      </div>
      <div className={`logout-panel ${isPanelOpen ? "open" : ""}`}>
        <div className="panel-content">
          {/* Menu chỉ dành cho CANDIDATE */}
          {userRole === "CANDIDATE" && (
            <>
              <div className="panel-item" onClick={handleProfile}>
                <FaInfoCircle className="panel-icon" />
                <span className="testr">Xem thông tin</span>
              </div>
              <div className="panel-item" onClick={handleSettings}>
                <FaCog className="panel-icon" />
                <span>Cài đặt</span>
              </div>
              <div className="panel-item" onClick={handleJobUpload}>
                <FaFileUpload className="panel-icon" />
                <span>Công việc đã nộp</span>
              </div>
            </>
          )}

          {/* Menu chỉ dành cho COMPANY */}
          {userRole === "COMPANY" && (
            <>
              <div className="panel-item" onClick={handleAdminDashboard}>
                <FaHome className="panel-icon" />
                <span>Quay lại trang admin</span>
              </div>
            </>
          )}

          {/* Menu chung cho cả 2 role */}
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
