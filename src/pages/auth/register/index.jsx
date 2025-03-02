import React from "react";
import "../../../styles/register.css";
import { Link } from "react-router-dom";
import FormInput from "../../../components/layout-client/FormInput";
import FormSelect from "../../../components/layout-client/FormSelect"; // Import FormSelect

const Register = () => {
  return (
    <>
      <div className="wrapper-register">
        <div className="register-container">
          <div className="register-box">
            <h2>Create an Account</h2>
            <form action="#" method="POST">
              {/* Họ */}
              <FormInput
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your last name"
                icon="fas fa-user"
                required={true}
              />
              {/* Tên */}
              <FormInput
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                icon="fas fa-user"
                required={true}
              />
              {/* Số điện thoại */}
              <FormInput
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                icon="fas fa-phone"
                required={true}
              />
              {/* Email */}
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                icon="fas fa-envelope"
                required={true}
              />
              {/* Mật khẩu */}
              <FormInput
                type="password"
                name="password"
                id="password"
                placeholder="Create a password"
                icon="fas fa-lock"
                required={true}
              />
              {/* Nhập lại mật khẩu */}
              <FormInput
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm your password"
                icon="fas fa-lock"
                required={true}
              />
              {/* Ứng viên hay Nhà tuyển dụng */}
              <FormSelect
                label=""
                name="role"
                list={["Ứng viên", "Nhà tuyển dụng"]}
                defaultValue="Ứng viên"
                size="select-md" // Có thể tùy chỉnh size nếu cần
              />
              {/* Nam hay Nữ */}
              <FormSelect
                label=""
                name="gender"
                list={["Nam", "Nữ"]}
                defaultValue="Nam"
                size="select-md" // Có thể tùy chỉnh size nếu cần
              />
              <button type="submit" className="register-btn">
                Sign Up
              </button>
            </form>
            <p className="alternate-option">
              Already have an account? <Link to="/auth/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
