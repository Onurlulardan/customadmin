import React, { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";
import { data } from "../../../data/fakeUserData";
import avatar from "../../../assets/pp.webp";

const Dashboard = () => {
  // Örnek veri ve sütunlar

  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      render: () => (
        <img
          src={avatar}
          alt="user"
          style={{ maxWidth: "100px", height: "auto" }}
        />
      ),
    },
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
    { key: "email", header: "Email" },
  ];

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg">
          Dashboard
        </Heading>
        <DataTable
          columns={columns}
          data={data}
          totalCount={data.length}
          rowsPerPage={5}
          onPageChange={null}
        />
      </VStack>
    </Box>
  );
};

export default Dashboard;
