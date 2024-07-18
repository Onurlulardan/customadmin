import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarWithHeader from "../components/sidebar";
import Dashboard from "../admin/pages/dashboard";

const AdminLayout = () => {
  return (
    <div>
      <SidebarWithHeader />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
