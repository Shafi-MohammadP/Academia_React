import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TutorLayout from "../../Layouts/TutorLayout";
import TutorHome from "../../Pages/Tutor/Home/TutorHome";

import Tutorprotected from "../protectedRoutes/Tutorprotected";
import TutorProfile from "../../Pages/Tutor/Profile/tutorProfile";
import ApplicationForm from "../../Pages/Tutor/application form/ApplicationForm";
import { useEffect } from "react";
import { BaseUrl } from "../../Constants/Constants";
import { useSelector } from "react-redux";
import axios from "axios";
import TutorCoursesView from "../../Components/tutor/TutorCourseViewAndupdate";
import TutorCourses from "../../Pages/Tutor/my-courses/TutorCourses";
import AboutUs from "../../Components/common/about-us/AboutUs";
import CourseDetailView from "../../Pages/Student/course-detail-view/CourseDetailView";
import TutorVideoShow from "../../Components/tutor/tutor_video_show/TutorVideoShow";

const TutorRoutes = () => {
  const [user, setUser] = useState([]);
  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });
  useEffect(() => {
    if (!tutor) return;
    axios.get(`${BaseUrl}user/tutorProfile/${tutor.user_id}`).then((res) => {
      setUser(res.data);
    });
  }, []);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/tutor_notifications/");

    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event);

      // Parse the message data if needed
      const messageData = JSON.parse(event.data);
      console.log(messageData, "message data");

      showNotification(messageData.message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Function to show a notification
    const showNotification = (message) => {
      if ("Notification" in window) {
        console.log(message, "message---------------------->>>>>");
        const currentPermission = Notification.permission;

        if (currentPermission === "granted") {
          console.log(message, "message---------------------->>>>>");

          // Permission already granted, create a notification
          new Notification("New Message", {
            body: message,
          });
        } else if (currentPermission !== "denied") {
          // Permission not granted or denied, request it
          Notification.requestPermission().then((permission) => {
            console.log(message, "message---------------------->>>>>");

            if (permission === "granted") {
              // Permission granted, create a notification
              new Notification("New Message", {
                body: message,
              });
            }
          });
        }
      }
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Tutorprotected />}>
          <Route path="/" element={<TutorLayout />}>
            <Route index element={<TutorHome />} />
            <Route path="/my-courses/*" element={<TutorCourses />} />
            <Route path="tutorprofile" element={<TutorProfile />} />
            <Route path="courseView/" element={<CourseDetailView />} />

            <Route
              path="my-courses/courseUpdate/*"
              element={<TutorCoursesView />}
            />
            <Route path="applicationform/" element={<ApplicationForm />} />
            <Route path="about-us/" element={<AboutUs />} />
            <Route
              path="my-courses/courseUpdate/tutor_video_show/"
              // path="tutor_video_show/"
              element={<TutorVideoShow />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default TutorRoutes;
