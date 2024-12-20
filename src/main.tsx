import "./index.css";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/store/index";

import App from "./App.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
