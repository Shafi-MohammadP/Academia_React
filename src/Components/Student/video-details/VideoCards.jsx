import React, { useState } from "react";
import "./video-cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
function VideoCards({ item }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (info) => {
    console.log(info);
    setSelectedVideo(info.video);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-center border rounded-md overflow-y-auto">
      <div className="flex flex-col w-[88%] gap-2 p-2 ">
        <div className="flex gap-16 p-2">
          <div className="relative ">
            <img
              className="h-full w-96"
              src={item.thumbnail_image}
              alt="demo image"
            />
            <i class="ri-play-circle-fil"></i>
            {/* <i
              class="ri-play-circle-fill"
              className="absolute top-[40%] left-[40%] w-10 h-10 cursor-pointer text-red-900"
            ></i> */}
            <FontAwesomeIcon
              className="absolute bg-white top-[40%] left-[40%] w-10 h-10 cursor-pointer"
              style={{ borderRadius: "50%" }}
              icon={faPlay}
              onClick={() => openModal(item.video)}
            />
          </div>
          <div className="w-4/5 bg-white">
            <h4
              className="text-black"
              style={{ fontWeight: "bold", fontSize: "30px" }}
            >
              {item.video_title}
            </h4>
            <p className="text-black" style={{ fontWeight: "bolder" }}>
              {item.video_description}
            </p>
            {item.is_free_of_charge ? (
              <p className="text-black" style={{ fontWeight: "bold" }}>
                Free of Cost
              </p>
            ) : (
              <p className="text-black">Paid</p>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCards;
