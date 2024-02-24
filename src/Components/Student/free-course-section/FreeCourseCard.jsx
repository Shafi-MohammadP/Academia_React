import React from "react";
import "./free-course.css";
const FreeCourseCard = (props) => {
  const { course_details } = props.item;
  const { course_name, course_description, price, image } = course_details;

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <img src={image} alt="" className="w-100" />
        <button className="btn free__btn">Free</button>
      </div>

      <div className="free__course__details">
        <h6>{course_name}</h6>

        <div className=" d-flex align-items-center gap-5">
          <span className=" d-flex align-items-center gap-2">
            <i class="ri-user-line"></i> {course_description}k
          </span>

          <span className=" d-flex align-items-center gap-2">
            <i class="ri-star-fill"></i> {price}k
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeCourseCard;
