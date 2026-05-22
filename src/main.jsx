import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import router from "./router/router";
import AuthProvider from "./provider/AuthProvider";
import AppStateProvider from "./provider/AppStateProvider";
// import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppStateProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AppStateProvider>
    </AuthProvider>
  </StrictMode>
);