import React, { useState } from "react";
import "./hero-section.css";
import { Container, Row, Col } from "reactstrap";
import herImg from "../../assets/homeImg.jpg";
import axios from "axios";
import SearchComponent from "../common/search-componet/SearchComponent";
import { BaseUrl } from "../../Constants/Constants";
import SearchCorseList from "../Student/SearchCorseList";
import CourseCard from "../Student/course-section/CourseCard";
import toast from "react-hot-toast";
import CustomeToast from "../common/custome-toast/CustomeToast";
import { faBan } from "@fortawesome/free-solid-svg-icons";
const HeroSection = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (searchTerm) => {
    setLoading(true);
    const response = await axios.get(
      `${BaseUrl}course/courseSearch/?search=${searchTerm}`
    );
    if (response.data.length !== 0) {
      // setSearchResult(response.data);
      // console.log(response.data);
    }
    try {
    } catch (err) {
      console.error(err, "Error Found During Search");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
            </div>
            {/* <div className="search">
              <input type="text" placeholder="Search" />
              <button className="btn">Search</button>
            </div> */}
            <SearchComponent onSearch={handleSearch} />
          </Col>

          <Col lg="6" md="6">
            <img src={herImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>

      {searchResult.length > 0 && (
        <>
          <Row className="align-items-center">
            <Col className="text-center">
              <h2>Search Result</h2>
            </Col>
          </Row>
          <Row>
            {searchResult.map((item) => (
              <Col key={item.id} lg="4" md="3" sm="3" className="ml-12 p-10">
                <CourseCard item={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </section>
  );
};

export default HeroSection;

// const message = "No Result Found";
// toast(<CustomeToast message={message} icon={faBan} />, {
//   position: "top-right",
//   autoClose: 2000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
// });
