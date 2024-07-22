import React, { useState, useEffect } from "react";
import { Box, VStack, Heading } from "@chakra-ui/react";
import DataTable from "../../../components/datatable/table/DataTable";
import { data } from "../../../data/fakeUserData";
import avatar from "../../../assets/pp.webp";
import { setPageHeader } from "../../../store/root/rootSlice";
import { useDispatch } from "react-redux";
import {
  MdEdit,
  MdDeleteForever,
  MdFileDownload,
  MdFileUpload,
} from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

// Örnek veri ve sütunlar
const columns = [
  { key: "id", header: "ID", primaryKey: true, visible: false },
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
  { key: "name", header: "Ad" },
  { key: "age", header: "Yaş" },
  { key: "email", header: "Email" },
];

//ContexMenu itemleri
const contextMenuItems = [
  { key: "Edit", text: "Düzenle", icon: MdEdit },
  { key: "Delete", text: "Sil", icon: MdDeleteForever },
];

// Toolbar butonları
const toolbarButtons = [
  { key: "Add", header: "Yeni Ekle", icon: IoIosAdd },
  { key: "Export", header: "Export", icon: MdFileDownload },
  { key: "Import", header: "Import", icon: MdFileUpload },
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
    if (key === "Edit") {
      console.log(key, rowData);
    } else if (key === "Delete") {
      console.log(key, rowData);
    }
  };

  const handleToolbarButtonClick = (key, selectedRowsData) => {
    console.log("Tıklanan Buton:", key);
    console.log("Seçili Satırlar:", selectedRowsData);
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
          toolbarButtons={toolbarButtons}
          onToolbarButtonClick={(key) =>
            handleToolbarButtonClick(
              key,
              tableData.filter((row) => row.selected)
            )
          }
        />
      </VStack>
    </Box>
  );
};

export default Dashboard;
