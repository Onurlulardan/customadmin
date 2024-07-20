import React, { useState, useEffect } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable";
import { data } from "../../../data/fakeUserData";
import avatar from "../../../assets/pp.webp";
import { setPageHeader } from "../../../store/root/rootSlice";
import { useDispatch } from "react-redux";
import { MdEdit, MdDeleteForever } from "react-icons/md";

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
    width: "80px",
  },
  { key: "id", header: "ID", primaryKey: true },
  { key: "name", header: "Name" },
  { key: "age", header: "Age" },
  { key: "email", header: "Email" },
];

//ContexMenu items
const contextMenuItems = [
  { key: "edit", text: "Edit", icon: MdEdit },
  { key: "delete", text: "Delete", icon: MdDeleteForever },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState(data);
  const [totalCount, setTotalCount] = useState(data.length);

  useEffect(() => {
    dispatch(setPageHeader("Dashboard"));
  }, [dispatch]);

  const fetchData = ({ currentPage, rowsPerPageState, searchTerm }) => {
    console.log("Fetching data with params:", {
      currentPage,
      rowsPerPageState,
      searchTerm,
    });

    setTableData(data);
    setTotalCount(data.length);
  };

  const handleItemClick = (key, rowData) => {
    if (key === "edit") {
      console.log("Edit", rowData);
    } else if (key === "delete") {
      console.log("Delete", rowData);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <DataTable
          columns={columns}
          data={tableData}
          totalCount={totalCount}
          rowsPerPage={5}
          onDataChange={fetchData}
          handleRefresh={() => {
            return data;
          }}
          deleteActive={true}
          onDelete={(e) => {
            console.log(e);
          }}
          editActive={true}
          onEdit={(e) => {
            console.log(e);
          }}
          selectable={true}
          onDeleteSelected={(e) => {
            console.log(e);
          }}
          contextMenuItems={contextMenuItems}
          onItemClick={handleItemClick}
        />
      </VStack>
    </Box>
  );
};

export default Dashboard;
