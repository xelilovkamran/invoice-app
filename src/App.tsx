import AppRouter from "@/routes/AppRouter";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    useEffect(() => {
        document.cookie = "uuid=9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
    });

    return (
        <>
            <AppRouter />
            <ToastContainer />
        </>
    );
}

export default App;
