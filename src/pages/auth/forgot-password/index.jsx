import React from "react";
import "../../../styles/forget-password.css";
import { Form, Link, redirect } from "react-router-dom";
import FormInput from "../../../components/layout-client/FormInput"; // Import FormInput
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";
import axiosInstance from "../../../libs/axiosInterceptor";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email: data.email,
    });

    if (response.status === 200 || response.status === 201) {
      showSuccessToast(response.data.message);
      return redirect("/auth/login");
    }
  } catch (error) {
    showErrorToast(error?.response?.data?.message || "Send email failed");
    return error;
  }
};

const ForgotPassword = () => {
  return (
    <>
      <div className="wrapper-forget">
        <div className="auth-container">
          <div className="auth-box">
            <h2>Lấy lại mật khẩu</h2>
            <p>Nhập vào email để nhận password mới</p>
            <Form method="POST">
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                icon="fas fa-envelope"
                required={true}
              />
              <button type="submit" className="auth-btn">
                <i className="fas fa-paper-plane" /> Gửi
              </button>
              <div className="forget-text">
                <p>
                  <i className="fas fa-arrow-left"></i> Trở lại trang{" "}
                  <Link to="/auth/login">Đăng nhập</Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
