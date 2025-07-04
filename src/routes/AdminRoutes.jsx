import LayoutAdmin from "../layouts/LayoutAdmin";
import Candidate from "../pages/admin/candidate";
import Company from "../pages/admin/company";
import HistoryPost from "../pages/admin/history-post";
import Home from "../pages/admin/home";
import Post from "../pages/admin/post";
import Profile from "../pages/admin/profile";
import NotFound from "../pages/not-found/NotFound";
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
import DetailFilterUser from "../components/cv/DetailFilterUser";
import HistoryCv from "../pages/admin/history-cv";
import BuyCV from "../components/cv/BuyCV";
import PaymentCvSuccess from "../components/cv/PaymentCvSuccess";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

// export const adminAccessLoader = () => {
//   const user = getFromLocalStorage("user");

//   if (!user) {
//     return redirect("/auth/login");
//   }

//   if (user.roleCode === "CANDIDATE") {
//     return redirect("/not-found"); // Hoặc redirect("/") nếu bạn muốn chuyển về trang chủ
//   }

//   return null;
// };

const isDarkThemeEnabled = checkDefaultTheme();

const AdminRoutes = {
  path: "/admin",
  // loader: adminAccessLoader,
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
      path: "cv/buy-cv",
      element: <BuyCV />,
    },
    {
      path: "payment/success",
      element: <PaymentSuccess />,
    },
    {
      path: "paymentCv/success",
      element: <PaymentCvSuccess />,
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
    { path: "candiate/:id", element: <DetailFilterUser /> },
    { path: "history-post", element: <HistoryPost /> },
    { path: "history-cv", element: <HistoryCv /> },
    { path: "profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default AdminRoutes;
