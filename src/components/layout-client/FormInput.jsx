import React, { useEffect, useState } from "react";

const FormInput = ({
  type,
  name,
  id,
  placeholder,
  icon,
  required = false,
  className = "form-group",
  pattern,
  errorMessage,
  onValidationChange,
  submitted = false, // Thêm prop submitted từ parent
  maxLength,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    if (type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue);
  };

  const handleBlur = () => {
    setIsTouched(true);
    validate(value);
  };

  const validate = (val) => {
    let valid = true;

    if (required && !val) {
      valid = false;
    } else if (pattern && val) {
      const regex = new RegExp(pattern);
      valid = regex.test(val);
    }

    setIsValid(valid);
    if (onValidationChange) {
      onValidationChange(name || id, valid);
    }
    return valid;
  };

  useEffect(() => {
    // Khi form submitted, validate tất cả các trường required
    if (submitted) {
      validate(value);
    }
  }, [submitted]);

  return (
    <div className={`${className} form-input-wrapper`}>
      <div className="input-container">
        <input
          type={inputType}
          name={name || id}
          id={id}
          placeholder={placeholder}
          required={required}
          className={`input input-bordered ${
            !isValid && (isTouched || submitted) ? "input-error" : ""
          }`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          pattern={pattern}
          maxLength={maxLength}
          autoComplete="off"
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
      {!isValid && (isTouched || submitted) && (
        <p
          style={{
            marginBottom: "0",
            position: "relative",
            top: "8px",
          }}
          className="error-message"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
