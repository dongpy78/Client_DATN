import React from "react";
import "../../../styles/register.css";
import "../../../styles/register2.css";
import { Form, Link, redirect } from "react-router-dom";
import FormInput from "../../../components/layout-client/FormInput";
import FormSelect from "../../../components/layout-client/FormSelect";
import axiosInstance from "../../../libs/axiosInterceptor";
// import customFetch from "../../../utils/customFetch";
// import { saveToLocalStorage } from "../../../utils/localStorage";
// import { keyLocalStorage } from "../../../constants/keyConstant";
// import { GlobalContext } from "../../../contexts/GlobalProviders";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../utils/toastNotifications";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Kiểm tra password và confirm-password
  if (data.password !== data["confirm-password"]) {
    showErrorToast("Passwords do not match");
    return null;
  }

  // Mapping dữ liệu sang định dạng API yêu cầu
  const mappedData = {
    firstName: data.firstName,
    lastName: data.lastName,
    phonenumber: data.phone,
    email: data.email,
    password: data.password,
    roleCode: data.role === "Công ty" ? "COMPANY" : "CANDIDATE",
    genderCode: data.gender === "Nam" ? "M" : "FE",
    statusCode: "S1",
    image: "avatar.jpg",
  };

  // console.log("Request payload:", mappedData);

  try {
    // Gọi API đăng ký
    const response = await axiosInstance.post("/auth/register", mappedData);
    // console.log("Response data:", response.data);

    // Kiểm tra status code
    if (response.status === 201) {
      showSuccessToast(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
      );
      return redirect("/auth/verify-email");
    } else {
      showErrorToast("Đăng ký thất bại");
      return null;
    }
  } catch (error) {
    console.error("Error:", error.response?.data);
    // showErrorToast(error?.response?.data?.message || "Registration failed");
    return error;
  }
};

const Register = () => {
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
            {/* Login Form will be placed here */}
            <div className="wrapper-register">
              <div className="register-container">
                <div className="register-box">
                  <h2 style={{ color: "#5469d4" }} className="title-res-log">
                    Đăng ký tài khoản
                  </h2>
                  <Form method="POST">
                    <FormInput
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Họ"
                      icon="fas fa-user"
                      required={true}
                    />
                    <FormInput
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Tên"
                      icon="fas fa-user"
                      required={true}
                    />

                    <FormInput
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Số điện thoại"
                      icon="fas fa-phone"
                      required={true}
                    />
                    <FormInput
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      icon="fas fa-envelope"
                      required={true}
                    />
                    <FormInput
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Mật khẩu"
                      icon="fas fa-lock"
                      required={true}
                    />
                    <FormInput
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="Xác nhận mật khẩu"
                      icon="fas fa-lock"
                      required={true}
                    />
                    <FormSelect
                      label=""
                      name="role"
                      list={["Ứng viên", "Công ty"]}
                      defaultValue="Ứng viên"
                    />
                    <FormSelect
                      label=""
                      name="gender"
                      list={["Nam", "Nữ"]}
                      defaultValue="Nam"
                    />
                    <button type="submit" className="register-btn">
                      Đăng ký
                    </button>
                  </Form>
                  <p className="alternate-option">
                    Bạn đã có tài khoản?{" "}
                    <Link to="/auth/login">Đăng nhập ngay</Link>
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

export default Register;
