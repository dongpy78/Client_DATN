import React from "react";
import "../../../styles/forget-password.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="wrapper-forget">
        <div className="auth-container">
          <div className="auth-box">
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a new password</p>
            <form action="#">
              <div className="input-group">
                <div className="input-with-icon">
                  <i className="fas fa-envelope" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required=""
                  />
                </div>
              </div>
              <button type="submit" className="auth-btn">
                <i className="fas fa-paper-plane" /> Send New Password
              </button>
              <div className="forget-text">
                <p>
                  <i className="fas fa-arrow-left"></i> Back to{" "}
                  <Link to="/auth/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
