import React from "react";

import LayoutPage from "../layouts/LayoutPage";
// import lazyLoader from "./lazyLoader";

import Home from "../pages/home";
import About from "../pages/about";
import Job from "../pages/job";
import Company from "../pages/company";
import Contact from "../pages/contact";
import DetailJob from "../components/layout-client/job/JobDetail";
import ProfileUser from "../pages/profile-user";
import UserSetting from "../pages/usersetting";
import CVPost from "../pages/cv-post";
import DetailCVUser from "../pages/detail-cv-user";
import DetailCompany from "../components/company-user/DetailCompany";
import BlogIT from "../pages/blog-it";
import DetailMainBlogIT from "../components/detail-blog-it/DetailMainBlogIT";

const mainRoutes = {
  path: "/",
  element: <LayoutPage />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "job",
      element: <Job />,
    },
    {
      path: "company",
      element: <Company />,
    },
    {
      path: "blog-it",
      element: <BlogIT />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "detail-job/:id", // Thêm route mới cho trang chi tiết công việc
      element: <DetailJob />,
    },
    {
      path: "candidate/info", // Thêm route mới cho trang chi tiết công việc
      element: <ProfileUser />,
    },
    {
      path: "/candidate/usersetting", // Thêm route mới cho trang chi tiết công việc
      element: <UserSetting />,
    },
    {
      path: "/candidate/cv-post", // Thêm route mới cho trang chi tiết công việc
      element: <CVPost />,
    },
    {
      path: "/candidate/cv-detail/:id", // Thêm route mới cho trang chi tiết công việc
      element: <DetailCVUser />,
    },
    {
      path: "/detail-company/:id", // Thêm route mới cho trang chi tiết công việc
      element: <DetailCompany />,
    },
    {
      path: "/blog/:id", // Thêm route mới cho trang chi tiết công việc
      element: <DetailMainBlogIT />,
    },
  ],
};

export default mainRoutes;
