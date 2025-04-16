import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsBuildingCheck } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { FaMoneyCheckAlt } from "react-icons/fa";

const links = [
  {
    text: "Trang chủ",
    path: ".",
    icon: <FaHome />,
  },
  {
    text: "Quản lý công ty",
    path: "company",
    icon: <BsBuildingCheck />,
  },
  {
    text: "Quản lý bài đăng",
    path: "post",
    icon: <BsFillFileTextFill />,
  },
  {
    text: "Tìm kiếm ứng viên",
    path: "list-candidates",
    icon: <BsFillPersonCheckFill />,
  },
  {
    text: "Lịch sử giao dịch bài đăng",
    path: "history-post",
    icon: <FaMoneyCheckAlt />,
  },
  {
    text: "Lịch sử giao dịch CV",
    path: "history-cv",
    icon: <FaMoneyCheckAlt />,
  },
  {
    text: "Hồ sơ cá nhân",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
