import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Loginpage';
import Main from './pages/Mainpage';
import Navbar from './components/Navbar';
import Notfound from './pages/Notfoundpage';
import RequireAuth from './hooks/RequireAuth';
import { AuthorizeProvider } from './hooks/AuthorizeProvider';
import SignUp from './pages/Signuppage';

const App = () => (

  <BrowserRouter>
    <AuthorizeProvider>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="/"
            element={(
              <RequireAuth>
                <Main />
              </RequireAuth>
              )}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </AuthorizeProvider>
  </BrowserRouter>

);

export default App;
