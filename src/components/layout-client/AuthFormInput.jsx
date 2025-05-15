import React from "react";

const AuthFormInput = ({ type, name, placeholder, icon, required }) => {
  return (
    <div className="input-field">
      <i className={icon}></i>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default AuthFormInput;
