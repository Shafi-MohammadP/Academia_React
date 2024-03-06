import React from "react";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetEmail } from "../../redux/Email";
import mail from "../../assets/mailImage.jpg";
// import logo from "../../assets/Company_Logo.png";

function EmailCheck() {
  const dispatch = useDispatch();

  // Correct the use of useSelector
  const email = useSelector((state) => state.email.userEmail);

  const Gmail = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    dispatch(resetEmail());
  };

  return (
    <>
      <div className="grid grid-rows mt-48">
        <div className="container mx-auto grid grid-rows-[13rem,5rem,3rem,5rem,4rem] -mt-32">
          <div className="flex justify-center">
            <img
              className="w-60"
              src={mail}
              style={{ width: "full" }}
              alt="mail image"
            />
          </div>
          <div className="mt-5 flex justify-center">
            <p className="font-roboto-mono font-semibold sm:text-2xl text-xl">
              Verify your email to continue
            </p>
          </div>
          <div className="flex items-center justify-center">
            <p className="font-prompt text-center text-md">
              Please check your email and select the <br /> link provided to
              verify your address.
            </p>
          </div>
          <div className="text-sm sm:mt-0 mt-8 text-[#051339] font-bold flex justify-center">
            <p className="cursor-pointer"> {email.email}</p>
          </div>
          <div className="flex justify-center ">
            <div className="flex justify-between sm:text-lg text-sm">
              <Button
                onClick={Gmail}
                className="text-white bg-[#051339]  sm:px-6 px-4 ms-5 my-2 xs:me-0 me-3 font-prompt-normal"
              >
                Go to Gmail inbox
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailCheck;
