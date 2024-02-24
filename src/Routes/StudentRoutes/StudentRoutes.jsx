import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import StudentLayout from "../../Layouts/StudentLayout";
import Home from "../../Pages/Student/Home/Home";
import Userprotected from "../protectedRoutes/Userprotected";
import StudentProfilePage from "../../Pages/Student/Profile/StudentProfile";
import CourseView from "../../Components/Student/CourseView";
import Head from "../../Components/header/Head";
import HeroSection from "../../Components/Hero-Section/HeroSection";
import SearchCorseList from "../../Components/Student/SearchCorseList";
import CourseDetailView from "../../Pages/Student/course-detail-view/CourseDetailView";
import AllCourses from "../../Pages/Student/all-courses/AllCourses";
import SuccessPage from "../../Pages/payment-pages/SuccessPage";
import CourseCategoryList from "../../Components/common/coursecategorybaselisting/CourseCategoryList";
import PurchaseCourse from "../../Pages/Student/purchased-course/PurchaseCourse";
import PurchaseCourseDetailsView from "../../Pages/Student/purchased-course/PurchaseCourseDetailsView";
import PurchasedCourseVideo from "../../Pages/Student/video-show/PurchasedCourseVideo";
// import { LoginPage } from "../../Pages/Student/Login/Login";
// import { SignupPage } from "../../Pages/Student/Signup/Signup";

const StudentRoutes = () => {
  useEffect(() => {
    const socket = new WebSocket(
      "ws://localhost:8000/ws/student_notifications/"
    );

    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event);

      // Parse the message data if needed
      const messageData = JSON.parse(event.data);
      console.log(messageData, "message data");

      // Show a notification
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
        <Route
          // path="payment/success?:userId&:courseId&:tutorId/"
          path="payment/success*"
          element={<SuccessPage />}
        />
        <Route path="/" element={<StudentLayout />}>
          <Route element={<Userprotected />}>
            {/* <Route index element={<HeroSection />} /> */}
            <Route index element={<Home />} />
            <Route path="studentprofile/" element={<StudentProfilePage />} />
            <Route path="purchased-course/" element={<PurchaseCourse />} />
            <Route
              path="purchased-course/course-detail-view/"
              element={<PurchaseCourseDetailsView />}
            />
            <Route path="courseView/" element={<CourseDetailView />} />
            <Route path="search-result/" element={<SearchCorseList />} />
            <Route path="all-courses/" element={<AllCourses />} />
            <Route path="courseCategory/" element={<CourseCategoryList />} />
            <Route
              path="courseCategory/courseView/"
              element={<CourseDetailView />}
            />
            <Route
              path="all-courses/courseView"
              element={<CourseDetailView />}
            />
            <Route
              path="purchased-course/course-detail-view/video-show/"
              element={<PurchasedCourseVideo />}
            />
            {/* <Route path="newDemo/" element={<Head />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default StudentRoutes;
