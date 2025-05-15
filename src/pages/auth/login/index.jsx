import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import "../../../styles/login.css";
import "../../../styles/register2.css";

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

      showSuccessToast("Đăng nhập thành công");

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
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1,
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="wrapper-login">
              <div className="login-container">
                <div className="login-box">
                  <h2 style={{ color: "#5469d4" }}>Đăng nhập</h2>
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
                      <Link
                        to="/auth/forgot-password"
                        className="forgot-password"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <button type="submit" className="login-btn">
                      Đăng nhập
                    </button>
                  </Form>

                  <p className="login-text">
                    Bạn chưa có tài khoản?{" "}
                    <Link to="/auth/register">Đăng ký ngay</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
