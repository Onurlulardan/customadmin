import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Table, Thead, Tbody, Box, useColorModeValue } from "@chakra-ui/react";
import Pagination from "../plugin/Pagination";
import {
  getSortedData,
  getFilteredData,
  toggleColumnVisibility,
  handleSelectRow,
  useDeleteConfirmation,
} from "../functions/helpers";
import ContextMenu from "../plugin/ContextMenu";
import ShowConfirm from "../plugin/ShowConfirm";
import TheadComponent from "./TheadComponent";
import TbodyComponent from "./TbodyComponent";
import TableControls from "./TableControls";
import DataTableDrawer from "../plugin/DataTableDrawer";

const DataTable = ({
  columns,
  data,
  totalCount,
  rowsPerPage = 10,
  onDataChange,
  onRefresh,
  deleteActive = false,
  onDelete,
  editActive = false,
  selectable = false,
  onDeleteSelected,
  rowsPerPageOptions = [5, 10, 20, 50],
  contextMenuItems = [],
  onItemClick,
  toolbarButtons = [],
  onToolbarButtonClick,
  defaultAddButton = false,
  onSave,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const tableBgColor = useColorModeValue("white", "gray.800");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");

  const {
    isModalOpen,
    showConfirmModal,
    handleModalClose,
    handleModalConfirm,
    deleteTarget,
  } = useDeleteConfirmation();

  useEffect(() => {
    setLoading(true);
    if (onDataChange) {
      onDataChange({ currentPage, rowsPerPageState, searchTerm });
    }
    setLoading(false);
  }, [currentPage, rowsPerPageState, searchTerm, onDataChange]);

  const handleRefresh = () => {
    setLoading(true);
    if (onRefresh) {
      onRefresh();
    }
    setLoading(false);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  const handleRightClick = (event, item) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      rowData: item,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDeleteSelected = async (selectedRows) => {
    const confirm = await showConfirmModal(selectedRows);
    if (confirm) {
      onDeleteSelected(selectedRows);
    }
  };

  const handleDelete = async (rowId) => {
    const primaryKey = columns.find((col) => col.primaryKey).key;
    const rowData = data.find((row) => row[primaryKey] === rowId);
    const confirm = await showConfirmModal([rowId]);
    if (confirm) {
      onDelete(rowId);
    }
  };

  const handleToolbarButtonClick = (key) => {
    if (key === "DefaultAdd") {
      setDrawerData({});
      setEditMode(false);
      setIsDrawerOpen(true);
    }
    const primaryKey = columns.find((col) => col.primaryKey).key;
    const selectedData = data.filter((row) =>
      selectedRows.includes(row[primaryKey])
    );
    console.log("Seçili Satırlar:", key, selectedData);
  };

  const handleEdit = (rowData) => {
    setDrawerData(rowData);
    setEditMode(true);
    setIsDrawerOpen(true);
  };

  const handleSave = (newData) => {
    if (editMode) {
      const updatedData = tableData.map((item) =>
        item.id === newData.id ? newData : item
      );
      setTableData(updatedData);
    } else {
      setTableData((prevData) => [
        ...prevData,
        { id: totalCount + 1, ...newData },
      ]);
      setTotalCount(totalCount + 1);
    }
  };

  const sortedData = useMemo(
    () => getSortedData(data, sortConfig),
    [data, sortConfig]
  );

  const filteredData = useMemo(
    () => getFilteredData(sortedData, columns, searchTerm),
    [sortedData, columns, searchTerm]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPageState);
  const startIndex = (currentPage - 1) * rowsPerPageState;
  const selectedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPageState
  );

  return (
    <Box bg={tableBgColor} p={4} boxShadow="sm" overflow={"auto"}>
      <TableControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectable={selectable}
        selectedRows={selectedRows}
        handleDeleteSelected={handleDeleteSelected}
        handleRefresh={handleRefresh}
        handleClearFilter={handleClearFilter}
        columns={columns}
        hiddenColumns={hiddenColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        setHiddenColumns={setHiddenColumns}
        toolbarButtons={toolbarButtons}
        onToolbarButtonClick={handleToolbarButtonClick}
        defaultAddButton={defaultAddButton}
      />
      <Table variant="striped" colorScheme="gray" bg={tableBgColor}>
        <Thead>
          <TheadComponent
            columns={columns}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            hiddenColumns={hiddenColumns}
            selectable={selectable}
            selectedData={selectedData}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            tableBorderColor={tableBorderColor}
            editActive={editActive}
            deleteActive={deleteActive}
            handleDelete={handleDelete}
          />
        </Thead>
        <Tbody>
          <TbodyComponent
            columns={columns}
            selectedData={selectedData}
            hiddenColumns={hiddenColumns}
            selectable={selectable}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleSelectRow={handleSelectRow}
            handleRightClick={handleRightClick}
            handleDelete={handleDelete}
            editActive={editActive}
            onEdit={handleEdit}
            deleteActive={deleteActive}
            loading={loading}
          />
        </Tbody>
      </Table>
      {contextMenu && (
        <ContextMenu
          items={contextMenuItems}
          onClose={handleClose}
          rowData={contextMenu.rowData}
          position={contextMenu}
          onItemClick={onItemClick}
        />
      )}
      <ShowConfirm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        deleteTarget={deleteTarget}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPageState}
        setRowsPerPage={setRowsPerPageState}
        rowsPerPageOptions={rowsPerPageOptions}
      />
      <DataTableDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        columns={columns}
        onSave={handleSave}
        editMode={editMode}
        editData={drawerData}
      />
    </Box>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      primaryKey: PropTypes.bool,
      visible: PropTypes.bool,
      render: PropTypes.func,
      width: PropTypes.string,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  onDataChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  deleteActive: PropTypes.bool,
  onDelete: PropTypes.func,
  editActive: PropTypes.bool,
  selectable: PropTypes.bool,
  onDeleteSelected: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  contextMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
  onItemClick: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    })
  ),
  onToolbarButtonClick: PropTypes.func.isRequired,
  defaultAddButton: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

export default DataTable;
