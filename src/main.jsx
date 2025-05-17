import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes";
import moment from "moment";
import "moment/locale/vi";

// QUAN TRỌNG: Đặt ở đây để tránh bị Ant Design ghi đè
moment.locale("vi", {
  relativeTime: {
    future: "trong %s",
    past: "%s trước",
    s: "vài giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "1 ngày",
    dd: "%d ngày",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});

// import customFetch from "./utils/customFetch";

// const response = customFetch.get(
//   "/posts/filter?limit=5&offset=0&categoryJobCode=&addressCode=&salaryJobCode=&categoryJoblevelCode=&categoryWorktypeCode=&experienceJobCode=&sortName=false&isHot=&search="
// );

// console.log("TEST API: ", response);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
