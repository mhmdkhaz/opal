import "./App.css";
import { ToastProvider } from "./components/shared/Toast/ToastProvider";
import AppRouting from "./AppRouting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const lan = localStorage.getItem("i18nextLng");
    document.documentElement.dir = lan === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <AppRouting />
      </QueryClientProvider>
    </>
  );
}

export default App;
