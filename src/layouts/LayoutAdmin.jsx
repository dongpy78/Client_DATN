import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../public/assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components/admin";
import { GlobalContext } from "../contexts/GlobalProviders";
import "../index.css";

const LayoutAdmin = ({ isDarkThemeEnabled }) => {
  const { isDarkTheme } = useContext(GlobalContext);
  return (
    <Wrapper>
      <main className={`dashboard ${isDarkTheme ? "dark-theme" : ""}`}>
        <SmallSidebar />
        <BigSidebar />
        <div className="wrapper-test">
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default LayoutAdmin;
