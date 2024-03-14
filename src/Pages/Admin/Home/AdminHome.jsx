import React, { useState } from "react";
import StudentCount from "../../../Components/admin/aggragation componenets/StudentCount";
import TutorCount from "../../../Components/admin/aggragation componenets/TutorCount";
import CourseCount from "../../../Components/admin/aggragation componenets/CourseCount";
import CertificateCount from "../../../Components/admin/aggragation componenets/CertificateCount";
import { Col, Container, Row } from "reactstrap";
import { BaseUrl } from "../../../Constants/Constants";
import { useEffect } from "react";
import axios from "axios";
import ChartDetails from "../../../Components/admin/aggragation componenets/charts/Charts";

const AdminHome = () => {
  const [details, setDetails] = useState([]);
  const tokenDataString = localStorage.getItem("authToken");
  const tokenData = JSON.parse(tokenDataString);
  const accessToken = tokenData ? tokenData.access : null;
  const { student_count, tutor_count, course_count, certificate_count } =
    details;
  useEffect(() => {
    const apiUrl = `${BaseUrl}dashboard/aggregation_details/`;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(apiUrl, config)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error(error, "errr");
      });
  }, []);

  return (
    <>
      <Container>
        <ChartDetails />
        <Row>
          <Col md={4} className="gap-3 p-3">
            <StudentCount count={student_count} />
          </Col>
          <Col md={4} className="gap-3 p-3">
            <TutorCount count={tutor_count} />
          </Col>
          <Col md={4} className="gap-3 p-3">
            <CourseCount count={course_count} />
          </Col>
          <Col md={4} className="gap-3 p-3">
            <CertificateCount count={certificate_count} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;
