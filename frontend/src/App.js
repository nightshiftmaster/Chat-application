import "./App.css";
import React from "react";
import Loginpage from "./pages/Login";
import Mainpage from "./pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfoundpage from "./pages/Notfound";
import RequireAuth from "./hooks/RequireAuth";
import { AuthorizeProvider } from "./hooks/AuthorizeProvider";

const App = () => {
  return (
    <AuthorizeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="login" element={<Loginpage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Mainpage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
      </BrowserRouter>
    </AuthorizeProvider>
  );
};

export default App;
