import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function CustomeToast({ message, icon, closeToast }) {
  return (
    <div className="custom-warning-toast flex">
      <FontAwesomeIcon
        className="text-yellow-900 mt-3"
        style={{ fontWeight: "bold", fontSize: "30px" }}
        icon={icon}
      />
      <p className="text-black flex flex-wrap ml-5 mt-3">{message}</p>
      <button className="custom-warning-close" onClick={closeToast}></button>
    </div>
  );
}

export default CustomeToast;
