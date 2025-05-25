import React, { useEffect, useState } from "react";
import "../../../styles/register.css";
import "../../../styles/register2.css";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
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

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   // Kiểm tra password và confirm-password
//   if (data.password !== data["confirm-password"]) {
//     showErrorToast("Passwords do not match");
//     return null;
//   }

//   // Mapping dữ liệu sang định dạng API yêu cầu
//   const mappedData = {
//     firstName: data.firstName,
//     lastName: data.lastName,
//     phonenumber: data.phone,
//     email: data.email,
//     password: data.password,
//     roleCode: data.role === "Công ty" ? "COMPANY" : "CANDIDATE",
//     genderCode: data.gender === "Nam" ? "M" : "FE",
//     statusCode: "S1",
//     image: "avatar.jpg",
//   };

//   // console.log("Request payload:", mappedData);

//   try {
//     // Gọi API đăng ký
//     const response = await axiosInstance.post("/auth/register", mappedData);

//     // Kiểm tra status code
//     if (response.status === 201) {
//       showSuccessToast(
//         "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
//       );
//       return { success: true, email: data.email }; // Trả về dữ liệu để Register.js xử lý
//     } else if (response.status === 400) {
//       // Lấy thông điệp lỗi từ response.data
//       // showErrorToast(response.data.message);
//       return { error: response.data.message };
//     } else {
//       // showErrorToast(response.data.message);
//       return { error: response.data.message };
//     }
//   } catch (error) {
//     // Xử lý lỗi mạng, lỗi server (500), hoặc lỗi không có response
//     const errorMessage =
//       error.response?.data?.message ||
//       error.message ||
//       "Không thể kết nối đến server";
//     console.error("Error:", error.response?.data || error);
//     // showErrorToast(errorMessage);
//     return { error: errorMessage };
//   }
// };

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Thêm state submitted
  const [validations, setValidations] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    "confirm-password": false,
  });

  const handleValidationChange = (fieldName, isValid) => {
    setValidations((prev) => ({
      ...prev,
      [fieldName]: isValid,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const isFormValid = Object.values(validations).every((valid) => valid);
    setFormValid(isFormValid);

    // if (!isFormValid) {
    //   showErrorToast("Vui lòng điền đầy đủ thông tin hợp lệ");
    //   return;
    // }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data["confirm-password"]) {
      showErrorToast("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsSubmitting(true);

    try {
      const mappedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phonenumber: data.phone,
        email: data.email,
        password: data.password,
        roleCode: data.role === "Nhà tuyển dụng" ? "COMPANY" : "CANDIDATE",
        genderCode: data.gender === "Nam" ? "M" : "FE",
        statusCode: "S1",
        image: "avatar.jpg",
      };

      const response = await axiosInstance.post("/auth/register", mappedData);

      if (response.status === 201) {
        showSuccessToast(
          "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
        );
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } else {
        // Xử lý các status code khác nếu cần
        showErrorToast(response.data?.message || "Đăng ký thất bại");
      }
    } catch (error) {
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại sau";

      if (error.response) {
        // Xử lý các mã lỗi cụ thể từ API
        switch (error.response.status) {
          case 400:
            if (error.response.data.message === "Email đã tồn tại") {
              errorMessage =
                "Email này đã được đăng ký. Vui lòng sử dụng email khác";
            } else {
              errorMessage =
                error.response.data.message || "Thông tin không hợp lệ";
            }
            break;

          default:
          // errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const isFormValid = Object.values(validations).every((valid) => valid);
    setFormValid(isFormValid);
  }, [validations]);
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
                  <Form method="POST" onSubmit={handleSubmit} noValidate>
                    <FormInput
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Họ"
                      icon="fas fa-user"
                      required={true}
                      pattern="^[a-zA-ZÀ-ỹ\s]+$"
                      errorMessage="Họ chỉ được chứa chữ cái và khoảng trắng"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                    />
                    <FormInput
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Tên"
                      icon="fas fa-user"
                      required={true}
                      pattern="^[a-zA-ZÀ-ỹ\s]+$"
                      errorMessage="Tên chỉ được chứa chữ cái và khoảng trắng"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                    />

                    <FormInput
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Số điện thoại"
                      icon="fas fa-phone"
                      required={true}
                      pattern="^[0-9]{10}$"
                      errorMessage="Số điện thoại chỉ được chứa số và từ 10 ký tự"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                      maxLength={10}
                    />
                    <FormInput
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      icon="fas fa-envelope"
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
                      icon="fas fa-lock"
                      required={true}
                      pattern="^.{6,}$"
                      errorMessage="Mật khẩu phải có ít nhất 6 ký tự"
                      onValidationChange={handleValidationChange}
                      submitted={submitted}
                    />
                    <FormInput
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="Xác nhận mật khẩu"
                      icon="fas fa-lock"
                      required={true}
                      submitted={submitted}
                    />
                    <FormSelect
                      label=""
                      name="role"
                      list={["Ứng viên", "Nhà tuyển dụng"]}
                      defaultValue="Ứng viên"
                    />
                    <FormSelect
                      label=""
                      name="gender"
                      list={["Nam", "Nữ"]}
                      defaultValue="Nam"
                    />
                    <button
                      type="submit"
                      className="register-btn"
                      formNoValidate
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Đang đăng ký...
                        </>
                      ) : (
                        "Đăng ký"
                      )}
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
