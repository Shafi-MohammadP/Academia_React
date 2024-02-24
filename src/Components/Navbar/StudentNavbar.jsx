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
import { resetState } from "../../redux/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/Company_Logo.png";
import axios from "axios";

const StudentNavbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const [profile, setProfile] = useState(false);
  const handleProfile = () => setProfile((cur) => !cur);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const student = useSelector((state) => {
    if (state.user.userInfo.role === "student") return state.user.userInfo;
  });

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        if (student) {
          const response = await axios.get(
            `http://127.0.0.1:8000/user/studentProfile/${student.user_id}/`
          );
          setUser(response.data);
          console.log(response.data, "Backend Data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentProfile(); // Call the function to fetch student profile
  }, [student]);
  const dispatch = useDispatch();
  const navRef = useRef();
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    dispatch(resetState());
    navigate("/Login");
    toast.success("Logout Success");
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header>
        <img src={logo} alt="" className="h-20 px-10" />
        <nav ref={navRef}>
          <a href="/#">Home</a>
          <a href="/#">My work</a>
          <a href="/#">Blog</a>
          <a href="/#">About me</a>

          {/* Move the Button with FontAwesome icon to the end of the nav element */}

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search"
            className="p-2 border rounded-md focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        {student ? (
          <div className="relative">
            {/* User icon, clicking on it toggles the dropdown */}
            <div onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={faUser}
                className="user cursor-pointer w-12 h-6"
              />
            </div>

            {/* Dropdown content */}
            {isDropdownVisible && (
              <div className="absolute top-12 right-0 mt-2 bg-white border rounded shadow-md z-10 w-48">
                <ul>
                  <li>
                    <Link to={"/studentprofile"} onClick={toggleDropdown}>
                      profile
                    </Link>
                  </li>
                  <li>
                    {/* Add your logout functionality here */}
                    <a href="" onClick={() => logoutUser()}>
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
};

export default StudentNavbar;
