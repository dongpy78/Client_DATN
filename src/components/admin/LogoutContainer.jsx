import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalProviders";
import Wrapper from "../../../public/assets/wrappers/LogoutContainer";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

const LogoutContainer = () => {
  const { user, logoutUser } = useContext(GlobalContext);

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
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
