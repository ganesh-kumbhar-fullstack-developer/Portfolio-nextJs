"use client";
import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme="dark"
      style={{ top: "72px" }}
    />
  );
};

export default ToastProvider;
