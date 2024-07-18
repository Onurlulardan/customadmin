import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/pages/dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
