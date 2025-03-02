import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";
import LayoutAuth from "../layouts/LayoutAuth";

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
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ],
};

export default authRoutes;
