import LayoutAdmin from "../layouts/LayoutAdmin";
import Candidate from "../pages/admin/candidate";
import Company from "../pages/admin/company";
import HistoryPost from "../pages/admin/history-post";
import Home from "../pages/admin/home";
import Post from "../pages/admin/post";
import Profile from "../pages/admin/profile";
import NotFound from "../pages/NotFound";

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
    { index: true, path: "", element: <Home /> },
    { path: "edit-company", element: <Company /> },
    { path: "list-posts", element: <Post /> },
    { path: "list-candidates", element: <Candidate /> },
    { path: "history-post", element: <HistoryPost /> },
    { path: "profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default AdminRoutes;
