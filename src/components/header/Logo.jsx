import React from "react";
import logo1 from "/logo-main.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <div className="logo">
        <Link to="/">
          <img style={{ width: "200px", height: "80px" }} src={logo1} alt="" />
        </Link>
      </div>
    </>
  );
};

export default Logo;
