import React from "react";
import "../../../styles/verify-otp.css";

const OtpEmail = () => {
  return (
    <>
      <div class="wrapper-login">
        <div class="auth-container">
          <div class="auth-box">
            <h2>Verify OTP</h2>
            <p>Enter the 6-digit OTP sent to your phone</p>
            <form action="login-success.html">
              <div class="otp-input-group">
                <input type="text" maxlength="1" class="otp-input" required />
                <input type="text" maxlength="1" class="otp-input" required />
                <input type="text" maxlength="1" class="otp-input" required />
                <input type="text" maxlength="1" class="otp-input" required />
                <input type="text" maxlength="1" class="otp-input" required />
                <input type="text" maxlength="1" class="otp-input" required />
              </div>
              <button type="submit" class="auth-btn">
                <i class="fas fa-check-circle"></i> Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpEmail;
