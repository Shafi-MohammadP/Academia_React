// import React, { useEffect, useState } from "react";
// import { BaseUrl } from "../../../Constants/Constants";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Button } from "@material-tailwind/react";

// const CategoryManagement = () => {
//   const [category, setCategory] = useState([]);
//   useEffect(() => {
//     const apiUrl = `${BaseUrl}course/categoryList/`;
//     try {
//       axios.get(apiUrl).then((res) => {
//         setCategory(res.data);
//         console.log(res.data);
//       });
//     } catch (er) {
//       console.log(er, "error Found");
//     }
//     // try{
//     // }
//   }, []);

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Category Name</TableCell>
//               <TableCell align="left">Category Description</TableCell>
//               {/* <TableCell align="left">Corse Image</TableCell> */}
//               {/* <TableCell align="right"></TableCell> */}
//               <TableCell align="left">Availability</TableCell>
//               {/* <TableCell align="left">Price</TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {category.map((value, key) => (
//               <TableRow
//                 // key={value.tutor}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {value.name}
//                 </TableCell>
//                 <TableCell>{value.description}</TableCell>
//                 {/* <Button onClick={handleOpen}>View</Button> */}
//                 {/* <TableCell>
//                   <img
//                     className="cursor-pointer"
//                     src={value.image}
//                     style={{ width: "100px", height: "100px" }}
//                     alt="certificate"
//                     onClick={() => handleOpen(value.certificate)}
//                   />
//                 </TableCell> */}
//                 {/* <TableCell component="th" scope="row">
//                   {value.price}
//                 </TableCell> */}
//                 {value.is_available ? (
//                   <TableCell align="left" className="text-back">
//                     <span
//                       className="rounded-pill btn"
//                       style={{ backgroundColor: "green", color: "white" }}
//                     >
//                       Available
//                     </span>
//                   </TableCell>
//                 ) : (
//                   <TableCell align="left" className="text-back">
//                     <span
//                       className="rounded-pill btn"
//                       style={{ backgroundColor: "red", color: "white" }}
//                     >
//                       unavailable
//                     </span>
//                   </TableCell>
//                 )}

//                 <TableCell align="right"></TableCell>
//                 <TableCell>
//                   <Button
//                     className="bg-green-900"
//                     // onClick={() => handleApproval(value.id)}
//                   >
//                     Approve
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };
