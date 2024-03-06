import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { jwtDecode } from "jwt-decode";

const CommonGoogle = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        var decode = jwtDecode(credentialResponse.credential);
      }}
      onError={() => {}}
    />
  );
};

export default CommonGoogle;
