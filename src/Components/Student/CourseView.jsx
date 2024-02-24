import React from "react";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../Constants/Constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
const CustomWarningToast = ({ closeToast }) => (
  <div className="custom-warning-toast">
    <FontAwesomeIcon
      className="text-yellow-900"
      style={{ fontWeight: "bold", fontSize: "30px" }}
      icon={faExclamationTriangle}
    />
    <p className="text-black">
      You need to purchase the course to view the video
    </p>
    <button className="custom-warning-close" onClick={closeToast}></button>
  </div>
);

const CourseView = () => {
  const [courseDetails, setCourseDetailView] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (info) => {
    console.log(info);
    if (info.is_free_of_charge) {
      setSelectedVideo(info.video);
      setIsModalOpen(true);
    } else {
      toast(<CustomWarningToast />, {
        // Additional options for the toast.error function
        position: "top-right",
        autoClose: 5000,
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
  const { id } = useParams();
  useEffect(() => {
    const apiUrl = `${BaseUrl}student/courseDetailView/${id}/`;
    const videoApi = `${BaseUrl}student/courseDetailsBeforePurchase/${id}/`;
    try {
      axios.get(apiUrl).then((res) => {
        setCourseDetailView(res.data);
        console.log(res.data, "course details");
      });
    } catch (err) {
      console.log(err, "error Found");
    }
    try {
      axios.get(videoApi).then((res) => {
        setVideoDetails(res.data);
        console.log(res.data, "ppppppppppppppppppppppppppp");
      });
    } catch (err) {
      console.error(err, "error during fetching videos ");
    }
  }, []);
  if (
    courseDetails.category_details === undefined ||
    courseDetails.tutor_profile === undefined
  ) {
    return <Loader />;
  }
  return (
    <>
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
              className="w-full h-100 "
            />
            {/* <Button className='flex align-middle w-45 h-24' color="green">Chat</Button> */}
          </div>

          {/* description */}
          <div className="mx-auto px-5 lg:px-5">
            <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-black">
              Course Name : {courseDetails.course_name}
            </h2>
            <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-black">
              Course Description : {courseDetails.description}
            </h2>

            <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-black">
              Price : ₹ {courseDetails.price}
            </h2>

            <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-black">
              Category : {courseDetails.category_details.name}
            </h2>
            <h2 className="pt-3 text-2xl font-bold lg:pt-0 text-black">
              Teacher Name :{courseDetails.tutor_profile.tutor_details.username}
            </h2>
            <p className="pt-3 text-xs font-bold lg:pt-0 text-black">
              {/* Description : {employeeData.description}  */}
            </p>
            <Button className="bg-green-900">purchase Course</Button>
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
                  {/* <FontAwesomeIcon
                    onClick={() => handleOpenModalEdit(video_details)}
                    className="cursor-pointer"
                    title="edit video details"
                    icon={faPen}
                  ></FontAwesomeIcon> */}
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
    </>
  );
};

export default CourseView;
