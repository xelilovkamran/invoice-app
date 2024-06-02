import SideBar from "@/components/layout/sideBar/SideBar";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Invoice from "@/pages/Invoice";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <div className=" flex tablet:flex-row flex-col">
                <SideBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/invoice/:id" element={<Invoice />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
