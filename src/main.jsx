import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleClindId } from "./Constants/Constants.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={GoogleClindId}>
        <Router>
          <MainRoutes />
        </Router>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
