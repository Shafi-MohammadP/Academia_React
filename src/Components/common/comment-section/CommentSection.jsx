// CommentsSection.js
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "reactstrap";
import { ApplicationConfig, BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Box, Input, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Textarea } from "@material-tailwind/react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const CommentsSection = ({ user, calculateDate, videoId }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState("");
  const [managePage, setManagePage] = useState(false);
  const [open, setOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const handleOpen = (event) => {
    setCreatedAt(event);
    console.log(event);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePostComment = async () => {
    const apiUrl = `${BaseUrl}course/video_comment/`;
    if (newComment.trim() === "") {
      toast.error("Field cannot be empty");
      return;
    }
    const data = {
      user: user.user_id,
      video: videoId,
      text: newComment,
    };
    try {
      const response = await axios.post(apiUrl, data, ApplicationConfig);
      if (response.status === 201) {
        setNewComment("");
        toast.success(response.data.message);
        console.log(newComment, "newCOmment");
        setManagePage(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleEditComment = async (e, event) => {
    e.preventDefault();
    handleClose();
    const apiUrl = `${BaseUrl}course/video_comment/`;
    const data = {
      // user: user.user_id,
      user: user.user_id,
      video: videoId,
      created_at: event,
      text: editedComment,
    };
    console.log(data);
    try {
      const response = await axios.patch(apiUrl, data);
      if (response.status === 200) {
        setEditedComment("");
        setCreatedAt("");
        toast.success(response.data.message);
        setManagePage(true);
      } else {
        toast.error("something happened");
      }
    } catch (err) {
      toast.error("something went wrong");
      console.error(err, "error in comment edit");
    }
  };
  useEffect(() => {
    setManagePage(false);
    const commentListUrl = `${BaseUrl}course/video_comment_list/${videoId}/`;
    axios
      .get(commentListUrl)
      .then((res) => {
        setComments(res.data);
        console.log(res.data, "---------");
      })
      .catch((err) => {
        console.error(err, "error in comment list");
      });
  }, [managePage]);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/comment_updation/");

    socket.onopen = (event) => {
      console.log("WebSocket connection opened in comment:", event);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received in Comment:", event);

      // Parse the message data if needed
      const messageData = JSON.parse(event.data);
      console.log(messageData, "message data in COmment");

      // showNotification(messageData.message);
      if (parseInt(messageData.message) === videoId) {
        console.log("worked");
        setManagePage(true);
      } else {
        console.log(typeof messageData.message, typeof videoId);
        return;
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error comment:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed comment:", event);
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
      <div>
        <Row className="mt-2">
          <Col md={11}>
            <Input
              value={newComment}
              placeholder="add your comment here"
              className="w-full"
              onChange={(e) => setNewComment(e.target.value)}
            ></Input>
          </Col>
          <Col md={1}>
            <Button className="w-full" onClick={() => handlePostComment()}>
              Post
            </Button>
          </Col>
        </Row>

        {/* Existing comments section */}
        {comments.length !== 0 ? (
          <>
            {comments
              .slice() // Create a copy of the array to avoid mutating the original
              .sort((a, b) => (a.user.id === user.user_id ? -1 : 1))
              .map((comment) => (
                <div
                  key={comment.id}
                  className="comment-container border p-3 mb-3 mt-2"
                >
                  <Row className="mb-2">
                    <Col md={1} className="flex items-center rounded">
                      <img
                        className="mt-1 w-16 h-16 rounded-full"
                        src={
                          comment.student_profile_photo !== null
                            ? comment.student_profile_photo
                            : comment.tutor_profile_photo
                        }
                        alt={comment.user.username}
                      />
                    </Col>
                    <Col md={11}>
                      <div className="ml-2 relative flex items-start">
                        <div>
                          <p className="mb-1 mt-3">
                            <span className="txt text-2xl font-bold">
                              {comment.user.username}
                            </span>{" "}
                            <span className="txt text-sm">
                              {calculateDate(comment.created_at)}
                            </span>
                          </p>
                          <p className="txt">{comment.text}</p>
                        </div>
                        {user.user_id === comment.user.id ? (
                          <i
                            className="ri-pencil-line absolute top-0 right-0 text-2xl"
                            onClick={() => handleOpen(comment.created_at)}
                          ></i>
                        ) : (
                          ""
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
          </>
        ) : (
          <p>No comments available.</p>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            edit comment
          </Typography>
          <Form
            className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
            encType="multipart/form-data"
            onSubmit={(e) => handleEditComment(e, createdAt)}
          >
            {/* <StarRating
                rating={rating}
                onRatingChange={(newRating) => setNewRating(newRating)}
              /> */}
            <Textarea
              placeholder="Enter Your Reason"
              name="review"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            ></Textarea>
            <button
              className="btn"
              // className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default CommentsSection;
