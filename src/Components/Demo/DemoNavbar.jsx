import React, { useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./DemoNavbarStyle.css";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { resetState } from "../../redux/User";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import logo from "../../assets/Company_Logo.png";
import logo from "../../assets/Company_Logo.png";
// import logo from "../../assets/Company_Logo.png";
import axios from "axios";
const DemoNavbar = () => {
  const navigate = useNavigate();
  const student = useSelector((state) => {
    if (state.user.userInfo.role === "student") return state.user.userInfo;
  });
  useEffect(() => {
    if (!student) return;

    console.log(student, "student found");
  });

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
            className="p-2 border rounded-md focus:outline-none focus:border-blue-500 w-full" // Add w-full class for full width
          />
        </div>

        {student ? (
          <FontAwesomeIcon
            onClick={() => logoutUser()}
            icon={faUser}
            className="cursor-pointer w-12 h-6"
          />
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

export default DemoNavbar;
