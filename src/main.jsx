import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import router from "./routes";
// import App from "./App.jsx";

import customFetch from "./utils/customFetch";
// import "antd/dist/antd.css";

const response = customFetch.get(
  "/posts/filter?limit=5&offset=0&categoryJobCode=&addressCode=&salaryJobCode=&categoryJoblevelCode=&categoryWorktypeCode=&experienceJobCode=&sortName=false&isHot=&search="
);

console.log("TEST API: ", response);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
