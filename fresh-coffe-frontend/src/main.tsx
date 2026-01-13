import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import KioskProvider from "./context/KioskProvider";
import router from "./router";
import "./index.css";
import Modal from "react-modal"

Modal.setAppElement("#root")


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KioskProvider>


      <RouterProvider router={router} />

    </KioskProvider>

  </React.StrictMode>
);