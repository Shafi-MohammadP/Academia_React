import React, { useState } from "react";
import CommentsSection from "../../common/comment-section/CommentSection";
import VideoPlayer from "../../common/video-player/VideoPlayer";
import { useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import { useSelector } from "react-redux";

const TutorVideoShow = () => {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user, "user");
  const location = useLocation();
  console.log(location.state, "state coming");
  const video_details = location.state.videoDetails;
  const [isPlaying, setIsPlaying] = useState(false);
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
  const handlePlayClick = () => {
    setIsPlaying(true);
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
};

export default TutorVideoShow;
