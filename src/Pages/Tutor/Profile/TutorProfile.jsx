import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl, imageBaseUrl } from "../../../Constants/Constants";
import { Button } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRef } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
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
  // MDBBreadcrumb,
  // MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Loader } from "../../../Components/Loader/Loader";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
const TutorProfile = () => {
  const instructions = [
    "Encourage Participation: Remind students to actively participate in class discussions and ask questions.",
    "Provide Real-World Examples: Incorporate real-world examples to make the concepts more relatable.",
    "Use Multimedia: Utilize multimedia resources such as images, videos, or interactive presentations.",
    "Set Clear Expectations: Clearly communicate expectations regarding assignments, deadlines, and assessment criteria.",
    "Encourage Critical Thinking: Challenge students to think critically and analyze information.",
    "Offer Feedback Constructively: Provide constructive feedback on assignments, highlighting strengths and suggesting areas for improvement.",
    "Establish a Routine: Help students establish a consistent study routine for better time management.",
    "Promote Collaboration: Encourage collaboration among students through group projects or discussions.",
    "Stay Accessible: Let students know about your availability for questions or additional assistance.",
    "Celebrate Achievements: Acknowledge and celebrate students' achievements, both big and small.",
  ];
  const [change, setChange] = useState(false);

  const [user, setUser] = useState([]);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const handleCertificateClose = () => setOpenCertificate(false);
  const handleCertificateOpen = () => setOpenCertificate(!open);
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(!open);
  const [imageOpen, setImageOpen] = useState(false);
  const handleImageOpen = () => setImageOpen(!imageOpen);
  const handleImageClose = () => setImageOpen(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputProfileRef = useRef(null);
  let imageAddFile = null;
  let certificateFile = null;
  // form details states
  const [bio, setBio] = useState("");
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [imageChange, setImageChange] = useState([]);
  const [certificateChange, setCertificateChange] = useState([]);

  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });
  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:8000/ws/adminnotification/");

  //   socket.onopen = (event) => {
  //     console.log("WebSocket connection opened:", event);
  //   };

  //   socket.onmessage = (event) => {
  //     console.log("WebSocket message received:", event);

  //     // Parse the message data if needed
  //     const messageData = JSON.parse(event.data);
  //     console.log(messageData, "message data");

  //     // Show a notification
  //     showNotification(messageData.message);
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = (event) => {
  //     console.log("WebSocket connection closed:", event);
  //   };

  //   // Function to show a notification
  //   const showNotification = (message) => {
  //     if ("Notification" in window) {
  //       console.log(message, "message---------------------->>>>>");
  //       const currentPermission = Notification.permission;

  //       if (currentPermission === "granted") {
  //         console.log(message, "message---------------------->>>>>");

  //         // Permission already granted, create a notification
  //         new Notification("New Message", {
  //           body: message,
  //         });
  //       } else if (currentPermission !== "denied") {
  //         // Permission not granted or denied, request it
  //         Notification.requestPermission().then((permission) => {
  //           console.log(message, "message---------------------->>>>>");

  //           if (permission === "granted") {
  //             // Permission granted, create a notification
  //             new Notification("New Message", {
  //               body: message,
  //             });
  //           }
  //         });
  //       }
  //     }
  //   };
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const handleFormSubmit = async (e) => {
    const apiUrl = `${BaseUrl}tutor/profileEdit/${user.id}/`;
    setLoading(true);
    handleClose();
    if (bio === null || qualification === null || mobile === null) {
      toast.error("field cannot be empty");
      setLoading(false);
      return;
    }
    if ((mobile && mobile.length < 10) || mobile.length > 10) {
      toast.error("Enter a valid mobile number");
      setMobile("");
      setLoading(false);
      return;
    }
    try {
      e.preventDefault();
      const editProfile = new FormData();
      if (imageChange.length !== 0) {
        editProfile.append("profile_photo", imageChange);
      }
      editProfile.append("bio", bio ? bio : user.bio);
      editProfile.append("user", user.user);
      editProfile.append("is_certificate", user.is_certificate);
      if (mobile || user.mobile) {
        editProfile.append("mobile", mobile ? `+91${mobile}` : user.mobile);
      }
      editProfile.append(
        "qualification",
        qualification ? qualification : user.qualification
      );
      axios.patch(apiUrl, editProfile).then((response) => {
        const res = response.data;
        if (res.status === 200) {
          setImageChange([]);
          setBio("");
          setQualification("");
          setMobile("");
          setUser(res.teacherData);
          toast.success(res.message);
        }
      });
    } catch (error) {
      console.log(error, "Error During Submission");
    } finally {
      setLoading(false);
    }
  };
  const certificateApiUrl = `${BaseUrl}tutor/application_form/${user.id}/`;

  const handleCertificateSubmit = async (e) => {
    e.preventDefault();
    handleCertificateClose();
    setLoading(true);
    const certificate = new FormData();
    console.log(certificateChange, "change");
    if (certificateChange.length !== 0) {
      certificate.append("certificate", certificateChange);
      certificate.append("tutor", user.id);
    } else {
      toast.error("image cannot be empty");
      setLoading(false);
      return;
    }
    console.log(certificate, "certificate");
    try {
      await axios.post(certificateApiUrl, certificate).then((response) => {
        if (response.data.status === 200) {
          setSelectedCertificate([]);
          handleCertificateClose();
          toast.success(response.data.message);
          setChange(!change);
        } else {
          setSelectedCertificate([]);
          toast.error(response.data.message);
        }
        handleCertificateClose();
      });
    } catch (err) {
      console.log(err, "error found during certificate upload");
      handleCertificateClose();
    } finally {
      setLoading(false);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handleFileChange = (event) => {
    imageAddFile = event.target.files[0];
    setImageChange(imageAddFile);
    setSelectedFile(imageAddFile);
  };
  const handleCertificateChange = (event) => {
    certificateFile = event.target.files[0];
    console.log(certificateFile);
    setCertificateChange(certificateFile);
    setSelectedCertificate(certificateFile);
  };
  const handleProfileImage = () => {
    fileInputProfileRef.current.click();
  };
  const handleViewCertificate = async () => {
    const certificateApi = `${BaseUrl}tutor/certificateView/${user.id}/`;
    try {
      const res = await axios.get(certificateApi);
      setApplication(res.data);
      if (res.data.is_approved) {
        handleImageOpen();
      } else {
        console.log(res.data);
        toast.error("Admin Want Approve your Certificate");
      }

      console.log(res.data, "certificate coming");
    } catch (err) {
      console.log(err);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/tutorProfile/${tutor.user_id}/`
        );
        setUser(response.data);
      } catch (err) {
        console.log(err, "error found");
      }
    };

    const apiUrl = `${BaseUrl}tutor/purchased_student/${tutor.id}/`;
    async function fetchStudentDetails() {
      try {
        const response = await axios.get(apiUrl);
        setStudentList(response.data);
        console.log(response.data, "data");
      } catch (err) {
        console.error(err, "error in student details");
      }
    }
    fetchTutorProfile();
    fetchStudentDetails();
  }, []);
  if (user.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        {loading && <Loader />}
        <MDBContainer className="py-5">
          <MDBRow></MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  {user.profile_photo ? (
                    <MDBCardImage
                      src={user.profile_photo}
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
                    {user.is_certificate ? null : (
                      <MDBBtn
                        outline
                        className="ms-1"
                        onClick={handleCertificateOpen}
                      >
                        Upload Certificate
                      </MDBBtn>
                    )}
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="mb-4">
                <MDBCardBody className="">
                  <p className="txt text-center">Student List</p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.length !== 0 ? (
                        studentList.map((student, index) => (
                          <tr key={index}>
                            <td>{student.student.student_details.username}</td>
                            <td>{student.course.course_name}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {student.created_at}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No students available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <hr />
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
                            {user.tutor_details.username}
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
                          {user.tutor_details.email}
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
                        <MDBCardText>Wallet</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {user.wallet}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    {user.is_certificate && (
                      <>
                        <hr />

                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText>Certificate</MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText
                              className="text-muted cursor-pointer"
                              onClick={handleViewCertificate}
                            >
                              view
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </>
                    )}
                  </MDBCardBody>
                )}
              </MDBCard>
              <MDBCard>
                <MDBCardBody>
                  <h3 className="text-center">instructions</h3>
                  <ul>
                    {instructions.map((instruction, index) => (
                      <li style={{ listStyle: "disc" }} key={index}>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <Dialog
          open={imageOpen}
          handler={handleImageOpen}
          style={{
            maxHeight: "100vh", // Set a maximum height for the modal
            overflowY: "auto",
          }}
        >
          <DialogBody>
            <img src={application.certificate} alt="certificate-image" />
          </DialogBody>
          <DialogFooter>
            {/* <Button
            variant="text"
            color="red"
            onClick={handleImageOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
            <Button variant="gradient" color="red" onClick={handleImageClose}>
              <span>close</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Modal
          open={openCertificate}
          onClose={handleCertificateClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Certificate
            </Typography>
            <div className="w-full flex justify-center">
              {selectedCertificate ? (
                <img
                  src={
                    selectedCertificate instanceof File
                      ? URL.createObjectURL(selectedCertificate)
                      : null
                  }
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt="selected-image"
                />
              ) : null}
            </div>
            <form
              class="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
              encType="multipart/form-data"
              onSubmit={handleCertificateSubmit}
            >
              <div className="flex justify-between w-full px-10">
                <input type="file" onChange={handleCertificateChange} />
              </div>
              <button
                class="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                submit
              </button>
            </form>
          </Box>
        </Modal>

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
              onSubmit={handleFormSubmit}
            >
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
              <div class="flex flex-col gap-6 mb-1">
                {/* <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Username
              </h6> */}

                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="Username"
                    value={user.tutor_details.username}
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
                    value={user.tutor_details.email}
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
                    placeholder={
                      user.mobile ? user.mobile : "Enter Your Mobile Number"
                    }
                    type="number"
                    name="mobile"
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
                    placeholder={
                      user.qualification
                        ? user.qualification
                        : "Enter Your Qualification"
                    }
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
};

export default TutorProfile;
