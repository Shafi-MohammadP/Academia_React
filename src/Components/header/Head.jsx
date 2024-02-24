import React, { useRef, useState, useEffect } from "react";
import "./header.css";
import { Container } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "../../redux/User";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../Constants/Constants";
import CourseCategoryList from "../common/coursecategorybaselisting/CourseCategoryList";
import CustomeToast from "../common/custome-toast/CustomeToast";
const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Courses",
    url: "all-courses/",
  },
  {
    display: "About",
    url: "#",
  },

  {
    display: "Pages",
    url: "#",
  },
  {
    display: "Blog",
    url: "#",
  },
];
const Head = () => {
  const user = useSelector((state) => {
    if (state.user.userInfo.role === "student") return state.user.userInfo;
  });
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef();
  const [student, setStudent] = useState([]);
  const [purchasedCourse, setPurchasedCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isCategoryDropdown, setCategoryDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const toggleCategoryDropdown = () => {
    setCategoryDropdown(!isCategoryDropdown);
  };
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    dispatch(resetState());
    navigate("/Login");
    toast.success("Logout Success");
  };
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);
  useEffect(() => {
    axios.get(`${BaseUrl}dashboard/categoriesList/`).then((res) => {
      setCategories(res.data);
      // console.log(categories, "categories");
    });
  }, []);
  useEffect(() => {
    if (!user) {
      return;
    }
    const apiUrl = `${BaseUrl}student/purchasedCourse/${user.id}/`;
    axios.get(apiUrl).then((res) => {
      setPurchasedCourse(res.data);
    });
  }, []);
  const handleCategoryCourse = async (category_id, category_name) => {
    console.log(category_name);
    const apiUrl = `${BaseUrl}course/courseCategoryBase/${category_id}/`;
    toggleCategoryDropdown();

    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200 && response.data.length !== 0) {
        navigate("courseCategory/", {
          state: { categoryBase: response.data, categoryName: category_name },
        });
      } else {
        const message = "We wil update the course soon";
        toast(<CustomeToast message={message} icon={faExclamationTriangle} />, {
          position: "top-right",
          autoClose: 200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleMyPurchasedCourse = () => {
    navigate("purchased-course/");
    toggleDropdown();
  };
  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo cursor-pointer" onClick={handleHome}>
            <h2 className=" d-flex align-items-center gap-1 text-black">
              <i class="ri-pantone-line"></i> Academia
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list relative">
                <li className="nav__item">
                  <a href="/" onMouseEnter={toggleCategoryDropdown}>
                    categories
                  </a>
                </li>
                {isCategoryDropdown && (
                  <div className="nav__right absolute top-8 bg-white border rounded shadow-md w-full">
                    <ul>
                      {categories.map((category, index) => (
                        <li
                          key={index}
                          className="cursor-pointer"
                          onClick={() =>
                            handleCategoryCourse(category.id, category.name)
                          }
                        >
                          {category.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <li className="nav__item">
                  <Link to={"/all-courses"}>Courses</Link>
                </li>
                <li className="nav__item">
                  <a href="/">pages</a>
                </li>
                <li className="nav__item">
                  <a href="/">about us</a>
                </li>
                <li className="nav__item">
                  <a href="/">blog</a>
                </li>
              </ul>
            </div>

            <div className="nav__right">
              <div className="relative">
                {/* User icon, clicking on it toggles the dropdown */}
                <div onClick={toggleDropdown}>
                  <p className="mb-0 d-flex align-items-center gap-2">
                    <i
                      class="ri-user-line"
                      style={{ cursor: "pointer", fontSize: "25px" }}
                    ></i>
                  </p>
                </div>

                {/* Dropdown content */}
                {isDropdownVisible && (
                  <div className="nav__right absolute top-12 right-0 mt-2 bg-white border rounded shadow-md z-10 w-48">
                    <ul>
                      <li>
                        <i class="ri-user-line"></i>
                        <Link
                          to={"/studentprofile"}
                          onClick={toggleDropdown}
                          style={{
                            textDecoration: "None",
                            color: "black",
                            marginLeft: "10px",
                          }}
                        >
                          profile
                        </Link>
                      </li>
                      <li>
                        {/* Add your logout functionality here */}
                        <i class="ri-logout-box-r-line"></i>
                        <a
                          href=""
                          onClick={() => logoutUser()}
                          style={{
                            textDecoration: "None",
                            color: "black",
                            marginLeft: "10px",
                          }}
                        >
                          Log out
                        </a>
                      </li>
                      {purchasedCourse.length !== 0 && (
                        <li>
                          <i class="ri-book-fill"></i>
                          <a
                            onClick={handleMyPurchasedCourse}
                            style={{
                              textDecoration: "None",
                              color: "black",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                          >
                            my courses
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Head;
