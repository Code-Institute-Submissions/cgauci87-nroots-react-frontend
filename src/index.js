import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CartContext from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyleProvider } from "@ant-design/cssinjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyleProvider hashPriority="high">
    <CartContext>
      <AuthContextProvider>
        <React.StrictMode>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </CartContext>
  </StyleProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
