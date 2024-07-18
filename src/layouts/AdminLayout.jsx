import React from "react";
import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../components/sidebar";
import AdminRoutes from "../routes/AdminRoutes";
import Dashboard from "../admin/pages/dashboard";

const AdminLayout = () => {
  return (
    <div>
      <SidebarWithHeader />
      <AdminRoutes />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
