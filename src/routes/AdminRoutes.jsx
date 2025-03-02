import LayoutAdmin from "../layouts/LayoutAdmin";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../pages/admin/dashboard-layout";
import AddJob from "../pages/admin/add-job";
import AdminPage from "../pages/admin/admin-page";
import AllJob from "../pages/admin/all-job";
import Profile from "../pages/admin/profile";
import Stats from "../pages/admin/stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const AdminRoutes = {
  path: "/admin",
  element: <LayoutAdmin isDarkThemeEnabled={isDarkThemeEnabled} />, // Sử dụng LayoutAdmin
  children: [
    { index: true, path: "", element: <AddJob /> },
    { path: "admin-page", element: <AdminPage /> },
    { path: "all-job", element: <AllJob /> },
    { path: "profile", element: <Profile /> },
    { path: "stats", element: <Stats /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default AdminRoutes;
