import React from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";
import { data } from "../../../data/fakeUserData";
import avatar from "../../../assets/pp.webp";

const Dashboard = () => {
  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      width: "100px",
      render: () => (
        <img
          src={avatar}
          alt="user"
          style={{ maxWidth: "100px", height: "auto" }}
        />
      ),
    },
    { key: "id", header: "ID", width: "50px" },
    { key: "name", header: "Name", width: "150px" },
    { key: "age", header: "Age", width: "100px" },
    { key: "email", header: "Email", width: "200px" },
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
