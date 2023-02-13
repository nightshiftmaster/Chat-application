import "./App.css";
import React from "react";
import Loginpage from "./pages/Login";
import Mainpage from "./pages/Main";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notfoundpage from "./pages/Notfound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="login" element={<Loginpage />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
