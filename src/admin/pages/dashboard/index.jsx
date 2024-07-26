import React, { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
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
import { FileTypes } from "../../../components/fileupload";

// Örnek veri ve sütunlar
const columns = [
  { key: "id", header: "ID", primaryKey: true, visible: false, type: "Number" },
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
    type: "File",
  },
  { key: "name", header: "Ad", type: "String" },
  { key: "age", header: "Yaş", type: "Number" },
  { key: "email", header: "Email", type: "String" },
];

//ContexMenu itemleri
const contextMenuItems = [
  { key: "Edit", text: "Düzenle", icon: MdEdit },
  { key: "Delete", text: "Sil", icon: MdDeleteForever },
];

// Toolbar butonları
const toolbarButtons = [
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

  const handleSaveData = (newData) => {
    setTableData((prevData) => [
      ...prevData,
      { id: totalCount + 1, ...newData },
    ]);
    setTotalCount(totalCount + 1);
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
          defaultAddButton={true}
          onSave={handleSaveData}
        />
      </VStack>
    </Box>
  );
};

export default Dashboard;
