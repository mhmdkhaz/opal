import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetLanguage } from "../../../hooks/useGetLanguage.js";
import "./ToastProvider.css";

const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

const ToastProvider = () => {
  const language = useGetLanguage();
  const [toastPosition, setToastPosition] = useState("top-right");

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 600) {
        setToastPosition("bottom-center");
      } else {
        setToastPosition(language === "ar" ? "top-right" : "top-left");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => window.removeEventListener("resize", updatePosition);
  }, [language]);

  return (
    <ToastContainer
      position={toastPosition}
      autoClose={750}
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
    />
  );
};

export { showToast, ToastProvider };
