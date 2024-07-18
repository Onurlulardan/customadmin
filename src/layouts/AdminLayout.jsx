import React from "react";
import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar";
import AdminRoutes from "../routes/AdminRoutes";

const AdminLayout = () => {
  return (
    <Flex minH="100vh" direction="column">
      <SidebarWithHeader>
        <AdminRoutes />
      </SidebarWithHeader>
    </Flex>
  );
};

export default AdminLayout;
