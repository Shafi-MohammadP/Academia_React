import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../Constants/Constants";
import { useSelector } from "react-redux";

const SearchComponent = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const c = location.pathname;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchCourseData, setSearchCourseData] = useState([]);
  const user = useSelector((state) => state.user.userInfo);

  const courseView = (event) => {
    const item = searchCourseData.find((obj) => obj.id === event);
    console.log(user, "userrrrrrrrrrr");
    if (item.role === "tutor" && item.tutor_id === user.id) {
      navigate("my-courses/courseUpdate/", { state: { course: item } });
    } else {
      navigate("courseView/", { state: { course: item } });
    }
  };
  useEffect(() => {
    const apiUrl = `${BaseUrl}course/courseSearch/?search=${searchTerm}`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data, "useEffect");
        setSearchCourseData(res.data);
      })
      .catch((err) => {
        console.error(err, "error during searching");
      });

    if (searchTerm !== "") {
      onSearch(searchTerm);

      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      <div className="search ">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn">Search</button>
      </div>
      <div className="mt-1">
        {searchOpen ? (
          <Card className="w-96 max-h-60">
            <List className="min-h-20 max-h-60 overflow-y-auto z-50 hideScroll">
              {searchCourseData.length === 0 ? (
                <h1
                  className="text-center text-lg font-prompt-normal"
                  style={{ paddingTop: "15px" }}
                >
                  Course not found
                </h1>
              ) : (
                searchCourseData.map((course, index) => (
                  <ListItem
                    key={index}
                    className="min-h-16"
                    onClick={(e) => courseView(course.id)}
                  >
                    <ListItemPrefix>
                      {course.image ? (
                        <img
                          // variant="circular"
                          // alt="candice"
                          style={{
                            width: "50%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={course.image}
                          onClick={(e) => courseView(course.id)}
                        />
                      ) : (
                        ""
                      )}
                    </ListItemPrefix>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {course.course_name}
                        onClick={(e) => courseView(course.id)}
                      </Typography>
                    </div>
                  </ListItem>
                ))
              )}
            </List>
          </Card>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
