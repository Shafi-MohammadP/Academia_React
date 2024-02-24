import React, { useEffect } from "react";
import CourseCard from "./course-section/CourseCard";
import { Loader } from "../Loader/Loader";
function SearchCorseList({ results }) {
  useEffect(() => {
    if (!results) {
      return <Loader />;
    }
  }, []);
  return (
    <div>
      <h2>Search Results</h2>
      <div className="course-list">
        {results.map((item) => (
          <CourseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default SearchCorseList;
