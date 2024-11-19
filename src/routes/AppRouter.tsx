import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "@/components/routing/PrivateRoute";
import AuthCallback from "@/Pages/AuthCallback";
import ForgotPassword from "@/Pages/ForgotPassword";
import Home from "@/Pages/Home";
import Invoice from "@/Pages/Invoice";
import Profile from "@/Pages/Profile";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";

function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/invoice/:id" element={<Invoice />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
