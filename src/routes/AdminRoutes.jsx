import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/pages/dashboard";
import MyForm from "../admin/pages/form";
import Favorites from "../admin/pages/favorites";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="form" element={<MyForm />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  );
};

export default AdminRoutes;
