import React from "react";
import { Outlet } from "react-router-dom";
// import Navigation from "../components/Navigation";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const LayoutPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default LayoutPage;
