import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import "../../../styles/login.css";
import FormInput from "../../../components/layout-client/FormInput"; // Import FormInput
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";
import axiosInstance from "../../../libs/axiosInterceptor";
import { saveToLocalStorage } from "../../../utils/localStorage";
import { keyLocalStorage } from "../../../constants/keyConstant";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Gọi API đăng nhập
    const response = await axiosInstance.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    // console.log("Response data:", response.data);

    // Kiểm tra trạng thái thành công (thường là 200 hoặc 201)
    if (response.status === 200 || response.status === 201) {
      const { accessToken, user } = response.data; // Giả định API trả về accessToken và user

      // Lưu token và user info vào localStorage
      saveToLocalStorage(keyLocalStorage.accessToken, accessToken);
      saveToLocalStorage("user", user);

      showSuccessToast(response.data.message);

      // Redirect dựa trên roleCode
      if (user.roleCode === "COMPANY") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    }

    // Nếu response không phải 200/201, ném lỗi
    throw new Error("Unexpected response status");
  } catch (error) {
    showErrorToast(error?.response?.data?.message);
    return error;
  }
};
const Login = () => {
  return (
    <>
      <div className="wrapper-login">
        <div className="login-container">
          <div className="login-box">
            <h2>Đăng nhập</h2>
            <p>Đăng nhập vào tài khoản của bạn</p>
            <Form method="POST">
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                icon="fa fa-envelope"
                required={true}
              />
              <FormInput
                type="password"
                name="password"
                id="password"
                placeholder="Mật khẩu"
                icon="fa fa-lock"
                required={true}
              />
              <div className="options">
                {/* <label>
                  <input type="checkbox" /> Remember me
                </label> */}
                <Link to="/auth/forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
              <button type="submit" className="login-btn">
                Đăng nhập
              </button>
            </Form>
            {/* <div className="social-login">
              <p>Or login with</p>
              <div className="social-icons">
                <button className="google-btn">
                  <i className="fab fa-google" /> Google
                </button>
                <button className="facebook-btn">
                  <i className="fab fa-facebook-f" /> Facebook
                </button>
              </div>
            </div> */}
            <p className="login-text">
              Bạn chưa có tài khoản?{" "}
              <Link to="/auth/register">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
