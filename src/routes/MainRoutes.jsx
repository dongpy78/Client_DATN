import React from "react";

import LayoutPage from "../layouts/LayoutPage";
// import lazyLoader from "./lazyLoader";

import Home from "../pages/home";
import About from "../pages/about";
import Job from "../pages/job";
import Company from "../pages/company";
import Contact from "../pages/contact";

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
      path: "contact",
      element: <Contact />,
    },
  ],
};

export default mainRoutes;
