import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import TutorLayout from "../../Layouts/TutorLayout";
import TutorHome from "../../Pages/Tutor/Home/TutorHome";

import Tutorprotected from "../protectedRoutes/Tutorprotected";
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
import TeacherProfile from "../../Pages/Tutor/Profile/TeacherProfile";

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
    const tutorSocket = new WebSocket(
      "wss://academiabackend.molla.cloud/ws/tutor_notifications/"
    );

    tutorSocket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };

    tutorSocket.onmessage = (event) => {
      console.log("WebSocket message received:", event);

      // Parse the message data if needed
      const messageData = JSON.parse(event.data);
      console.log(messageData, "message data");

      showNotification(messageData.message);
    };

    tutorSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    tutorSocket.onclose = (event) => {
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
      tutorSocket.close();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Tutorprotected />}>
          <Route path="/" element={<TutorLayout />}>
            <Route index element={<TutorHome />} />
            <Route path="/my-courses/*" element={<TutorCourses />} />
            <Route path="tutorprofile" element={<TeacherProfile />} />
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
