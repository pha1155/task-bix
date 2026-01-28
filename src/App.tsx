import Router from "@/routes/index";
import { useAuthInit } from "@/hooks/useAuthInit";
import { ToastContainer } from "react-toastify";

function App() {
  useAuthInit();

  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
