import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "reactstrap";
import { BaseUrl } from "../../../Constants/Constants";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { Textarea } from "@material-tailwind/react";
import ReviewList from "../../../Components/common/review-list/ReviewList";
// import { Textarea } from "@material-tailwind/react";

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
const PurchaseCourseDetailsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseDetail = location.state.purchaseCourseDetail;
  const course_id = courseDetail.course;
  const user = useSelector((state) => state.user.userInfo);
  console.log(courseDetail);
  const [open, setOpen] = useState(false);
  const [courseVideo, setCourseVideo] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState([]);
  const [liked, setLiked] = useState([]);
  const [reported, setReported] = useState([]);
  const [videoId, setVideoId] = useState(0);
  const [report, setReport] = useState("");
  const [ManagePage, setManagePage] = useState(false);
  const [courseReview, setCourseReview] = useState([]);
  const handleOpen = (event) => {
    setVideoId(event);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const openModal = (info) => {
    setSelectedVideo(info.video);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVideo([]);
    setIsModalOpen(false);
  };
  const handleVideoShow = (event) => {
    navigate("video-show/", {
      state: { videoDEtails: event },
    });
  };
  const handleVideoLikes = async (event) => {
    const apiUrl = `${BaseUrl}course/course_video_like/`;
    const data = {
      userId: user.user_id,
      videoId: event,
    };
    try {
      const response = await axios.post(apiUrl, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsLiked(response.data.info);
        setManagePage(true);
      }
    } catch (err) {
      console.error(err, "video likes error");
    }
  };
  const handleReportSubmit = async (e, event) => {
    handleClose();
    e.preventDefault();
    const apiUrl = `${BaseUrl}course/video_report/`;
    const data = {
      user: user.user_id,
      video: event,
      text: report,
    };

    try {
      const response = axios.post(apiUrl, data);
      if ((await response).status === 201) {
        setVideoId(0);
        setReport("");
        setManagePage(true);
        toast.success("your report is submitted ");
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err, "report error");
      toast.error("error during submitting report");
    }
  };
  useEffect(() => {
    setManagePage(false);
    const fetchCourseVideo = () => {
      const apiUrl = `${BaseUrl}student/courseDetailsBeforePurchase/${course_id}/`;
      axios.get(apiUrl).then((response) => {
        console.log(response.data, "video details");
        setCourseVideo(response.data);
      });
      const videoLikeUrl = `${BaseUrl}course/video_like_list/${user.user_id}/`;
      axios
        .get(videoLikeUrl)
        .then((res) => {
          setLiked(res.data);
        })
        .catch((err) => {
          console.error(err, "error in like list");
        });
    };
    fetchCourseVideo();
    const reportListUrl = `${BaseUrl}course/video_report_list/${user.user_id}/`;
    axios
      .get(reportListUrl)
      .then((res) => {
        setReported(res.data);
      })
      .catch((err) => {
        console.error(err, "error in report list");
      });
    const CourseReviewListUrl = `${BaseUrl}course/course_review_list/${courseDetail.course}/`;
    axios
      .get(CourseReviewListUrl)
      .then((res) => {
        console.log(res.data, "----------------------->>>");
        setCourseReview(res.data);
      })
      .catch((err) => {
        console.error(err, "Error in Course reviewList");
      });
  }, [ManagePage]);

  const checkLiked = (id) => {
    const checked = liked.find((obj) => obj.video === id);
    return checked ? (
      <i className="ri-thumb-up-fill cursor-pointer"></i>
    ) : (
      <i className="ri-thumb-up-line cursor-pointer"></i>
    );
  };
  const checkReported = (id) => {
    const checked = reported.find((obj) => obj.video === id);
    return checked ? (
      ""
    ) : (
      <i className="ri-alarm-warning-line cursor-pointer"></i>
    );
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="about__img">
                <img
                  src={courseDetail.course_details.image}
                  alt=""
                  className="w-100"
                />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="about__content">
                <h2>{courseDetail.course_details.course_name}</h2>
                <p>{courseDetail.course_details.description}</p>
                <h3 className="text-black">
                  {courseDetail.course_details.price}
                </h3>

                <div className="about__counter">
                  <div className="flex gap-40 align-items-center">
                    <div className="single__counter">
                      <p className="counter__title text-black ">
                        <i className="ri-movie-fill"></i>{" "}
                        {courseDetail.course_details.video_count} Videos
                      </p>
                    </div>

                    <div className="single__counter text-black">
                      <p className="d-flex align-items-center gap-1 text-black">
                        <i class="ri-star-fill ml-16"></i>{" "}
                        {courseDetail.course_details.average_rating}K
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-40 align-items-center">
                    <div className="single__counter">
                      <p className="counter__title text-black ">
                        <i className="ri-presentation-fill"></i>{" "}
                        {
                          courseDetail.course_details.tutor_profile
                            .tutor_details.username
                        }
                      </p>
                    </div>

                    <div className="single__counter text-black">
                      <p className="d-flex align-items-center gap-1 text-black ml-[4.5rem]">
                        <i class="ri-thumb-up-fill"></i>{" "}
                        {courseDetail.course_details.likes}
                      </p>
                    </div>
                  </div>
                  {/* <Button
                    className="btn"
                    onClick={() => handlePurchaseCourse(course.id)}
                  >
                    Purchase Course
                  </Button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5"></Col>

            <>
              <div className="flex justify-center">
                {courseVideo && courseVideo.length !== 0 && (
                  <div className="flex flex-col w-[88%] h-[30rem] mb-20 gap-2 p-2 border rounded-md overflow-y-auto">
                    <h2 className="text-center mb-4 text-xl font-bold text-black">
                      Course Videos
                    </h2>
                    {courseVideo.map((video_details, index) => (
                      <div className="flex gap-16 p-2 border rounded-md h-52">
                        <div key={index} className="relative cursor-pointer">
                          <img
                            className="h-full w-96"
                            src={video_details.thumbnail_image}
                            alt="demo image"
                            onClick={() => handleVideoShow(video_details)}
                          />
                          <FontAwesomeIcon
                            className="absolute text-black bg-white  top-[40%] left-[40%] w-10 h-10 cursor-pointer"
                            style={{ borderRadius: "50%" }}
                            icon={faPlay}
                            onClick={() => openModal(video_details)}
                          />
                        </div>
                        <div className="w-4/5 bg-white">
                          <h4
                            className="text-black"
                            style={{ fontWeight: "bold", fontSize: "30px" }}
                          >
                            {video_details.video_title}
                          </h4>
                          <p
                            className="text-black"
                            style={{ fontWeight: "bolder" }}
                          >
                            {video_details.video_description}
                          </p>
                          <div className="flex p-2 text-2xl flex-row justify-between">
                            <div className="flex" gap-6>
                              <i
                                // className={
                                //   liked.video === video_details.id
                                //     ? `ri-thumb-up-fill cursor-pointer`
                                //     : `ri-thumb-up-line cursor-pointer`
                                // }
                                onClick={() =>
                                  handleVideoLikes(video_details.id)
                                }
                                title="like"
                              >
                                {checkLiked(video_details.id)}
                              </i>
                              {/* <i
                                className="ri-thumb-up-line text-2xl cursor-pointer"
                                onClick={() =>
                                  handleVideoLikes(video_details.id)
                                }
                                title="like"
                              ></i> */}
                            </div>
                            <i
                              onClick={() => handleOpen(video_details.id)}
                              title="report"
                            >
                              {checkReported(video_details.id)}
                            </i>
                            {/* <i
                              className="ri-alarm-warning-line cursor-pointer"
                              onClick={() => handleOpen(video_details)}
                              title="report"
                            ></i> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isModalOpen && selectedVideo && (
                <div className="fixed top-0 left-0 w-full h-full  bg-opacity-75 flex items-center justify-center backdrop-filter backdrop-blur-md">
                  <div className="relative w-3/4 h-3/4 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="absolute top-4 right-4 text-black cursor-pointer text-2xl"
                      onClick={closeModal}
                    />

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
          </Row>
        </Container>
        {courseReview && courseReview.length !== 0 && (
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="fw-bold">Course Reviews</h2>
              </Col>
            </Row>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <div>
                  <ReviewList courseId={courseDetail.course} />
                </div>
              </Col>
            </Row>
          </Container>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tell us why you Report !!
            </Typography>
            <Form
              className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
              encType="multipart/form-data"
              onSubmit={(e) => handleReportSubmit(e, videoId)}
            >
              {/* <StarRating
                rating={rating}
                onRatingChange={(newRating) => setNewRating(newRating)}
              /> */}
              <Textarea
                placeholder="Enter Your Reason"
                name="review"
                value={report}
                onChange={(e) => setReport(e.target.value)}
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
      </section>
    </>
  );
};

export default PurchaseCourseDetailsView;
