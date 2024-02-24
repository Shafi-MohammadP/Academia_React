// Import necessary components from @mui/material
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Constants/Constants";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { Loader } from "../../../Components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const CustomWarningToast = ({ message, icon, closeToast }) => (
  <div className="custom-warning-toast">
    <FontAwesomeIcon
      className="text-yellow-900"
      style={{ fontWeight: "bold", fontSize: "30px" }}
      icon={icon}
    />
    <p className="text-black">{message}</p>
    <button className="custom-warning-close" onClick={closeToast}></button>
  </div>
);
const ApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageChange, setImageChange] = useState([]);
  const [categories, setCategories] = useState([]);

  let imageAddFile = null;
  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:8000/ws/adminnotification/");

  //   socket.onopen = (event) => {
  //     console.log("WebSocket connection opened:", event);
  //   };

  //   socket.onmessage = (event) => {
  //     console.log("WebSocket message received:", event);

  //     // Parse the message data if needed
  //     const messageData = JSON.parse(event.data);
  //     console.log(messageData, "message data");
  //     // Show a notification
  //     showNotification(messageData.message);
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = (event) => {
  //     console.log("WebSocket connection closed:", event);
  //   };

  //   // Function to show a notification
  //   const showNotification = (message) => {
  //     if ("Notification" in window) {
  //       console.log(message, "message---------------------->>>>>");
  //       const currentPermission = Notification.permission;

  //       if (currentPermission === "granted") {
  //         console.log(message, "message---------------------->>>>>");

  //         // Permission already granted, create a notification
  //         new Notification("New Message", {
  //           body: message,
  //         });
  //       } else if (currentPermission !== "denied") {
  //         // Permission not granted or denied, request it
  //         Notification.requestPermission().then((permission) => {
  //           console.log(message, "message---------------------->>>>>");

  //           if (permission === "granted") {
  //             // Permission granted, create a notification
  //             new Notification("New Message", {
  //               body: message,
  //             });
  //           }
  //         });
  //       }
  //     }
  //   };

  //   // Clean up the WebSocket connection on component unmount
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  useEffect(() => {
    axios.get(`${BaseUrl}dashboard/categoriesList/`).then((res) => {
      setCategories(res.data);
      // console.log(categories, "categories");
    });
  }, []);
  // console.log(categories, "categories");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = `${BaseUrl}course/courseAdding/${tutor.id}/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    const courseFormValidations = {
      courseName: courseName,
      description: description,
      price: price,
      category: selectedCategory,
    };
    const isValid = Object.values(courseFormValidations).every(
      (value) => value !== null && value.trim() !== ""
    );

    if (!isValid) {
      const warningMessage = "fields cannot be empty";
      toast(
        <CustomWarningToast
          message={warningMessage}
          icon={faExclamationTriangle}
        />,
        {
          // Additional options for the toast.error function
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setLoading(false);
      return;
    }
    if (imageChange.length <= 0) {
      const warningMessage = "image cannot be empty";

      toast(
        <CustomWarningToast
          message={warningMessage}
          icon={faExclamationTriangle}
        />,
        {
          // Additional options for the toast.error function
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      setLoading(false);
      return;
    }
    const Course = new FormData();
    if (imageChange) {
      Course.append("image", imageChange);
    }
    Course.append("course_name", courseName);
    Course.append("description", description);
    Course.append("price", price);
    Course.append("category", selectedCategory);
    Course.append("tutor_id", tutor.id);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: Course,
      });
      if (!response.ok) {
        console.error(`Server error: ${response.status}`);
        const errorMessage = await response.text();
        console.error(`Error message: ${errorMessage}`);
        return;
      }
      const responseData = await response.json();
      if (responseData.status === 200) {
        toast.success(responseData.message);
        navigate("/tutor/");
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err, "Error from Application form");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    imageAddFile = e.target.files[0];
    setImageChange(imageAddFile);
    // setImageChange(imageAddFile);
    // setSelectedFile(imageAddFile);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="w-screen flex justify-center pt-10 bg-gray-50">
        <div className="w-2/4">
          <h1>Add Course</h1>
        </div>
      </div>
      <div className="w-screen min-h-screen flex justify-center px-2  bg-gray-50">
        <div className="md:w-2/4 py-5 px-10 bg-white rounded-md border shadow-lg  h-fit">
          <form onSubmit={handleSubmit}>
            {/* <div className="md:flex gap-4">
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </div> */}
            <div>
              <label>Categories:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <TextField
              label="Course Name"
              variant="outlined"
              name="coursename"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              variant="outlined"
              name="qualification"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              // label="Address"
              variant="outlined"
              type="file"
              // value={for}
              onChange={handleFileChange}
              fullWidth
              margin="normal"
            />
            {/* <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            /> */}
            <TextField
              label="Price"
              variant="outlined"
              name="experience"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
