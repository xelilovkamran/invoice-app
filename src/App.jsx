import SideBar from "@/Components/layout/sideBar/SideBar";
import Home from "@/Pages/Home";
import Invoice from "@/Pages/Invoice";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    useEffect(() => {
        document.cookie = "uuid=9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
    });

    return (
        <>
            <Router>
                <div className=" flex tablet:flex-row flex-col">
                    <SideBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/invoice/:id" element={<Invoice />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
