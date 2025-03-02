import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutAuth from "../layouts/LayoutAuth";

import { action as registerAction } from "../pages/auth/register";

const authRoutes = {
  path: "auth",
  element: <LayoutAuth />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
      action: registerAction,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ],
};

export default authRoutes;
