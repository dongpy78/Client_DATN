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
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  // Đồng bộ user từ localStorage khi mount
  useEffect(() => {
    const token = getFromLocalStorage(keyLocalStorage.accessToken);
    const storedUser = getFromLocalStorage("user");
    if (token && storedUser) {
      setUser({
        name: `${storedUser.firstName} ${storedUser.lastName}`.trim(),
        avatar: storedUser.image || null,
      });
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
      deleteFromLocalStorage("user");
      setUser(""); // Reset user về null
      showSuccessToast("Logout success!");
      navigate("/");
    } catch (error) {
      showErrorToast(error?.response?.data?.msg || "Logout failed");
    }
  };

  const data = {
    user,
    setUser,
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
