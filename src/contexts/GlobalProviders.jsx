import React, { useState, useEffect } from "react";
import customFetch from "../utils/customFetch";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorage";
import { keyLocalStorage } from "../constants/keyConstant";
import { showSuccessToast, showErrorToast } from "../utils/toastNotifications";
import { useNavigate } from "react-router-dom";

export const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Khởi tạo user là null
  const [candidate, setCandidate] = useState(null); // Thông tin ứng viên
  const [company, setCompany] = useState(null); // Thông tin công ty
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getFromLocalStorage(keyLocalStorage.accessToken);
    const storedUser = getFromLocalStorage("user"); // Lấy thông tin từ "user"

    if (token && storedUser) {
      if (storedUser.roleCode === "CANDIDATE") {
        setCandidate({
          name: `${storedUser.firstName} ${storedUser.lastName}`.trim(),
          avatar: storedUser.image || null,
        });
      } else if (storedUser.roleCode === "COMPANY") {
        setCompany({
          name: `${storedUser.firstName} ${storedUser.lastName}`.trim(),
          avatar: storedUser.image || null,
        });
      }
    }
  }, []);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      await customFetch.post("/auth/logout");
      deleteFromLocalStorage(keyLocalStorage.accessToken);
      deleteFromLocalStorage("candidate"); // Xóa thông tin ứng viên
      deleteFromLocalStorage("company"); // Xóa thông tin công ty
      setCandidate(null); // Reset candidate
      setCompany(null); // Reset company
      showSuccessToast("Logout success!");
      window.location.href = "/";
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Logout failed");
    }
  };

  const data = {
    user,
    setUser,
    candidate, // Thêm candidate
    setCandidate, // Thêm setCandidate
    company, // Thêm company
    setCompany, // Thêm setCompany
    showSidebar,
    setShowSidebar,
    isDarkTheme,
    setIsDarkTheme,
    toggleDarkTheme,
    toggleSidebar,
    logoutUser,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
