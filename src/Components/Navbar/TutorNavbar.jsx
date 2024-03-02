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
    if (!tutor) return;
    if (!tutor_id) {
      axios.get(`${BaseUrl}user/tutorProfile/${tutor.user_id}`).then((res) => {
        setUser(res.data);
        console.log(res.data, "datass");
        dispatch(setTutor_id(res.data.id));
      });
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    dispatch(resetState());

    navigate("/Login");
    toast.success("Logout Success");
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

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
        <Link to={"/tutor"}>
          <img src={logo} alt="" className="h-20 px-10" />
        </Link>
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

          {certificate ? (
            <Link to={`/tutor/applicationform/`}>Add Course</Link>
          ) : (
            ""
          )}
          <Link to={"about-us/"}>
            {tutor ? (
              <div className="relative">
                <div onClick={toggleDropdown}>
                  <i
                    className="ri-user-line user  cursor-pointer text-2xl
                "
                    title="profile"
                  ></i>
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
          </Link>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}
