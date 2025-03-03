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

const links = [
  {
    text: "Home page",
    path: ".",
    icon: <FaHome />,
  },
  {
    text: "Manage Company",
    path: "edit-company",
    icon: <BsBuildingCheck />,
  },
  {
    text: "Manage Posts",
    path: "list-posts",
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
    icon: <GrTransaction />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
