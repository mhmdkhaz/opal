import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // router dom
import "./i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Suspense fallback="Loading..."> */}
      <App />
      {/* </Suspense> */}
    </BrowserRouter>
  </StrictMode>
);
