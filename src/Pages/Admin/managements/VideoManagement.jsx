import React from "react";
import { useEffect, useState } from "react";
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
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { ApplicationConfig } from "../../../Constants/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const VideoManagement = () => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [change, setChange] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (video) => {
    console.log(video, "working");
    setSelectedVideo(video);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleApproval = async (id) => {
    const apiUrl = `${BaseUrl}dashboard/videoApproval/${id}/`;
    try {
      const response = await axios.patch(apiUrl, {}, ApplicationConfig);
      if (response.status === 200) {
        setChange(!change);
        toast.success("Video Status Updated successfully");
      } else {
        toast.error("Error During Video Updation");
      }
    } catch (err) {
      console.error(err, "Error during video blocking");
    }
  };
  useEffect(() => {
    const apiUrl = `${BaseUrl}dashboard/videoList/`;
    try {
      axios.get(apiUrl).then((response) => {
        setVideoDetails(response.data);
        console.log(response.data, "response");
      });
    } catch (err) {
      console.error("Error during useEffect", err);
    }
  }, [change]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Teacher Name</TableCell>
              <TableCell align="left">Video Name</TableCell>
              <TableCell align="left">Course Name</TableCell>
              {/* <TableCell align="right"></TableCell> */}
              <TableCell align="left">Video</TableCell>
              <TableCell align="left">Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoDetails.map((value, key) => (
              <TableRow
                // key={value.tutor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.course_details.tutor_profile.tutor_details.username}
                </TableCell>
                <TableCell>{value.video_title}</TableCell>
                <TableCell>{value.course_details.course_name}</TableCell>
                {/* <Button onClick={handleOpen}>View</Button> */}
                <TableCell>
                  <img
                    className="cursor-pointer"
                    src={value.thumbnail_image}
                    style={{ width: "100px", height: "100px" }}
                    alt="certificate"
                    onClick={() => openModal(value.video)}
                  />
                </TableCell>

                {value.is_approved ? (
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
                  {value.is_approved ? (
                    <Button
                      className="bg-red-900"
                      onClick={() => handleApproval(value.id)}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-900"
                      onClick={() => handleApproval(value.id)}
                    >
                      unBlock
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && selectedVideo && (
        <div className="fixed top-0 left-0 w-full h-full  bg-opacity-75 flex items-center justify-center backdrop-filter backdrop-blur-md">
          <div className="relative w-3/4 h-3/4 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute top-4 right-4 text-black cursor-pointer text-2xl"
              onClick={closeModal}
            />
            {/* Add your video player component here */}
            <iframe
              title="video"
              width="40%"
              height="50%"
              src={selectedVideo}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoManagement;
