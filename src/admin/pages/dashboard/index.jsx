import React, { useState } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";

const Dashboard = () => {
  // Örnek veri ve sütunlar
  const data = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", age: 22, email: "alice@example.com" },
    { id: 4, name: "Bob Brown", age: 45, email: "bob@example.com" },
    { id: 5, name: "Charlie Davis", age: 30, email: "charlie@example.com" },
    { id: 6, name: "David Evans", age: 29, email: "david@example.com" },
    { id: 7, name: "Ella Green", age: 25, email: "ella@example.com" },
    { id: 8, name: "Frank Harris", age: 50, email: "frank@example.com" },
    { id: 9, name: "Grace Ivers", age: 27, email: "grace@example.com" },
    { id: 10, name: "Hank James", age: 33, email: "hank@example.com" },
    { id: 11, name: "Ivy King", age: 21, email: "ivy@example.com" },
    { id: 12, name: "Jack Lewis", age: 40, email: "jack@example.com" },
  ];

  const columns = [
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
