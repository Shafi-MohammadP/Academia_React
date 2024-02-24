import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
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
import { Backdrop, Fade } from "@mui/material";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const CustomModal = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={onClose}
        >
          <div
            style={{
              position: "relative",
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
            x
          >
            <FontAwesomeIcon
              style={{ fontSize: "30px" }}
              className="cursor-pointer "
              icon={faClose}
              onClick={onClose}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
};
const CourseManagement = () => {
  const [course, setCourse] = useState([]);
  const [change, setChange] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  const handleOpen = (imageUrl) => {
    setClickedImage(imageUrl);
    setOpenModal(true);
  };

  const handleClose = () => {
    setClickedImage("");
    setOpenModal(false);
  };
  useEffect(() => {
    const apiUrl = `${BaseUrl}dashboard/courseList/`;

    try {
      axios.get(apiUrl).then((res) => {
        setCourse(res.data);
        console.log(res.data);
      });
    } catch (err) {
      console.log(err, "error found");
    }
  }, [change]);
  const handleApproval = (id) => {
    console.log(id, "id of course");
    const apiUrl = `${BaseUrl}dashboard/courseApproval/${id}/`;

    try {
      axios.patch(apiUrl).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setChange(!change);
          toast.success("Approved Successfully");
        } else {
          toast.error("Something Went Wrong");
        }
      });
    } catch (err) {
      console.log(err, "Error During Approval");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher Name</TableCell>
              <TableCell align="left">Corse Name</TableCell>
              <TableCell align="left">Corse Image</TableCell>
              {/* <TableCell align="right"></TableCell> */}
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.map((value, key) => (
              <TableRow
                // key={value.tutor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.tutor_profile.tutor_details.username}
                </TableCell>
                <TableCell>{value.course_name}</TableCell>
                {/* <Button onClick={handleOpen}>View</Button> */}
                <TableCell>
                  <img
                    className="cursor-pointer"
                    src={value.image}
                    style={{ width: "100px", height: "100px" }}
                    alt="certificate"
                    onClick={() => handleOpen(value.image)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {value.price}
                </TableCell>
                {value.is_available ? (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Available
                    </span>
                  </TableCell>
                ) : (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      unavailable
                    </span>
                  </TableCell>
                )}

                <TableCell align="right"></TableCell>
                <TableCell>
                  {value.is_available ? (
                    <Button
                      className="bg-red-900"
                      onClick={() => handleApproval(value.id)}
                    >
                      DisApprove
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
      {openModal && (
        <CustomModal open={openModal} onClose={handleClose}>
          <img
            src={clickedImage}
            alt="Clicked Image"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </CustomModal>
      )}
      {/* <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box>
            <img
              src={clickedImage}
              alt="Clicked Image"
              style={{ maxWidth: "100%", maxHeight: "100vh" }}
            />
          </Box>
        </Fade>
      </Modal> */}
    </>
  );
};

export default CourseManagement;
