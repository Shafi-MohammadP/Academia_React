import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-tailwind/react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useEffect, useState } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Loader } from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setNotifications } from "../../../redux/User";
const NotificationManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [notification, setNotification] = useState([]);
  const [change, setChange] = useState(false);
  const notificationData = location.state && location.state.notificationData;
  useEffect(() => {
    const apiUrl = `${BaseUrl}notifications/notification/`;
    axios.get(apiUrl).then((res) => {
      setNotification(res.data);
      dispatch(setNotifications(res.data));
    });
  }, [change]);
  if (notificationData.length === 0) {
    return <Loader />;
  }
  const handleApproval = async (value) => {
    console.log(value, "id");
    const apiUrl = `${BaseUrl}notifications/notification_read/${value}/`;
    const response = axios.patch(apiUrl);
    if ((await response).status === 200) {
      toast.success((await response).data.message);
      setChange(!change);
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Notification Details</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Read Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notification.map((value, key) => (
              <TableRow
                // key={value.tutor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.text}
                </TableCell>
                {/* <Button onClick={handleOpen}>View</Button> */}
                {/* <TableCell>
                  <img
                    className="cursor-pointer"
                    src={value.certificate}
                    style={{ width: "100px", height: "100px" }}
                    alt="certificate"
                    onClick={() => handleOpen(value.certificate)}
                  />
                </TableCell> */}
                <TableCell></TableCell>
                {value.is_read ? (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      True
                    </span>
                  </TableCell>
                ) : (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      False
                    </span>
                  </TableCell>
                )}

                <TableCell align="right"></TableCell>
                <TableCell>
                  {value.is_approved ? (
                    <Button
                      className="bg-red-900"
                      onClick={() => handleApproval(value.id)}
                    >
                      Disapprove
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-900"
                      onClick={() => handleApproval(value.id)}
                    >
                      Read
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <img
            src={certificateData.certificate}
            alt={"lotta"}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Box>
      </Modal> */}
    </>
  );
};

export default NotificationManagement;
