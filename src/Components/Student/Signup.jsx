// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { NavLink, Navigate, useNavigate } from "react-router-dom";
// import { studentSugnupUrl } from "../../Constants/Constants";
// import Swal from "sweetalert2";
// import axios from "axios";

// export function Signup() {
//   const navigate = useNavigate();

//   const signUPuser = async (e) => {
//     e.preventDefault();
//     const user = {
//       first_name: e.target.first_name.value,
//       last_name: e.target.last_name.value,
//       email: e.target.email.value,
//       password: e.target.password.value,
//       password2: e.target.confirmpassword.value,
//     };
//     console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
//     try {
//       const responseData = await axios.post(studentSugnupUrl, user);
//       const response = responseData.data;
//       console.log(
//         response.status,
//         "Erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
//       );
//       if (response.status === 200) {
//         Swal.fire({
//           title: "Success",
//           text: response.text,
//           icon: "success",
//         });
//         navigate("/login");
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "User credentials mismatchttttttttt",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.log("Error During SIgnup", error);
//       Swal.fire({
//         title: "Error",
//         text: "Errorrr",
//         icon: "error",
//       });
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center"
//       style={{
//         backgroundImage:
//           'url("https://www.shiftelearning.com/hs-fs/hubfs/3013.jpg?width=8994&name=3013.jpg")',
//       }}
//     >
//       <div className="p-8 max-w-lg">
//         {" "}
//         {/* Adjusted max-width here */}
//         <Card color="lightBlue" shadow={false} className="bg-white p-10">
//           {" "}
//           {/* Adjusted padding here */}
//           <Typography variant="h4" color="blue-gray" className="text-center">
//             Sign Up
//           </Typography>
//           <Typography color="gray" className="mt-1 font-normal text-center">
//             Nice to meet you! Enter your details to register.
//           </Typography>
//           <form className="mt-8" onSubmit={(e) => signUPuser(e)}>
//             <div className="mb-4">
//               <Typography variant="h6" color="blue-gray">
//                 First Name
//               </Typography>
//               <Input
//                 size="lg"
//                 name="first_name"
//                 placeholder="Your Name"
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <Typography variant="h6" color="blue-gray">
//                 Last Name
//               </Typography>
//               <Input
//                 size="lg"
//                 name="last_name"
//                 placeholder="Your Name"
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <Typography variant="h6" color="blue-gray">
//                 Your Email
//               </Typography>
//               <Input
//                 size="lg"
//                 name="email"
//                 placeholder="name@mail.com"
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <Typography variant="h6" color="blue-gray">
//                 Password
//               </Typography>
//               <Input
//                 type="password"
//                 name="password"
//                 size="lg"
//                 placeholder="********"
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <Typography variant="h6" color="blue-gray">
//                 Password
//               </Typography>
//               <Input
//                 type="password"
//                 name="confirmpassword"
//                 size="lg"
//                 placeholder="********"
//                 className="!border-t-blue-gray-200 focus:!border-t-gray-900"
//               />
//             </div>
//             <Checkbox
//               label={
//                 <Typography
//                   variant="small"
//                   color="gray"
//                   className="flex items-center font-normal"
//                 >
//                   I agree the
//                   <a
//                     href="#"
//                     className="font-medium transition-colors hover:text-gray-900"
//                   >
//                     &nbsp;Terms and Conditions
//                   </a>
//                 </Typography>
//               }
//               containerProps={{ className: "-ml-2.5" }}
//             />
//             <Button
//               type="submit"
//               className="mt-6"
//               style={{ backgroundColor: "#10BB9D" }}
//               fullWidth
//             >
//               Sign Up
//             </Button>
//           </form>
//           <Typography color="gray" className="mt-4 text-center font-normal">
//             Already have an account?{" "}
//             <NavLink to={"/login"} className="font-medium text-gray-900">
//               Sign In
//             </NavLink>
//           </Typography>
//         </Card>
//       </div>
//     </div>
//   );
// }
