import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotifications";
import { paymentOrderSuccessServiceCv } from "../../services/userService";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const PaymentCvSuccess = () => {
  let query = useQuery();
  const [message, setMessage] = useState("Đang xử lý...");

  useEffect(() => {
    let orderData = JSON.parse(localStorage.getItem("orderCvData"));
    if (orderData) {
      orderData.paymentId = query.get("paymentId");
      orderData.token = query.get("token");
      orderData.PayerID = query.get("PayerID");
      createNewOrder(orderData);
    } else {
      setMessage("Thông tin đơn hàng không hợp lệ");
    }
  }, []);

  let createNewOrder = async (data) => {
    let res = await paymentOrderSuccessServiceCv(data);
    console.log("Created order", res);
    if (res) {
      showSuccessToast(res.errMessage);
      localStorage.removeItem("orderCvData");
      setMessage("húc mừng bạn đã mua lượt tìm ứng viên thành công");
    } else {
      showErrorToast(res?.errMessage || "Có lỗi xảy ra");
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

        {message === "Chúc mừng bạn đã mua lượt xem ứng viên thành công" && (
          <button
            onClick={() => navigate("/admin/list-candidates")}
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
            onClick={() => navigate("/admin/cv/buy-cv")}
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

export default PaymentCvSuccess;
