import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/login.css";
import FormInput from "../../../components/layout-client/FormInput"; // Import FormInput

const Login = () => {
  return (
    <>
      <div className="wrapper-login">
        <div className="login-container">
          <div className="login-box">
            <h2>Welcome Back</h2>
            <p>Login to your account</p>
            <form action="#">
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                icon="fa fa-envelope"
                required={true}
              />
              <FormInput
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                icon="fa fa-lock"
                required={true}
              />
              <div className="options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/auth/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
            <div className="social-login">
              <p>Or login with</p>
              <div className="social-icons">
                <button className="google-btn">
                  <i className="fab fa-google" /> Google
                </button>
                <button className="facebook-btn">
                  <i className="fab fa-facebook-f" /> Facebook
                </button>
              </div>
            </div>
            <p className="login-text">
              Don't have an account?{" "}
              <Link to="/auth/register">Register now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
