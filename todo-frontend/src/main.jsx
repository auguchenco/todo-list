import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UtilsProvider } from "./context/Utils";

import "./assets/styles/__reset.scss";
import "./assets/styles/__global.scss";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UtilsProvider>
      <App />
    </UtilsProvider>
  </StrictMode>
);
