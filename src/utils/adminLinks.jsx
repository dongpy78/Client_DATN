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
    text: "Home page",
    path: ".",
    icon: <FaHome />,
  },
  {
    text: "Manage Company",
    path: "company",
    icon: <BsBuildingCheck />,
  },
  {
    text: "Manage Posts",
    path: "post",
    icon: <BsFillFileTextFill />,
  },
  {
    text: "Manage Candidate",
    path: "list-candidates",
    icon: <BsFillPersonCheckFill />,
  },
  {
    text: "History Post",
    path: "history-post",
    icon: <FaMoneyCheckAlt />,
  },
  {
    text: "History CV",
    path: "history-cv",
    icon: <FaMoneyCheckAlt />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
