import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./StudentNavbarStyle.css";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { resetState, setTutor_id } from "../../redux/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/Company_Logo.png";
import { BaseUrl } from "../../Constants/Constants";
import axios from "axios";
import { Loader } from "../Loader/Loader";
export function TutorStickyNavbar() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [certificate, setCertificate] = useState(false);
  const navRef = useRef();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { tutor_id } = useSelector((state) => state.user);
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const navigate = useNavigate();
  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });

  useEffect(() => {
    console.log("componenent mounded");
    if (!tutor) return;
    if (!tutor_id) {
      axios.get(`${BaseUrl}user/tutorProfile/${tutor.user_id}`).then((res) => {
        setUser(res.data);
        console.log(res.data, "datass");
        dispatch(setTutor_id(res.data.id));
      });
    }
  }, []);
  // if (!tutor) {
  //   return <Loader />;
  // }

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    dispatch(resetState());

    navigate("/Login");
    toast.success("Logout Success");
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [openNav, setOpenNav] = React.useState(false);
  // const tutor = useSelector((state) => {
  //   if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  // });
  // React.useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false)
  //   );
  // }, []);
  // const profileShow = () => {
  //   axios
  //     .get(`http://127.0.0.1:8000/user/tutorProfile/${tutor.user_id}/`)
  //     .then((response) => {
  //       console.log(response.data); // Log the response data to the console
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  // const LogoutUser = () => {
  //   localStorage.removeItem("authToken");
  //   dispatch(resetState());
  //   navigate("/Login");
  //   toast.success("Logout Success");
  // };

  // const navList = (
  //   <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Pages
  //       </a>
  //     </Typography>
  //     <Typography
  //       onClick={() => profileShow()}
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       Account
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Blocks
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <p href="#" className="flex items-center">
  //         Docs
  //       </p>
  //     </Typography>
  //   </ul>
  // );
  useEffect(() => {
    const apiUrl = `${BaseUrl}tutor/certificate_confirmation/${tutor.id}/`;
    const fetchCertificate = async () => {
      const response = await axios.get(apiUrl);
      setCertificate(response.data.message);
    };
    fetchCertificate();
    return () => {};
  }, []);

  return (
    <>
      <header>
        <img src={logo} alt="" className="h-20 px-10" />
        <nav ref={navRef}>
          <Link to={"/tutor"}>
            <a href="">Home</a>
          </Link>
          <Link to={"/tutor/my-courses/"}>
            <a href="">My Course</a>
          </Link>
          <a href="">Blog</a>
          <Link to={"about-us/"}>
            <a href="">About Us</a>
          </Link>
          {/* <a href="/tutor/applicationform">Add Course</a> */}
          {certificate ? (
            <Link to={`/tutor/applicationform/`}>Add Course</Link>
          ) : (
            ""
          )}

          {/* Move the Button with FontAwesome icon to the end of the nav element */}

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
        {/* <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search"
            className="p-2 border rounded-md focus:outline-none focus:border-blue-500 w-full" // Add w-full class for full width
          />
        </div> */}

        {tutor ? (
          <div className="relative">
            {/* User icon, clicking on it toggles the dropdown */}
            <div onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={faUser}
                className="user cursor-pointer w-12 h-6"
                title="profile"
              />
            </div>

            {/* Dropdown content */}
            {isDropdownVisible && (
              <div className="absolute top-12 right-0 mt-2 bg-white border rounded shadow-md z-10 w-48">
                <ul>
                  <li>
                    <i class="ri-user-line"></i>
                    <Link
                      to={"/tutor/tutorprofile"}
                      onClick={toggleDropdown}
                      style={{ textDecoration: "None", color: "black" }}
                    >
                      {" "}
                      Profile
                    </Link>
                  </li>
                  <li>
                    {/* Add your logout functionality here */}
                    <i class="ri-logout-box-r-line"></i>
                    <a
                      href=""
                      onClick={() => logoutUser()}
                      style={{ textDecoration: "None", color: "black" }}
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <NavLink to={"/Login"}>
            <Button
              variant="gradient"
              size="sm"
              className="user hidden lg:inline-block"
            >
              <span>Sign in</span>
            </Button>
          </NavLink>
        )}
        {/* </div> */}
      </header>
    </>
  );
}
//     <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
//       <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
//         <div className="flex items-center justify-between text-blue-gray-900">
//           <Typography
//             as="a"
//             href="#"
//             className="mr-4 cursor-pointer py-1.5 font-medium"
//           >
//             <img src={logo} alt="" className="h-20 px-10" />
//           </Typography>
//           <div className="flex items-center gap-4">
//             <div className="mr-4 hidden lg:block">{navList}</div>
//             <div className="flex items-center gap-x-1">
//               {/* <Link to={"/login"} className="hidden lg:inline-block">
//                 Log In
//               </Link> */}
//               {tutor ? (
//                 <Button onClick={LogoutUser} className="bg-[#051339] ">
//                   <FontAwesomeIcon icon={faUser} className="w-12 h-6" />
//                 </Button>
//               ) : (
//                 <NavLink to={"/Login"}>
//                   <Button
//                     variant="gradient"
//                     size="sm"
//                     className="hidden lg:inline-block"
//                   >
//                     <span>Sign in</span>
//                   </Button>
//                 </NavLink>
//               )}
//             </div>
//             <IconButton
//               variant="text"
//               className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//               ripple={false}
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </IconButton>
//           </div>
//         </div>
//         <MobileNav open={openNav}>
//           {navList}
//           <div className="flex items-center gap-x-1">
//             <Link to={"/login"} className="bg-green-600">
//               Log In
//             </Link>
//             <Button fullWidth variant="gradient" size="sm" className="">
//               <span>Sign in</span>
//             </Button>
//           </div>
//         </MobileNav>
//       </Navbar>
//     </div>
//   );
// }
