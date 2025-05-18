import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import customFetch from "../../../utils/customFetch";

import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 24px;
  font-size: 28px;
`;

const Message = styled.p`
  color: #7f8c8d;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;
`;

const StatusIcon = styled.div`
  font-size: 80px;
  margin-bottom: 30px;
  color: ${(props) => (props.success ? "#2ecc71" : "#e74c3c")};
`;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    const verifyEmail = async () => {
      try {
        // Gọi API backend
        await customFetch.get("/auth/verify-email", {
          params: { token },
        });

        setStatus("success");
        // setTimeout(() => {
        //   navigate("/auth/login");
        // }, 3000);
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error.response?.data?.message ||
            "Link xác thực không hợp lệ hoặc đã hết hạn"
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setErrorMessage("Không tìm thấy token xác thực");
    }
  }, [searchParams, navigate]);

  const handleResendEmail = () => {
    // Thêm logic gửi lại email xác thực ở đây
    console.log("Resend verification email");
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === "verifying" && (
          <>
            <BeatLoader color="#3498db" size={15} />
            <Title>Đang xác thực email...</Title>
            <Message>Vui lòng chờ trong giây lát</Message>
          </>
        )}

        {status === "success" && (
          <>
            <StatusIcon success>✓</StatusIcon>
            <Title>Xác thực thành công!</Title>
            <Message>
              Email của bạn đã được xác thực. Bạn sẽ được chuyển hướng đến trang
              đăng nhập...
            </Message>
          </>
        )}

        {status === "error" && (
          <>
            <StatusIcon>✕</StatusIcon>
            <Title>Xác thực thất bại</Title>
            <Message>{errorMessage}</Message>

            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResendEmail}
            >
              Gửi lại email xác thực
            </Button>

            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                background: "transparent",
                color: "#3498db",
                marginLeft: "10px",
              }}
            >
              Về trang chủ
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default VerifyEmail;
