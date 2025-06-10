import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { paymentOrderSuccessService } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentSuccess = (props) => {
  let query = useQuery();
  const [message, setMessage] = useState("Đang xử lý...");
  const toastShownRef = useRef(false); // Thêm ref để theo dõi
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    if (orderData) {
      // Thêm thông tin thanh toán từ query parameters
      orderData.paymentId = query.get("paymentId");
      orderData.token = query.get("token");
      orderData.PayerID = query.get("PayerID");
      createNewOrder(orderData);
    } else {
      setMessage("Thông tin đơn hàng không hợp lệ");
      if (!toastShownRef.current) {
        showErrorToast("Thông tin đơn hàng không hợp lệ");
        toastShownRef.current = true;
      }
    }
  }, []); // Chỉ chạy một lần khi component mount

  let createNewOrder = async (data) => {
    let res = await paymentOrderSuccessService(data);
    console.log("Created order", res);
    if (res) {
      if (!toastShownRef.current) {
        showSuccessToast(res.errMessage);
        toastShownRef.current = true;
      }
      localStorage.removeItem("orderData");
      setMessage("Chúc mừng bạn đã mua lượt đăng bài thành công");
    } else {
      if (!toastShownRef.current) {
        showErrorToast(res?.errMessage || "Có lỗi xảy ra");
        toastShownRef.current = true;
      }
    }
  };

  const navigate = useNavigate();

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "2rem auto",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: message.includes("Chúc mừng") ? "#2e7d32" : "#333",
            marginBottom: "1.5rem",
            padding: "1rem",
            borderBottom: message.includes("Chúc mừng")
              ? "2px solid #2e7d32"
              : "2px solid #4B49AC",
            width: "100%",
          }}
        >
          {message}
        </div>

        {message === "Chúc mừng bạn đã mua lượt đăng bài thành công" && (
          <button
            onClick={() => navigate("/admin/post/add")}
            style={{
              backgroundColor: "#4B49AC",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(75, 73, 172, 0.3)",
              marginTop: "1.5rem",
              ":hover": {
                backgroundColor: "#3a38a0",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(75, 73, 172, 0.4)",
              },
            }}
          >
            Đăng bài ngay
          </button>
        )}

        {message === "Thông tin đơn hàng không hợp lệ" && (
          <button
            onClick={() => navigate("/admin/post/buy-post")}
            style={{
              backgroundColor: "#d32f2f",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
              marginTop: "1.5rem",
              ":hover": {
                backgroundColor: "#b71c1c",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.4)",
              },
            }}
          >
            Quay lại trang mua lượt đăng bài
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default PaymentSuccess;
