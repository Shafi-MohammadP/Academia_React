import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Constants/Constants";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { Textarea, Typography } from "@material-tailwind/react";
import { Form } from "reactstrap";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
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
const ReviewList = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [review, setReview] = useState("");
  const [reviewDetails, setReviewDetails] = useState([]);
  const [rating, setRating] = useState(0);
  const handleOpen = (event) => {
    setReviewDetails(event);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const user = useSelector((state) => state.user.userInfo);
  const handleEditReview = async (e) => {
    e.preventDefault(); // Prevents the default form submission and page refresh
    handleClose();
    const apiUrl = `${BaseUrl}course/review_edit/${reviewDetails.id}/`;
    const data = {
      user: user.user_id,
      course: courseId,
      text: review ? review : reviewDetails.text,
      rating: rating ? rating : reviewDetails.rating,
    };
    console.log(data, "data");
    try {
      const response = await axios.patch(apiUrl, data);
      if (response.status === 200) {
        setRating(0);
        setReview("");
        setReviewDetails("");
        toast.success(response.data.message);
        setChange(!change);
      }
    } catch (error) {
      console.error(error, "Error editing review");
    }
  };

  useEffect(() => {
    const CourseReviewListUrl = `${BaseUrl}course/course_review_list/${courseId}/`;
    axios
      .get(CourseReviewListUrl)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err, "Error in Course reviewList");
      });
  }, [change]);

  return (
    <>
      <div className="flex justify-center">
        {reviews && reviews.length !== 0 ? (
          <div className="flex flex-col w-[88%] mb-20 gap-2 p-2 border rounded-md overflow-y-auto">
            {reviews
              .sort((a, b) => (a.user.id === user.user_id ? -1 : 1))
              .map((review, index) => (
                <div key={index} className=" p-2 border rounded-md">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 h-12  mb-2">
                      <p className=" h-6 font-bold  ">{review.user.username}</p>
                      <Rating value={review.rating} readOnly className=" h-8" />
                    </div>
                    {/* {checkUser(review.user.id)} */}
                    {review.user.id === user.user_id ? (
                      <i
                        className="ri-pencil-fill text-2xl px-3 cursor-pointer"
                        onClick={() => handleOpen(review)}
                      ></i>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="flex items-center">
                <div className="flex items-start">
                  <Rating
                    value={review.rating}
                    readOnly
                    className="flex-shrink-0"
                  />
                </div>
              </div> */}
                  {/* <div className="flex items-center mb-2"></div> */}
                  <div className="flex text-start">
                    <p className="txt">{review.text}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No reviews available for this course.</p>
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
            Add your review
          </Typography>
          <Form
            className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
            encType="multipart/form-data"
            // onSubmit={handleEditReview()}
          >
            {/* <StarRating
                rating={rating}
                onRatingChange={(newRating) => setRating(newRating)}
              /> */}
            <Rating onChange={(event, newRating) => setRating(newRating)} />

            <Textarea
              placeholder={user.review ? user.review : "Enter Your Review"}
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></Textarea>
            <button
              className="btn"
              onClick={(e) => handleEditReview(e, reviewDetails.id)}
            >
              Submit
            </button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewList;
