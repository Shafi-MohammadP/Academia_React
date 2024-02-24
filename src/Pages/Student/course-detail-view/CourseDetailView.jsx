import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import "./course-detail-view.css";
import { useEffect } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import FreeCourseCard from "../../../Components/Student/free-course-section/FreeCourseCard";
import VideoCards from "../../../Components/Student/video-details/VideoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import CustomeToast from "../../../Components/common/custome-toast/CustomeToast";
import { useSelector } from "react-redux";
import ReviewList from "../../../Components/common/review-list/ReviewList";
import Rating from "@mui/material/Rating";
const CourseDetailView = () => {
  const user = useSelector((state) => state.user.userInfo);
  const location = useLocation();
  const course = location.state.course;
  const { tutor_profile } = course;
  const { id: tutorId } = tutor_profile;
  const [courseReview, setCourseReview] = useState([]);
  const [courseVideo, setCourseVideo] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const openModal = (info) => {
    console.log(info);
    if (info.is_free_of_charge) {
      setSelectedVideo(info.video);
      setIsModalOpen(true);
    } else {
      const message = "you need to purchase the course to watch the video!!";
      toast(<CustomeToast message={message} icon={faExclamationTriangle} />, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const closeModal = () => {
    setSelectedVideo([]);
    setIsModalOpen(false);
  };
  const handlePurchaseCourse = async (event) => {
    const apiUrl = `${BaseUrl}course/stripe_payment/`;
    const data = {
      courseId: event,
      userId: user.id,
      course_name: course.course_name,
      course_price: Math.floor(course.price),
      tutor_id: tutorId,
    };
    console.log(data.course_price);
    console.log(data, "data");
    try {
      const response = await axios.post(apiUrl, data);
      console.log(response, "--------------->>");
      window.location.href = response.data.message.url;
    } catch (err) {
      console.error(err, "stripe error");
    }
  };
  const checkPurchased = (event) => {
    const checked = purchaseList.find((obj) => obj.course.id === event);
    // if (checked) {
    //   setPurchased(true);
    // }
    return checked ? (
      // setPurchased(true)
      ""
    ) : (
      <Button className="btn" onClick={() => handlePurchaseCourse(course.id)}>
        Purchase Course
      </Button>
    );
  };
  useEffect(() => {
    const fetchCourseVideo = () => {
      const apiUrl = `${BaseUrl}student/courseDetailsBeforePurchase/${course.id}/`;
      axios.get(apiUrl).then((response) => {
        console.log(response.data, "video details");
        setCourseVideo(response.data);
      });
    };
    fetchCourseVideo();
    const CourseReviewListUrl = `${BaseUrl}course/course_review_list/${course.id}/`;
    axios
      .get(CourseReviewListUrl)
      .then((res) => {
        setCourseReview(res.data);
      })
      .catch((err) => {
        console.error(err, "Error in Course reviewList");
      });
    const purchaseListUrl = `${BaseUrl}course/purchase_student_list/${user.id}/`;
    axios
      .get(purchaseListUrl)
      .then((res) => {
        setPurchaseList(res.data);
        console.log(res.data, "------------------------<<<<");
      })
      .catch((err) => {
        console.error(err, "error in purchaseList");
      });
  }, []);
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="about__img">
                <img src={course.image} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="about__content">
                <h2>{course.course_name}</h2>
                <p>{course.description}</p>
                <h3 className="text-black">{course.price}</h3>

                <div className="about__counter">
                  <div className="flex gap-40 align-items-center">
                    <div className="single__counter">
                      <p className="counter__title text-black ">
                        <i className="ri-movie-fill"></i> {course.video_count}{" "}
                        Videos
                      </p>
                    </div>

                    <div className="single__counter text-black">
                      <p className="d-flex align-items-center gap-1 text-black">
                        <i class="ri-star-fill ml-16"></i>{" "}
                        {course.average_rating}K
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-40 align-items-center">
                    <div className="single__counter">
                      <p className="counter__title text-black ">
                        <i className="ri-presentation-fill"></i>{" "}
                        {course.tutor_profile.tutor_details.username}
                      </p>
                    </div>

                    <div className="single__counter text-black">
                      <p className="d-flex align-items-center gap-1 text-black ml-[4.5rem]">
                        <i class="ri-thumb-up-fill"></i> {course.likes}
                      </p>
                    </div>
                  </div>
                  {/* {!purchaseList.includes(course.id) ? (
                    <Button
                      className="btn"
                      onClick={() => handlePurchaseCourse(course.id)}
                    >
                      Purchase Course
                    </Button>
                  ) : null} */}{" "}
                  {checkPurchased(course.id)}{" "}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              {/* <h2 className="fw-bold">Course Videos</h2> */}
            </Col>

            <>
              <div className="flex justify-center">
                {courseVideo && courseVideo.length !== 0 && (
                  <div className="flex flex-col w-[88%] h-[30rem] mb-20 gap-2 p-2 border rounded-md overflow-y-auto">
                    <h2 className="text-center mb-4 text-xl font-bold text-black">
                      Course Videos
                    </h2>
                    {courseVideo.map((video_details, index) => (
                      <div className="md:flex block gap-16 p-2 border rounded-md md:h-52">
                        <div key={index} className="relative ">
                          <img
                            className="h-full w-96"
                            src={video_details.thumbnail_image}
                            alt="demo image"
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
                          {video_details.is_free_of_charge ? (
                            <p
                              className="text-black"
                              style={{ fontWeight: "bold" }}
                            >
                              Free of Cost
                            </p>
                          ) : (
                            <p className="text-black">Paid</p>
                          )}
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
                  <ReviewList courseId={course.id} />
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default CourseDetailView;
