import { BrowserRouter as ReactRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Invoice from "./Pages/Invoice";
import { InvoiceProvider } from "./context/invoice/InvoiceContext";
import { ThemeProvider } from "./context/theme/ThemeContext";

import SideBar from "./Components/SideBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // TODO: ADD PRIVATE ROUTE, IF USER TRY TO OPEN PAGE OF INVOICE UNDEFINED ID, REDIRECT TO HOME PAGE
  // const [imageUrl, setImageUrl] = useState("");

  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     const res = await fetch("http://localhost:3005/users");
  //     const data = await res.json();
  //     const imageUrl = data[0].avatar;
  //     setImageUrl(imageUrl);
  //   };

  //   fetchAvatar();
  // }, []);

  return (
    <ThemeProvider>
      <InvoiceProvider>
        <ReactRouter>
          <div className="flex">
            <SideBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/invoice/:id" element={<Invoice />} />
            </Routes>
          </div>
        </ReactRouter>
        <ToastContainer />
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
