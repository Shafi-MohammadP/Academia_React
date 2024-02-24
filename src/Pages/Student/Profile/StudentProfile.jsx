import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { faClose, faPen, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoCloseCircleSharp } from "react-icons/io5";

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

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useLocation } from "react-router-dom";
import { Loader } from "../../../Components/Loader/Loader";
import { BaseUrl, imageBaseUrl } from "../../../Constants/Constants";
// import { FaClosedCaptioning } from "react-icons/fa";
import toast from "react-hot-toast";
export default function StudentProfilePage() {
  const [change, setChange] = useState(0);
  const handlesetChange = () => {
    setChange((pre) => pre + 1);
  };
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(!open);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState([]);
  let imageAddFile = null;
  const fileInputProfileRef = useRef(null);
  const student = useSelector((state) => {
    if (state.user.userInfo.role === "student") return state.user.userInfo;
  });
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [imageChange, setImageChange] = useState([]);

  const handleSubmit = (e) => {
    const apiUrl = `${BaseUrl}student/profileEdit/${user.id}/`;
    setLoading(true);
    e.preventDefault();
    const profileFormValidation = {
      bio: bio ? bio : user.bio,
      mobile: mobile ? mobile : user.mobile,
      qualification: qualification ? qualification : user.qualification,
    };
    const isValid = Object.values(profileFormValidation).every(
      (value) => value !== null && value.trim() !== ""
    );
    if (!isValid) {
      toast.error("Field cannot be empty");
      setLoading(false);
      return;
    }
    const EditProfile = new FormData();

    if (imageChange.length !== 0) {
      EditProfile.append("profile_photo", imageChange);
    }
    EditProfile.append("bio", bio ? bio : user.bio);
    if (mobile || user.mobile) {
      EditProfile.append("mobile", mobile ? `+91${mobile}` : user.mobile);
    }
    EditProfile.append(
      "qualification",
      qualification ? qualification : user.qualification
    );
    try {
      axios.patch(apiUrl, EditProfile).then((response) => {
        const data = response.data;
        if (data.status === 200) {
          handlesetChange();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      });
    } catch (error) {
      console.error(error, "Error Founded");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (event) => {
    // Handle the file change here
    imageAddFile = event.target.files[0];
    console.log(imageAddFile, "image add file");
    setImageChange(imageAddFile);
    setSelectedFile(imageAddFile);
    // Add logic to update the user's profile photo with the selected file
  };

  useEffect(() => {
    if (!student) return;
  });

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        if (student) {
          const response = await axios.get(
            `http://127.0.0.1:8000/user/studentProfile/${student.user_id}/`
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentProfile(); // Call the function to fetch student profile
  }, [change]);

  if (user.length === 0) {
    return <Loader />;
  }

  const handleProfileImage = () => {
    fileInputProfileRef.current.click();
  };

  return (
    <>
      {loading && <Loader />}

      <section style={{ backgroundColor: "#fff" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  {user.profile_photo ? (
                    <MDBCardImage
                      src={user.profile_photo}
                      alt={user.student_details.username}
                      className="rounded-circle  mx-auto d-block "
                      style={{ width: "150px", height: "150px" }}
                      fluid
                    />
                  ) : (
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle mx-auto"
                      style={{ width: "150px", height: "150px" }}
                      fluid
                    />
                  )}

                  <p className="text-muted mb-1">
                    {user ? user.qualification : null}
                  </p>
                  {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={handleOpen}>Edit Profile</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                {user && (
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {
                          <MDBCardText className="text-muted">
                            {user.student_details.username}
                          </MDBCardText>
                        }
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.student_details.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Bio</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.bio}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Qualification</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.qualification}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.mobile}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                )}
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile
            </Typography>
            <div className="w-full flex justify-center">
              {user.profile_photo ? (
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
                        src={user.profile_photo}
                        style={{ width: "100px", height: "100px" }}
                        alt="profile-image"
                      />
                      <FontAwesomeIcon
                        icon={faPen}
                        className="absolute text-black-900 bottom-0 right-0 bg-white w-4 h-4 cursor-pointer"
                        onClick={openModal}
                      />
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="absolute text-black-900 bottom-0 right-0 bg-white w-full h-4 cursor-pointer"
                    onClick={handleProfileImage}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="static-image"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="absolute text-black-900 bottom-0 right-0 bg-white w-full h-4 cursor-pointer"
                    onClick={handleProfileImage}
                  />
                </div>
              )}
            </div>

            <form
              class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              {showModal && (
                // Your modal component or file input goes here
                // Example using a simple file input:
                <div className="flex justify-between w-full px-10">
                  {/* <input type="file" onChange={handleFileChange} /> */}

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
              <div class="flex flex-col gap-6 mb-1">
                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Username
              </h6> */}

                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="Username"
                    value={user.student_details.username}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Your Email
              </h6> */}
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="example@gmail.com"
                    value={user.student_details.email}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Bio
              </h6> */}
                <div class="relative h-full w-full min-w-[200px]">
                  <textarea
                    placeholder={user.bio ? user.bio : "Enter Your Bio"}
                    name="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 overflow-y-hidden"
                  ></textarea>
                  {/* <!-- Add label if needed --> */}
                </div>

                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Mobile Number
              </h6> */}
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="Enter Your Mobile Number"
                    name="mobile"
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  {/* <!-- Add label if needed --> */}
                </div>

                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Qualification
              </h6> */}
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    type="text"
                    name="qualification"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="Enter Your Qualification"
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                </div>
              </div>

              <div class="inline-flex items-center"></div>

              <button
                class="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Submit
              </button>
            </form>
          </Box>
        </Modal>
      </section>
    </>
  );
}
