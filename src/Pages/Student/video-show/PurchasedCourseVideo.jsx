import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../../../Components/common/video-player/VideoPlayer";
import Courses from "../../../Components/Student/course-section/Courses";
import { Col, Container, Row, Input, Button } from "reactstrap";
import { useEffect } from "react";
import { ApplicationConfig, BaseUrl } from "../../../Constants/Constants";
import { useSelector } from "react-redux";
import axios from "axios";
import CommentsSection from "../../../Components/common/comment-section/CommentSection";

function PurchasedCourseVideo() {
  const user = useSelector((state) => state.user.userInfo);

  const location = useLocation();
  const video_details = location.state.videoDEtails;
  const [showComments, setShowComments] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newComment, setNewComment] = useState(""); // State to store new comment
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleComment = () => {
    setShowComments(!showComments);
    console.log("work");
  };
  useEffect(() => {
    const commentListUrl = `${BaseUrl}course/video_comment_list/${video_details.id}/`;
    axios
      .get(commentListUrl)
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err, "error in comment list");
      });
    const VideoCommentUserListingUrl = `${BaseUrl}course/video_comment_user_listing/${user.id}/`;
    axios
      .get(VideoCommentUserListingUrl)
      .then((res) => {
        setUserComment(res.data);
      })
      .catch((err) => {
        console.error(err, "error in userComment Listing");
      });
  }, []);
  function calculateDate(createdAt) {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);

    // Calculate the difference in milliseconds
    const timeDifference = currentDate - commentDate;

    // Calculate the difference in days
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) {
      return "today";
    } else {
      return `${daysAgo} days ago`;
    }
  }
  const checkComment = (event) => {
    const checked = comments.find((obj) => obj.video === event);
    return checked ? (
      ""
    ) : (
      <i className="ri-pencil-line absolute top-0 right-0 text-2xl"></i>
    );
  };
  const handlePostComment = async () => {
    const apiUrl = `${BaseUrl}course/video_comment/`;
    const data = {
      user: user.user_id,
      video: video_details.id,
      text: newComment,
    };
    try {
      const response = await axios.post(apiUrl, data, ApplicationConfig);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section>
        <Container>
          <div className="flex flex-col h-screen py-3">
            <div className="flex justify-center items-center ">
              <h2 className="text-2xl font-bold">
                {video_details.video_title}
              </h2>
            </div>
            <hr className="w-full" />
            <div className="flex justify-center items-center h-3/4 relative">
              {!isPlaying && (
                <>
                  <img
                    src={video_details.thumbnail_image}
                    alt=""
                    className="max-w-full max-h-full"
                  />
                  <i
                    className="ri-play-fill absolute text-7xl cursor-pointer"
                    style={{ zIndex: 1 }}
                    onClick={handlePlayClick}
                  ></i>
                </>
              )}

              {isPlaying && <VideoPlayer source={video_details.video} />}
            </div>
          </div>
        </Container>
        <Container>
          <CommentsSection
            user={user}
            calculateDate={calculateDate}
            videoId={video_details.id}
          />
        </Container>
      </section>
    </>
  );
}

export default PurchasedCourseVideo;
