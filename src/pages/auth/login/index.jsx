import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import "../../../styles/login.css";
import "../../../styles/login2.css";

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
    const response = await axiosInstance.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    if (response.status === 200 || response.status === 201) {
      const { accessToken, user } = response.data;
      saveToLocalStorage(keyLocalStorage.accessToken, accessToken);
      saveToLocalStorage("user", user);

      if (user.roleCode === "COMPANY") {
        return redirect("/admin");
      }
      return redirect("/");
    }

    // Chỉ trả về lỗi khi status là 403
    if (response.status === 403) {
      return {
        error: "Tài khoản của bạn đã bị khóa, không thể đăng nhập vào hệ thống",
        status: 403,
      };
    }

    // Các trường hợp lỗi khác không trả về gì
    return null;
  } catch (error) {
    // Chỉ xử lý lỗi 403
    if (error?.response?.status === 403) {
      return {
        error: "Tài khoản của bạn đã bị khóa, không thể đăng nhập vào hệ thống",
        status: 403,
      };
    }
    return null;
  }
};
const Login = () => {
  const actionData = useActionData(); // Lấy dữ liệu từ action

  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData.error);
    }
  }, [actionData]);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  const handleValidationChange = (fieldName, isValid) => {
    setValidations((prev) => ({
      ...prev,
      [fieldName]: isValid,
    }));
  };

  const isFormValid = Object.values(validations).every((valid) => valid);

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
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      errorMessage="Vui lòng nhập đúng định dạng email"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                    />
                    <FormInput
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Mật khẩu"
                      icon="fa fa-lock"
                      required={true}
                      pattern="^.{6,}$"
                      errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                    />
                    <div className="options">
                      <Link
                        to="/auth/forgot-password"
                        className="forgot-password"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="login-btn"
                      onClick={() => setSubmitted(true)}
                      // disabled={isSubmitting || !isFormValid}
                      formNoValidate
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Đang đăng nhập...
                        </>
                      ) : (
                        "Đăng nhập"
                      )}
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
