import { InvoiceProvider } from "./context/invoice/InvoiceContext";
import { BrowserRouter as ReactRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Invoice from "./Pages/Invoice";
import { ThemeProvider } from "./context/theme/ThemeContext";
import SideBar from "./Components/SideBar";

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
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoice/:id" element={<Invoice />} />
          </Routes>
        </ReactRouter>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;
