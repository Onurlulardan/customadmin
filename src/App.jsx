import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/home";
import Login from "./admin/pages/auth/login";
import Signup from "./admin/pages/auth/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
