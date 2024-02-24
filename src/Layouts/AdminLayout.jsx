import React from "react";
import { MultiLevelSidebar } from "../Components/admin/Adminsidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Head from "../Components/header/Head";
import { Card, Typography } from "@material-tailwind/react";
import { BellIcon } from "@heroicons/react/24/solid";
import { BiBell } from "react-icons/bi";

import { useEffect, useState } from "react";
import { BaseUrl } from "../Constants/Constants";
import axios from "axios";
import { Loader } from "../Components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../redux/User";
// import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { notifications } = useSelector((state) => state.user);
  const [certificate, setCertificate] = useState([]);
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const apiUrl = `${BaseUrl}notifications/notification/`;
    axios.get(apiUrl).then((res) => {
      setNotification(res.data);
    });
  }, [notifications]);

  const handleClick = () => {
    console.log("something");
    navigate("/admin/notification_management/", {
      state: { notificationData: notification },
    });
  };
  return (
    <>
      <div className=" overflow-hidden ">
        <div className="flex h-screen overflow-hidden">
          <MultiLevelSidebar />
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-auto">
            <div className="w-full p-4 shadow-md bg-white">
              <div className="flex items-center justify-between">
                {" "}
                <Typography variant="h5" color="blue-gray">
                  <span className="text-green-900">ACADEMIA</span>
                </Typography>
                <div className="relative">
                  {notification.length > 0 ? (
                    <>
                      <BiBell
                        className="h-8 w-8 text-blue-gray cursor-pointer"
                        onClick={handleClick}
                      />
                      <span className="absolute top-0 -right-[1px] h-4 w-4 inline-block bg-red-500 text-center text-white rounded-full text-xs">
                        {notification.length}
                      </span>
                    </>
                  ) : (
                    <BiBell className="h-8 w-8 text-blue-gray cursor-pointer" />
                  )}
                </div>
              </div>
              <hr />
            </div>
            <div className={`transition-margin duration-300 `}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
