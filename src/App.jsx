import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Invoice from "./Pages/Invoice";
import { InvoiceProvider } from "./context/invoice/InvoiceContext";
import { UserProvider } from "./context/user/UserContext";
import { ThemeProvider } from "./context/theme/ThemeContext";

import SideBar from "./Components/layout/SideBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.cookie = "uuid=9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
  });
  return (
    <ThemeProvider>
      <UserProvider>
        <InvoiceProvider>
          <Router>
            <div className="flex">
              <SideBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/invoice/:id" element={<Invoice />} />
              </Routes>
            </div>
          </Router>
          <ToastContainer />
        </InvoiceProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
