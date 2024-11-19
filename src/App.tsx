import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import AppRouter from "@/routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
