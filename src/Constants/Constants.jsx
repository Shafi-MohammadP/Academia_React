export const studentSugnupUrl = import.meta.env.VITE_studentSugnupUrl;
export const tutorSugnupUrl = import.meta.env.VITE_tutorSugnupUrl;
export const loginUrl = import.meta.env.VITE_loginUrl;
export const stdentlistingUrl = import.meta.env.VITE_stdentlistingUrl;
export const tutorlistingUrl = import.meta.env.VITE_tutorlistingUrl;
export const GoogleClindId = import.meta.env.VITE_Clind_Id;
export const GoogleLoginUrl = import.meta.env.VITE_googleLoginUrl;
export const commonSignupurl = import.meta.env.VITE_Signup;
export const tutorProfileShow = import.meta.env.VITE_profileTutor;
export const BaseUrl = import.meta.env.VITE_baseUrl;
export const imageBaseUrl = import.meta.env.VITE_imageBase;
const tokenDataString = localStorage.getItem("authToken");
const tokenData = JSON.parse(tokenDataString);
const accessToken = tokenData ? tokenData.access : null;
export const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${accessToken}`,
  },
};
export const ApplicationConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};
