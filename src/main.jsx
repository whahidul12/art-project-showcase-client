import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Routes from "./Routes/Routes.jsx";
import ThemeProvider from "./Context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={Routes} />
    </ThemeProvider>
  </StrictMode>,
);
