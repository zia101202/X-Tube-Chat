
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./redux/store/store.js";
import { Provider } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Py8G0068qvcgsZL9pki2lBwGT8UgqE4FHwS6TGIg5yD21296zjTqrHLil0kbQsyV8R5EOQYmSyTR5TdWmWVvBPe006tX3rVyP"
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <Auth0Provider
        domain="dev-1hovzt8s4d4t0xbb.us.auth0.com"
        clientId="41lmfwsxO4u6Grch6b5c7am8HQu58Eyu"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </Elements>
  </StrictMode>
);
