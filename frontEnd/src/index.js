import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginModalContextProvider } from "./context/LoginModalContext";
import { UserContextProvider } from "./context/UserContext";
import { PetContextProvider } from "./context/PetContext";

import { Provider } from "react-redux";
import store from "./redux/store";
import { ComponentContextProvider } from "./context/ComponentContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ComponentContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <LoginModalContextProvider>
            <PetContextProvider>
              <App />
            </PetContextProvider>
          </LoginModalContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ComponentContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
