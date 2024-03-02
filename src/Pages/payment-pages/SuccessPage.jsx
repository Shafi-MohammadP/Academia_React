import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../Constants/Constants";
import PaymentLoader from "./payment-loader/PaymentLoader";
function SuccessPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const userId = queryParameters.get("userId");
  const courseId = queryParameters.get("courseId");
  const tutorId = queryParameters.get("tutorId");
  console.log(userId, courseId, tutorId);
  const isInitializedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showLoadingComponent, setShowLoadingComponent] = useState(true);

  useLayoutEffect(() => {
    console.log("useLayoutEffect - Component mounted");
    return () => {
      console.log("useLayoutEffect - Component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect - Component rendered");

    if (!isInitializedRef.current) {
      console.log("useEffect - Running fetchData");

      // Show the loading component for the first 3 seconds
      const loadingTimeout = setTimeout(() => {
        setShowLoadingComponent(false);
      }, 3000);

      const purchaseCourse = async () => {
        const apiUrl = `${BaseUrl}course/purchase_course/`;
        const tokenDataString = localStorage.getItem("authToken");
        const tokenData = JSON.parse(tokenDataString);
        const accessToken = tokenData ? tokenData.access : null;
        console.log(accessToken, tokenData);
        const data = {
          student: userId,
          course: courseId,
          tutor: tutorId,
        };
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
          });

          if (response.status === 201) {
            setSuccess(true);
          } else {
            setSuccess(false);
          }
        } catch (err) {
          console.error(err, "Error found on purchase");
          setSuccess(false);
        } finally {
          setLoading(false);
          clearTimeout(loadingTimeout);
        }
      };
      purchaseCourse();
      isInitializedRef.current = true;
    }

    return () => {
      console.log("useEffect - Cleanup");
    };
  }, [userId, courseId]);

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className={`w-16 h-16 mx-auto my-6 ${
              loading
                ? "text-blue-500"
                : success
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="20"
            >
              {loading ? <PaymentLoader /> : success ? "✅" : "❌"}
            </text>
          </svg>
          <div className="text-center">
            {!loading && success && (
              <>
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p className="text-gray-600 my-2">
                  Thank you for purchasing the course .
                </p>
                <p> Have a great way to success! </p>
                <div className="py-10 text-center">
                  <Link to="/">
                    <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK
                    </button>
                  </Link>
                </div>
              </>
            )}
            {!loading && !success && (
              <>
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Failed
                </h3>
                <p>
                  There was an issue processing your payment. Please try again
                  later.
                </p>
                <div className="py-10 text-center">
                  <Link to="/">
                    <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
