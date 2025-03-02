import React from "react";

const FormInput = ({ type, name, id, placeholder, icon, required = false }) => {
  return (
    <div className="form-group">
      {icon && <i className={`${icon} icon`} />}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        className="input input-bordered" // Giữ class cơ bản, bạn có thể thêm class từ Register nếu cần
      />
    </div>
  );
};

export default FormInput;
