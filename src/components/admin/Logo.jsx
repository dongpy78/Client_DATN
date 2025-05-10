// import logo from "/public/assestsAdmin/images/logo.svg";
import { Link } from "react-router-dom";
import logo from "/logo-main.svg";

const Logo = () => {
  return (
    <Link to="/">
      <img
        style={{ width: "164px", height: "50px" }}
        src={logo}
        alt="jobtify"
        className="logo"
      />
    </Link>
  );
};

export default Logo;
