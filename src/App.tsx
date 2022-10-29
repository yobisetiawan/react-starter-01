import React from "react";
import { Route, Routes } from "react-router-dom";

import "./assets/scss/App.scss";
import NoMatch404 from "./components/errors/NoMatch404";
import AppLayout from "./components/layouts/AppLayout";
import About from "./pages/About";
import ForgotPasword from "./pages/Auth/ForgotPasword";
import ForgotPaswordToken from "./pages/Auth/ForgotPaswordToken";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
 
import CrudExample from "./pages/CrudExample";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="crud-example" element={<CrudExample />} />
          <Route path="profile" element={<Profile />} />
          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPasword />} />
          <Route path="forgot-password-token" element={<ForgotPaswordToken />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route path="*" element={<NoMatch404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
