import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Container, Form, Row } from "reactstrap";
import Modal from "@mui/material/Modal";
import { BaseUrl, config } from "../../../Constants/Constants";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Textarea, Typography, rating } from "@material-tailwind/react";
import { Box } from "@mui/material";
import { IoCloseCircleSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import StarRating from "../../../Components/common/rating-page/StarRating";
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

const PurchaseCourse = () => {
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const [liked, setLiked] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [courseId, setCourseId] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const handleOpen = (event) => {
    setCourseId(event);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const handleView = (event) => {
    navigate("course-detail-view/", {
      state: { purchaseCourseDetail: event },
    });
  };
  const handleCourseLike = async (event) => {
    const apiUrl = `${BaseUrl}course/course_like/`;
    const data = {
      userId: user.user_id,
      courseId: event,
    };
    try {
      const response = await axios.post(apiUrl, data);
      if (response.status === 200) {
        setChange(!change);
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.detail);
      console.error(err, "like error");
    }
  };
  const checkLiked = (event) => {
    const checked = liked.find((obj) => obj.course === event);
    return checked ? (
      <i className="ri-thumb-up-fill cursor-pointer"></i>
    ) : (
      <i className="ri-thumb-up-line cursor-pointer"></i>
    );
  };
  const checkReviewed = (event) => {
    const checked = reviewList.find((obj) => obj.course === event);
    return checked ? (
      ""
    ) : (
      <button className="btn" onClick={() => handleOpen(event)}>
        Review
      </button>
    );
  };
  const handleReviewSubmit = async (event) => {
    handleClose();
    if (newRating === 0 || review === "") {
      toast.error("Field cannot be empty");
      return;
    }
    const data = {
      course: courseId,
      user: user.user_id,
      rating: newRating,
      text: review,
    };
    console.log(data, "----------------------------->>>>>");
    const apiUrl = `${BaseUrl}course/course_review/`;
    try {
      const response = await axios.post(apiUrl, data);
      if (response.status === 200) {
        setChange(!change);
        toast.success(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      console.error(err, "error during submitting review");
    }
  };
  useEffect(() => {
    const apiUrl = `${BaseUrl}student/purchased_course_details/${user.id}/`;
    const fetchPurchasedCourseDetails = () => {
      axios
        .get(apiUrl)
        .then((response) => {
          setPurchase(response.data);
        })
        .catch((err) => {
          console.error("error in PurchasedCourse", err);
        });
    };
    const courseLikeUrl = `${BaseUrl}course/course_like_list/${user.user_id}/`;
    axios.get(courseLikeUrl).then((res) => {
      setLiked(res.data);
    });
    const courseReviewListUrl = `${BaseUrl}course/user_course_review_list/${user.user_id}/`;
    axios
      .get(courseReviewListUrl)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch((err) => {
        console.error(err, "error ReviewList");
      });
    fetchPurchasedCourseDetails();
  }, [change]);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="fw-bold">Your Purchased Courses</h2>
            </Col>

            <>
              <div className="flex justify-center">
                {purchase && purchase.length !== 0 && (
                  <div className="flex flex-col w-full h-full mb-20 gap-1 p-2 border rounded-md overflow-y-auto">
                    {/* <h2 className="text-center mb-4 text-xl font-bold text-black">
                    Course Videos
                  </h2> */}
                    {purchase.map((purchased_course, index) => (
                      <div className="flex gap-16 p-2 border rounded-md">
                        {/* <div key={index} className="relative ">
                          <img
                            className="h-full w-96"
                            src={purchased_course.course_details.image}
                            alt="demo image"
                          />
                          <FontAwesomeIcon
                            className="absolute text-black bg-white  top-[40%] left-[40%] w-10 h-10 cursor-pointer"
                            style={{ borderRadius: "50%" }}
                            icon={faPlay}
                            // onClick={() => openModal(purchased_course)}
                          />
                        </div> */}
                        <Card className="w-full max-w-[26rem] max-h-[26rem] shadow-lg">
                          <CardHeader floated={false}>
                            <img
                              src={purchased_course.course_details.image}
                              alt="demo image"
                              className="w-full max-w-[26rem] max-h-[26rem]"
                            />
                          </CardHeader>
                        </Card>
                        <div className="w-4/5 bg-white">
                          <h4 className="text-black font-bold text-2xl mb-2">
                            {purchased_course.course_details.course_name}
                          </h4>
                          <p className="text-black font-bold text-1xl mb-2">
                            {purchased_course.course_details.description}
                          </p>
                          <p className="text-black font-bold text-1xl mb-2">
                            {
                              purchased_course.course_details.tutor_profile
                                .tutor_details.username
                            }
                          </p>
                          {/* {purchased_course.is_free_of_charge ? (
                            <p
                              className="text-black"
                              style={{ fontWeight: "bold" }}
                            >
                              Free of Cost
                            </p>
                          ) : (
                            <p className="text-black">Paid</p>
                          )} */}
                          <div className="flex p-2 text-2xl flex-row justify-between">
                            <div className="flex gap-6">
                              <i
                                // className={`ri-thumb-up-line cursor-pointer ${
                                //   isLike
                                //     ? "ri-thumb-up-fill cursor-pointer"
                                //     : ""
                                // }`}
                                // className={
                                //   isLike.length !== 0
                                //     ? `ri-thumb-up-fill cursor-pointer`
                                //     : `ri-thumb-up-line cursor-pointer`
                                // }
                                onClick={() =>
                                  handleCourseLike(
                                    purchased_course.course_details.id
                                  )
                                }
                              >
                                {" "}
                                {checkLiked(
                                  purchased_course.course_details.id
                                )}{" "}
                              </i>
                              {/* <i className="ri-thumb-down-line"></i> */}
                            </div>
                            <button
                              className="btn"
                              onClick={() => handleView(purchased_course)}
                            >
                              View
                            </button>
                            {/* <button
                              className="btn"
                              onClick={() =>
                                handleOpen(purchased_course.course_details.id)
                              }
                            > */}{" "}
                            {checkReviewed(purchased_course.course_details.id)}{" "}
                            {/* </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <></>
              {/* {isModalOpen && selectedVideo && (
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
              )} */}
            </>
          </Row>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add your review
            </Typography>
            <Form
              className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
              encType="multipart/form-data"
              onSubmit={() => handleReviewSubmit("")}
            >
              {/* <StarRating
                rating={rating}
                onRatingChange={(newRating) => setNewRating(newRating)}
              /> */}
              <Rating
                rating={rating}
                onDurationChange={(newRating) => setNewRating(newRating)}
              />
              <Textarea
                placeholder={user.review ? user.review : "Enter Your Review"}
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
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

export default PurchaseCourse;
