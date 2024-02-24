import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TutorRoutes from "../TutorRoutes/TutorRoutes";
import StudentRoutes from "../StudentRoutes/StudentRoutes";
import CommonLogin from "../../Components/common/commonLogin";
import { useEffect } from "react";
function Adminprotected() {
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/adminnotification/");

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
  if (token) {
    const decodeToken = jwtDecode(token);
    if (decodeToken.is_admin) {
      return <Outlet />;
    } else {
      if (decodeToken.role === "tutor") {
        return <TutorRoutes />;
      } else {
        return <StudentRoutes />;
      }
    }
  } else {
    return <Navigate to={"/login"} replace />;
  }
}

export default Adminprotected;
