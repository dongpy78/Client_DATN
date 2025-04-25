import { createBrowserRouter } from "react-router-dom";

import LayoutGlobal from "../layouts/LayoutGlobal";
import ErrorPage from "../pages/ErrorPage";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/not-found/NotFound";
import ScrollToTop from "../components/system/ScrollToTop";

const routes = [
  {
    path: "/",
    element: (
      <>
        <LayoutGlobal />
        <ScrollToTop /> {/* Thêm nút scroll to top */}
      </>
    ),

    errorElement: <ErrorPage />,
    children: [
      // Main Routes
      MainRoutes,
      // Auth Routes
      AuthRoutes,
      // Admin Routes
      AdminRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
