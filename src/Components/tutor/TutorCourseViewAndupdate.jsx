import React from "react";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../Constants/Constants";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { Button } from "@material-tailwind/react";
import { config } from "../../Constants/Constants";
import {
  Dialog,
  Card,
  CardContent,
  CardActions,
  // Button,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPen,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import toast from "react-hot-toast";
import { Container } from "reactstrap";
import ReviewList from "../common/review-list/ReviewList";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "100vh", // Set a maximum height for the modal
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const TutorCoursesView = () => {
  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });
  const location = useLocation();
  const course = location.state.course;
  console.log(course, "tutor course");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetailView] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [change, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState([]);
  const handleIsModalOpen = (video) => {
    console.log(video, "video");
    setPlayVideo(video);
    setIsModalOpen(true);
  };
  const handleIsModalClose = () => {
    setPlayVideo([]);
    setIsModalOpen(false);
  };
  const [courseInfo, setCourseInfo] = useState({
    id: null,
    course_name: "",
    description: "",
    image: "",
    price: "",
  });
  const [videoInfo, setVideoInfo] = useState({
    id: null,
    video_title: "",
    video_description: "",
    thumbnail_image: "",
    video: "",
    is_free: false,
  });

  const { id } = course.id;
  // modal states
  const [open, setOpen] = useState(false);
  const [videOpen, setVideoOpen] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const fileInputProfileRef = useRef(null);
  const [imageChange, setImageChange] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [title, setTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [free, setFree] = useState(false);

  let imageAddFile = null;

  const handleProfileImage = () => {
    fileInputProfileRef.current.click();
  };

  const handleOpenModal = (courseData) => {
    setCourseInfo({
      id: courseData.id,
      course_name: courseData.course_name,
      description: courseData.description,
      image: courseData.image,
      price: courseData.price,
    });
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(!open);
  };

  const handleFileChange = (event) => {
    imageAddFile = event.target.files[0];

    setImageChange(imageAddFile);
    setSelectedFile(imageAddFile);
  };
  const handleSubmit = async (value) => {
    console.log(value);
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    const apiUrl = `${BaseUrl}course/updateCourse/${tutor.id}/${value}/`;
    handleCloseModal();
    const editCourse = new FormData();
    if (imageChange.length !== 0) {
      editCourse.append("image", imageChange);
    }
    editCourse.append(
      "course_name",
      courseName ? courseName : courseDetails.course_name
    );
    editCourse.append(
      "description",
      description ? description : courseDetails.description
    );
    editCourse.append("price", price ? price : courseDetails.price);
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: editCourse,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData, "Update successful");
        if (responseData.status === 200) {
          toast.success(responseData.message);
          setChange(!change);
        } else {
          toast.error(responseData.message);
        }
      } else {
        console.error(`Error during update: ${response.status}`);
      }
    } catch (err) {
      console.error(err, "Error found during update");
    }
  };
  /// Video adding functions
  const handleOpen = () => {
    setVideoOpen(!videOpen);
  };
  const handleClose = () => {
    setVideoOpen(!videOpen);
  };
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
    console.log(file, "video");
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file, "image");
  };
  const handleCheckboxChange = (event) => {
    setFree(event.target.checked);
  };
  const handleVideoAddingSubmit = async () => {
    handleClose();
    setLoading(true);
    const apiUrl = `${BaseUrl}course/videoAdding/${course.id}/`;
    const videoFormValidations = {
      video_title: title,
      video_description: videoDescription,
    };
    const isValid = Object.values(videoFormValidations).every(
      (value) => value !== null && value.trim() !== ""
    );
    if (!isValid) {
      toast.error("Field cannot be empty");
      setLoading(false);
      return;
    }
    console.log(selectedImage);
    console.log(selectedVideo);
    if (selectedImage.length <= 0) {
      toast.error(
        `Image file is empty or not selected ${selectedImage.length}`
      );
      setLoading(false);
      return;
    }
    if (selectedVideo.length <= 0) {
      toast.error("Video file is empty or not selected.");
      setLoading(false);
      return;
    }
    const videoForm = new FormData();
    videoForm.append("course_id", course.id);
    videoForm.append("video_title", title);
    videoForm.append("video_description", videoDescription);
    videoForm.append("thumbnail_image", selectedImage);
    videoForm.append("video", selectedVideo);
    if (free) {
      videoForm.append("is_free_of_charge", free);
    }
    for (const [key, value] of videoForm.entries()) {
      console.log(`${key}: ${value}`);
    }
    try {
      const response = await axios.post(apiUrl, videoForm, config);
      console.log(
        response.data,
        "responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      );
      if (response.data.status === 201) {
        setTitle("");
        setVideoDescription("");
        setSelectedImage([]);
        setSelectedVideo([]);
        if (free) {
          setFree(false);
        }
        setChange(!change);
        console.log(response.data.message, "message");
        toast.success(response.data.message);
      } else if (response.data.status === 404) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err, "error during video adding");
    } finally {
      setLoading(false);
    }
  };
  // video Edit Functions
  const handleOpenModalEdit = (video_info) => {
    setVideoInfo({
      id: video_info.id,
      video_title: video_info.video_title,
      video_description: video_info.video_description,
      thumbnail_image: video_info.thumbnail_image,
      video: video_info.video,
    });
    setEditVideo(!editVideo);
  };
  const handleCloseModalEdit = () => {
    setEditVideo(!editVideo);
  };

  const handleVideoEditSubmit = async () => {
    handleCloseModalEdit();
    setLoading(true);
    console.log(videoInfo.id, "id comingggggggggggg");
    const videoApiUrl = `${BaseUrl}tutor/course_video/${videoInfo.id}/`;
    const EditVideoForm = new FormData();
    EditVideoForm.append("video_id", course.id || videoInfo.id);
    EditVideoForm.append("video_title", title || videoInfo.video_title);
    EditVideoForm.append(
      "video_description",
      videoDescription || videoInfo.video_description
    );

    if (selectedImage.length !== 0) {
      EditVideoForm.append("thumbnail_image", selectedImage);
    }

    if (selectedVideo.length !== 0) {
      EditVideoForm.append("video", selectedVideo);
    }

    if (free) {
      EditVideoForm.append("is_free_of_charge", free);
    }

    for (const [key, value] of EditVideoForm.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.patch(videoApiUrl, EditVideoForm, config);
      if (response.status === 200) {
        setTitle("");
        setVideoDescription("");
        setSelectedImage([]);
        setSelectedVideo([]);
        if (free) {
          setFree(false);
        }
        setChange(!change);
        console.log(response.data.message, "message");
        toast.success(response.data.message);
      }
    } catch (err) {
      console.error(err, "error in editing");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const courseApiUrl = `${BaseUrl}course/courseDetailview/${course.id}/`;
    const videoApiUrl = `${BaseUrl}tutor/course_video/${course.id}/`;
    try {
      axios.get(courseApiUrl).then((res) => {
        setCourseDetailView(res.data);
      });
    } catch (err) {
      console.log(err, "error Found");
    }
    try {
      axios.get(videoApiUrl, config).then((res) => {
        if (res.status === 200) {
          setVideoDetails(res.data.data);
        }
      });
    } catch (err) {
      console.error("error during fetching video");
    }
  }, [change]);
  const handleVideoShow = (event) => {
    console.log(event);
    navigate("tutor_video_show/", {
      state: { videoDetails: event },
    });
  };
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
  return (
    <>
      {loading && <Loader />}
      <div>
        <h1 className="flex text-center justify-center">Course Details View</h1>
      </div>

      {courseDetails ? (
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
          {/* image gallery */}

          <div className="container mx-auto px-4">
            {/* Your image gallery code
             */}
            <img
              src={courseDetails.image}
              alt="card-image"
              className="w-full h-100 object-cover"
            />
            {/* <Button className='flex align-middle w-45 h-24' color="green">Chat</Button> */}
          </div>

          {/* description */}
          <div className="mx-auto px-5 lg:px-5">
            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
              Course Name : {courseDetails.course_name}
            </h2>
            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
              Course Description : {courseDetails.description}
            </h2>

            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
              Price : ₹ {courseDetails.price}
            </h2>

            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
              {/* Location : {employeeData.place} */}
            </h2>
            <h2 className="pt-3 text-2xl font-bold lg:pt-0">
              {/* Experience : {employeeData.experience} year */}
            </h2>
            <p className="pt-3 text-xs font-bold lg:pt-0">
              {/* Description : {employeeData.description}  */}
            </p>
            <div className="flex justify-between">
              <Button
                className="bg-green-900"
                onClick={() => handleOpenModal(courseDetails)}
              >
                Edit Course
              </Button>
              <Button className="bg-blue-900" onClick={handleOpen}>
                Add Course Video
              </Button>
            </div>
            {/* <AvailableDates  empId={employeeData.id} empdetails={employeeData.charge}/> */}
          </div>
        </section>
      ) : (
        <Loader />
      )}

      <>
        <div className="flex justify-center">
          {videoDetails && videoDetails.length !== 0 && (
            <div className="flex flex-col w-[88%] h-[30rem] mb-20 gap-2 p-2 border rounded-md overflow-y-auto">
              <h2 className="text-center mb-4 text-xl font-bold text-black">
                Course Videos
              </h2>
              {videoDetails.map((video_details, index) => (
                <div className="flex gap-16 p-2 border rounded-md h-52">
                  <div
                    key={index}
                    className="relative "
                    onClick={() => handleVideoShow(video_details)}
                  >
                    <img
                      className="h-full w-96"
                      src={video_details.thumbnail_image}
                      alt="demo image"
                    />
                    <FontAwesomeIcon
                      className="absolute text-black bg-yellow-200   top-[40%] left-[40%] w-10 h-10 cursor-pointer"
                      icon={faPlay}
                      onClick={() => handleIsModalOpen(video_details.video)}
                    />
                  </div>
                  <div className="w-4/5 bg-white">
                    <h4
                      className="text-black"
                      style={{ fontWeight: "bold", fontSize: "30px" }}
                    >
                      {video_details.video_title}
                    </h4>
                    <p className="text-black" style={{ fontWeight: "bolder" }}>
                      {video_details.video_description}
                    </p>
                    {video_details.is_free_of_charge ? (
                      <p className="text-black" style={{ fontWeight: "bold" }}>
                        Free of Cost
                      </p>
                    ) : (
                      <p className="text-black">Paid</p>
                    )}
                  </div>
                  <FontAwesomeIcon
                    onClick={() => handleOpenModalEdit(video_details)}
                    className="cursor-pointer"
                    title="edit video details"
                    icon={faPen}
                  ></FontAwesomeIcon>
                </div>
              ))}
            </div>
          )}
        </div>
        {isModalOpen && playVideo && (
          <div className="fixed top-0 left-0 w-full h-full   bg-opacity-75 flex items-center justify-center backdrop-filter backdrop-blur-md">
            <div className="relative w-3/4 h-3/4 flex justify-center items-center">
              <FontAwesomeIcon
                icon={faTimes}
                className="absolute top-4 right-4 text-black cursor-pointer text-2xl"
                onClick={handleIsModalClose}
              />
              {/* Add your video player component here */}
              <iframe
                title="video"
                width="40%"
                height="50%"
                src={playVideo}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </>

      <Dialog
        open={open}
        handler={handleOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <Card>
          <CardContent className="flex flex-wrap gap-8">
            <Typography variant="h4" color="primary">
              Edit Course
            </Typography>
            <div className="w-full flex justify-center">
              <div className="relative">
                {selectedFile ? (
                  // Display the selected image if a file is selected
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    alt="selected-image"
                  />
                ) : (
                  // Display the user's profile photo if no file is selected
                  <div className="relative">
                    <img
                      src={courseInfo.image}
                      style={{ width: "100px", height: "100px" }}
                      alt="profile-image"
                    />
                  </div>
                )}
                <FontAwesomeIcon
                  icon={faCamera}
                  className="absolute text-black-900 bottom-0 right-0 bg-white w-full h-4 cursor-pointer"
                  onClick={handleProfileImage}
                />
              </div>
            </div>
            <>
              {showModal && (
                // Your modal component or file input goes here
                // Example using a simple file input:
                <div className="flex justify-between w-full px-10">
                  <input type="file" onChange={handleFileChange} />

                  <button onClick={closeModal}>
                    {/* <FontAwesomeIcon icon={faClose} /> */}
                    <IoCloseCircleSharp size={26} />
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputProfileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </>
            <TextField
              label={courseInfo.course_name}
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              name="name"
              fullWidth
            />

            <TextField
              label={courseInfo.description}
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
            <TextField
              label={courseInfo.price}
              type="number"
              name="description"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </CardContent>

          <CardActions>
            {/* <Button onClick={handleCloseModal} fullWidth>
              Cancel
            </Button> */}
            <Button fullWidth onClick={() => handleSubmit(courseInfo.id)}>
              submit
            </Button>
          </CardActions>
        </Card>
      </Dialog>
      <Container>
        <div className="flex justify-center items-center">
          <h3> Course Reviews</h3>
        </div>
        <ReviewList courseId={course.id} />
      </Container>
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={videOpen}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={videOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Add Video
              </Typography>
              <TextField
                label="Video Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Video Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
              <label htmlFor="">Thumbnail Image</label>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleImageChange}
                inputProps={{ accept: "image/*" }}
              />
              <label htmlFor="">Upload Video</label>

              <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleVideoChange}
                inputProps={{ accept: "video/*" }}
              />
              <FormControlLabel
                control={
                  <Checkbox checked={free} onChange={handleCheckboxChange} />
                }
                label="Free"
              />
              <Button
                variant="contained"
                onClick={handleVideoAddingSubmit}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          </Fade>
        </Modal>
      </>
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editVideo}
          onClose={handleCloseModalEdit}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={editVideo}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Add Video
              </Typography>
              <TextField
                label={videoInfo.video_title}
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label={videoInfo.video_description}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
              />
              <label htmlFor="">Thumbnail Image</label>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleImageChange}
                inputProps={{ accept: "image/*" }}
              />

              {selectedImage.length !== 0 ? (
                <>
                  <div>
                    <p>Selected Image:</p>
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Image"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p>Image Preview:</p>
                    <img
                      src={videoInfo.thumbnail_image}
                      alt="Selected Image"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </>
              )}
              <label htmlFor="">Upload Video</label>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleVideoChange}
                inputProps={{ accept: "video/*" }}
              />

              {/* {selectedVideo.length !== 0 ? (
                <>
                  <div>
                    <p>Selected Video:</p>
                    <video
                      id="videoPreview"
                      controls
                      style={{ maxWidth: "100%" }}
                    >
                      <source
                        src={URL.createObjectURL(selectedVideo)}
                        type={selectedVideo.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p>Video Preview:</p>
                    <video
                      id="videoPreview"
                      controls
                      style={{ maxWidth: "50%" }}
                    >
                      <source src={videoInfo.video} type={selectedVideo.type} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </>
              )} */}

              <FormControlLabel
                control={
                  <Checkbox checked={free} onChange={handleCheckboxChange} />
                }
                label="Free"
              />
              <Button
                variant="contained"
                onClick={handleVideoEditSubmit}
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          </Fade>
        </Modal>
      </>
    </>
  );
};

export default TutorCoursesView;
