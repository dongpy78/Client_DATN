import LayoutAdmin from "../layouts/LayoutAdmin";
import Candidate from "../pages/admin/candidate";
import Company from "../pages/admin/company";
import HistoryPost from "../pages/admin/history-post";
import Home from "../pages/admin/home";
import Post from "../pages/admin/post";
import Profile from "../pages/admin/profile";
import NotFound from "../pages/NotFound";
import EditCompany from "../components/company/EditCompany";
import { loader as companyLoader } from "../pages/admin/company";
import AddCompany, {
  action as addCompanyAction,
} from "../components/company/AddCompany";
import { action as editCompanyAction } from "../components/company/EditCompany";
import AddPost, { action as addPostAction } from "../components/post/AddPost";
import EditPost, {
  loader as editPostLoader,
  action as editPostAction,
} from "../components/post/EditPost";

// Import loader và action từ Post
import {
  loader as postLoader,
  action as postAction,
} from "../pages/admin/post";
import ListCV from "../components/post/ListCV";
import DetailCVUser from "../pages/detail-cv-user";
import BuyPost from "../components/post/BuyPost";
import PaymentSuccess from "../components/post/PaymentSuccess";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const AdminRoutes = {
  path: "/admin",
  element: <LayoutAdmin isDarkThemeEnabled={isDarkThemeEnabled} />,
  children: [
    { index: true, path: "", element: <Home /> },
    {
      path: "company",
      element: <Company />,
      loader: companyLoader,
    },
    {
      path: "company/add",
      element: <AddCompany />,
      action: addCompanyAction,
    },
    {
      path: "company/edit",
      element: <EditCompany />,
      action: editCompanyAction,
    },
    { path: "post", element: <Post />, loader: postLoader, action: postAction },
    {
      path: "post/buy-post",
      element: <BuyPost />,
    },
    {
      path: "payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "post/add",
      element: <AddPost />,
      action: addPostAction,
    },
    {
      path: "post/edit/:id",
      element: <EditPost />,
      loader: editPostLoader,
      action: editPostAction,
    },
    {
      path: "post/cv/:id",
      element: <ListCV />,
    },
    {
      path: "post/view-cv/:id",
      element: <DetailCVUser />,
    },
    { path: "list-candidates", element: <Candidate /> },
    { path: "history-post", element: <HistoryPost /> },
    { path: "profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default AdminRoutes;
