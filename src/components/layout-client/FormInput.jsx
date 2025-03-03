import React, { useState } from "react";

const FormInput = ({
  type,
  name,
  id,
  placeholder,
  icon,
  required = false,
  className = "form-group",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Xác định type hiển thị (text hoặc password)
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  // Toggle visibility khi click vào icon khóa
  const togglePasswordVisibility = () => {
    if (type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <div className={className}>
      <input
        type={inputType}
        name={name || id}
        id={id}
        placeholder={placeholder}
        required={required}
        className="input input-bordered"
      />
      {icon && (
        <i
          className={`${icon} icon ${
            type === "password" ? "toggle-password" : ""
          }`}
          onClick={type === "password" ? togglePasswordVisibility : null}
        />
      )}
    </div>
  );
};

export default FormInput;
