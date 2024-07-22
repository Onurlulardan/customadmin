import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/pages/dashboard";
import MyForm from "../admin/pages/form";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="form" element={<MyForm />} />
    </Routes>
  );
};

export default AdminRoutes;
