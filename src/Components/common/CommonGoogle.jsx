import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { jwtDecode } from "jwt-decode";

const CommonGoogle = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse, "kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        var decode = jwtDecode(credentialResponse.credential);
        console.log(decode, "pppppppp");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default CommonGoogle;
