import React from "react";
import { Th, Tr, Checkbox } from "@chakra-ui/react";
import { requestSort, handleSelectAll } from "./helpers";

const TheadComponent = ({
  columns,
  sortConfig,
  setSortConfig,
  hiddenColumns,
  selectable,
  selectedData,
  selectedRows,
  setSelectedRows,
  tableBorderColor,
  editActive,
  deleteActive,
  handleDelete,
}) => {
  return (
    <Tr>
      {selectable && (
        <Th maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
          <Checkbox
            isChecked={selectedRows.length === selectedData.length}
            onChange={() =>
              handleSelectAll(selectedData, selectedRows, setSelectedRows)
            }
          />
        </Th>
      )}
      {columns.map(
        (col) =>
          !hiddenColumns.includes(col.key) && (
            <Th
              key={col.key}
              border="1px solid"
              borderColor={tableBorderColor}
              onClick={() => requestSort(col.key, sortConfig, setSortConfig)}
              cursor="pointer"
              maxW={col.width ? col.width : "auto"}
            >
              {col.header}
              {sortConfig.key === col.key ? (
                sortConfig.direction === "ascending" ? (
                  <span> ↑</span>
                ) : (
                  <span> ↓</span>
                )
              ) : null}
            </Th>
          )
      )}
      {editActive && (
        <Th maxW={"20px"} border="1px solid" borderColor={tableBorderColor}>
          Edit
        </Th>
      )}
      {deleteActive && (
        <Th
          maxW={"20px"}
          border="1px solid"
          borderColor={tableBorderColor}
          onClick={() => handleDelete(selectedRows)}
        >
          Delete
        </Th>
      )}
    </Tr>
  );
};

export default TheadComponent;
