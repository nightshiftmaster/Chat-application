import "./App.css";
import React from "react";
import { Login } from "./pages/Loginpage";
import { Main } from "./pages/Mainpage";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notfound } from "./pages/Notfoundpage";
import RequireAuth from "./hooks/RequireAuth";
import { AuthorizeProvider } from "./hooks/AuthorizeProvider";
import { SignUp } from "./pages/Signuppage";
import { Provider } from "@rollbar/react";

const App = () => {
  const rollbarConfig = {
    accessToken: "POST_CLIENT_ITEM_ACCESS_TOKEN",
    environment: "production",
  };
  return (
    <Provider config={rollbarConfig}>
      <AuthorizeProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthorizeProvider>
    </Provider>
  );
};

export default App;
