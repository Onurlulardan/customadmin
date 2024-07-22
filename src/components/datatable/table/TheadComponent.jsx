import React from "react";
import { Th, Tr, Checkbox } from "@chakra-ui/react";
import { requestSort, handleSelectAll } from "../functions/helpers";

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
            isChecked={
              selectedRows.length === selectedData.length &&
              selectedData.length > 0
            }
            onChange={() =>
              handleSelectAll(selectedData, selectedRows, setSelectedRows)
            }
          />
        </Th>
      )}
      {columns.map(
        (col) =>
          !hiddenColumns.includes(col.key) &&
          col.visible !== false && (
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
          Düzenle
        </Th>
      )}
      {deleteActive && (
        <Th
          maxW={"20px"}
          border="1px solid"
          borderColor={tableBorderColor}
        >
          Sil
        </Th>
      )}
    </Tr>
  );
};

export default TheadComponent;
