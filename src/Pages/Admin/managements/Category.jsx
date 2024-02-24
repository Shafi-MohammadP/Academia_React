import { useEffect, useState } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-tailwind/react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
// import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { faPencil, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  Card,
  CardContent,
  CardActions,
  // Button,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "react-router-dom";
// import { Textarea } from "@material-tailwind/react";

function Category() {
  const [category, setCategory] = useState([]);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryDetails, setCategoryDetails] = useState({
    id: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    const apiUrl = `${BaseUrl}course/categoryList/`;
    try {
      axios.get(apiUrl).then((res) => {
        setCategory(res.data);
      });
    } catch (er) {
      console.log(er, "error Found");
    }
  }, [change]);
  const handleEditOpenModal = () => {
    setEditOpen(!editOpen);
  };
  const handleEditCloseModal = () => {
    setEditOpen(!editOpen);
  };
  const handleOpenModal = (categoryData) => {
    setCategoryDetails({
      id: categoryData.id,
      name: categoryData.name,
      description: categoryData.description,
    });
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(!open);
  };
  const handleApproval = (id) => {
    console.log(id, "category Id");
    const apiUrl = `${BaseUrl}dashboard/categoryUpdateAndDeletion/${id}/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    console.log(accessToken);
    try {
      fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setChange(!change);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        });
    } catch (err) {
      console.log(err, "Error During fetching");
    }
  };
  const handleCategoryAdding = async () => {
    handleEditCloseModal();
    if (!name.trim() || !description.trim()) {
      // If either name or description is empty or contains only whitespace
      toast.error("Please provide both name and description.");
      return;
    }
    const apiUrl = `${BaseUrl}dashboard/categoryCreating/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    const addCourse = new FormData();
    console.log("New name:", name);
    console.log("New description:", description);

    addCourse.append("name", name);
    addCourse.append("description", description);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: addCourse,
      });
      if (!response.ok) {
        console.error(`Server error: ${response.status}`);
        // Handle server errors or unexpected responses
        return;
      }
      const responseData = await response.json();
      if (responseData.status === 200) {
        setDescription("");
        setName("");
        setChange(!change);
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      console.log(err, "Error in adding category");
    }
  };
  const handleSubmit = async (id) => {
    handleCloseModal();
    const apiUrl = `${BaseUrl}dashboard/categoryUpdateAndDeletion/${id}/`;
    const tokenDataString = localStorage.getItem("authToken");
    const tokenData = JSON.parse(tokenDataString);
    const accessToken = tokenData ? tokenData.access : null;
    const editCourse = new FormData();

    console.log("Updated name:", name);
    console.log("Updated description:", description);

    editCourse.append("name", name ? name : categoryDetails.name);
    editCourse.append(
      "description",
      description ? description : categoryDetails.description
    );

    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: editCourse,
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 200) {
          setDescription("");
          setName("");
          setChange(!change);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        // Handle non-OK response
        toast.error(
          `Failed to update category. HTTP error! Status: ${response.status}`
        );
      }
    } catch (err) {
      console.error("Error during fetching:", err);
      toast.error("Error during fetching. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button className="bg-blue-700" onClick={handleEditOpenModal}>
          <FontAwesomeIcon className="w-8" icon={faAdd}></FontAwesomeIcon>
          Add Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell></TableCell>
              <TableCell align="left">Category Description</TableCell>
              {/* <TableCell align="left">Corse Image</TableCell> */}
              {/* <TableCell align="right"></TableCell> */}
              <TableCell align="left">Availability</TableCell>
              {/* <TableCell align="left">Price</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((value, key) => (
              <TableRow
                // key={value.tutor}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.name}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{value.description}</TableCell>
                {/* <Button onClick={handleOpen}>View</Button> */}
                {/* <TableCell>
              <img
                className="cursor-pointer"
                src={value.image}
                style={{ width: "100px", height: "100px" }}
                alt="certificate"
                onClick={() => handleOpen(value.certificate)}
              />
            </TableCell> */}
                {/* <TableCell component="th" scope="row">
              {value.price}
            </TableCell> */}
                {value.is_available ? (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "green", color: "white" }}
                    >
                      Available
                    </span>
                  </TableCell>
                ) : (
                  <TableCell align="left" className="text-back">
                    <span
                      className="rounded-pill btn"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      unavailable
                    </span>
                  </TableCell>
                )}

                <TableCell align="right"></TableCell>
                <TableCell className="">
                  {/* <Button
                    className="bg-green-900"
                    onClick={() => handleApproval(value.id)}
                  >
                    Approve
                  </Button> */}
                  <div className="flex gap-5 items-center justify-around cursor-pointer">
                    <FontAwesomeIcon
                      onClick={() => handleOpenModal(value)}
                      style={{ fontSize: "25px" }}
                      icon={faPencil}
                    ></FontAwesomeIcon>
                    {value.is_available ? (
                      <FontAwesomeIcon
                        onClick={() => handleApproval(value.id)}
                        style={{ fontSize: "30px" }}
                        icon={faXmark}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => handleApproval(value.id)}
                        style={{ fontSize: "30px" }}
                        icon={faCheck}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        handler={handleOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <Card>
          <CardContent className="flex flex-wrap gap-8">
            <Typography variant="h4" color="primary">
              Edit Category
            </Typography>
            <Typography variant="h6" color="black">
              Current Category :{categoryDetails.name}
            </Typography>
            <TextField
              label="name"
              type="text"
              //   value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              fullWidth
            />

            <TextField
              label="Description"
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </CardContent>
          <CardActions>
            {/* <Button onClick={handleCloseModal} fullWidth>
              Cancel
            </Button> */}
            <Button fullWidth onClick={() => handleSubmit(categoryDetails.id)}>
              submit
            </Button>
          </CardActions>
        </Card>
      </Dialog>
      {""}
      <Dialog
        open={editOpen}
        handler={handleEditOpenModal}
        onClose={handleEditCloseModal}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <Card>
          <CardContent className="flex flex-wrap gap-8">
            <Typography variant="h4" color="primary">
              Add Category
            </Typography>
            <Typography variant="h6" color="black"></Typography>
            <TextField
              label="Category name"
              type="text"
              //   value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              fullWidth
            />

            <TextField
              label="Description"
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </CardContent>
          <CardActions>
            {/* <Button onClick={handleCloseModal} fullWidth>
              Cancel
            </Button> */}
            <Button fullWidth onClick={handleCategoryAdding}>
              submit
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </>
  );
}

export default Category;
