import React, { useState } from "react";
import toast from "react-hot-toast";
import logo from "../../assets/Company_Logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/User";
import { useEffect } from "react";
import { BaseUrl } from "../../Constants/Constants";
import axios from "axios";
export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
  const tokenDataString = localStorage.getItem("authToken");
  const tokenData = JSON.parse(tokenDataString);
  const accessToken = tokenData ? tokenData.access : null;
  //   const authToken = JSON.parse(localStorage.getItem("authToken"));
  //   useEffect(() => {
  //     console.log(authToken, "tokenAvailable.......");
  //   }, []);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const Logoutadmin = () => {
    localStorage.removeItem("authToken");
    dispatch(resetState());
    navigate("/Login");
    toast.success("Logout Success");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            <img src={logo} alt="" className="max-h-20 px-10" />
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <DashboardIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin"}>
              Dashboard
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <SchoolIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/studentmanagement/"}>
              student management
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CastForEducationIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/tutormanagment/"}>
              Tutor management
            </Link>
            <ListItemSuffix></ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CategoryIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/categoryManagement"}>
              Category Management
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <AutoStoriesSharpIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/courseManagement/"}>
              Course Management
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <AutoStoriesSharpIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/certificateManagement/"}>
              Certificate Management
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <AutoStoriesSharpIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link className="text-black" to={"/admin/videoManagement/"}>
              Video Management
            </Link>
          </ListItem>
          <ListItem onClick={Logoutadmin}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
