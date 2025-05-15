import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutAuth from "../layouts/LayoutAuth";

import { action as registerAction } from "../pages/auth/register";
import { action as loginAction } from "../pages/auth/login";
import { action as forgotPasswordAction } from "../pages/auth/forgot-password";
import OtpEmail from "../pages/auth/otp-email";
import VerifyEmail from "../pages/auth/verify-email";
const authRoutes = {
  path: "auth",
  element: <LayoutAuth />,
  children: [
    {
      path: "login",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "register",
      element: <Register />,
      action: registerAction,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
      action: forgotPasswordAction,
    },
    {
      path: "verify-otp",
      element: <OtpEmail />,
    },
    {
      path: "verify-email",
      element: <VerifyEmail />,
    },
  ],
};

export default authRoutes;
