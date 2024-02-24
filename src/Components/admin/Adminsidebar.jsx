import React from "react";
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
export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          {/* <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to={"/admin/studentmanagement/"}>
                  <ListItem className="text-black">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Student Management
                  </ListItem>
                </Link>
                <Link to={"/admin/tutormanagment/"}>
                  <ListItem className="text-black">
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Tutor Management
                  </ListItem>
                </Link>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Projects
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  E-Commerce
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Orders
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion> */}
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
            <ListItemSuffix>
              {/* <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              /> */}
            </ListItemSuffix>
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
      {/* Navbar/Header */}
      {/* <Card className="w-full p-4 shadow-md bg-white">
        <div className="flex items-center justify-between">    <Typography variant="h5" color="blue-gray">
            <span className="text-green-900">ACADEMIA</span>
          </Typography>

          <BellIcon className="h-6 w-6 text-blue-gray cursor-pointer" />
        </div>
        <hr />
      </Card> */}
    </div>
  );
}
