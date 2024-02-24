import * as React from "react";
import { BaseUrl } from "../../../Constants/Constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../../Components/Loader/Loader";
import toast from "react-hot-toast";

export default function CertificateManagement() {
  const location = useLocation();
  const notificationData = location.state && location.state.certificateData;
  const [certificateData, setCertificate] = useState([]);
  const [notification, setNotification] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [change, setChange] = useState(0);
  const handleChange = () => {
    setChange(change + 1);
    console.log(change);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios.get(`${BaseUrl}dashboard/certificateView/`).then((res) => {
      console.log(res.data, "lotta");
      setCertificate(res.data);
    });
  }, [change]);
  const handleApproval = async (id) => {
    console.log(id, "id");
    const apiUrl = `${BaseUrl}dashboard/certificateApproval/${id}/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        setChange(!change);
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err, "Error found in Certificate");
    }

    // axios
    //   .patch(`${BaseUrl}dashboard/certificateApproval/${id}/`)
    //   .then((res) => {
    //     console.log(res.data, "Approval Data");
    //     handleChange();
    //   });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher Name</TableCell>
              <TableCell align="left">Certificate</TableCell>
              <TableCell align="left">status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificateData.map((value, key) => (
              <TableRow
                // key={value.tutor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.notification_details.tutor_details.username}
                </TableCell>
                {/* <Button onClick={handleOpen}>View</Button> */}
                <TableCell>
                  <img
                    className="cursor-pointer"
                    src={value.certificate}
                    style={{ width: "100px", height: "100px" }}
                    alt="certificate"
                    onClick={() => handleOpen(value.certificate)}
                  />
                </TableCell>
                {value.is_approved ? (
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
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Certificate
          </Typography>
          <img
            src={selectedImage}
            alt="certificate"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Modal>
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
}
