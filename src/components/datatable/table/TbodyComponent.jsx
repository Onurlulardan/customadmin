import React from "react";
import PropTypes from "prop-types";
import { Tr, Td, Checkbox, Button, IconButton } from "@chakra-ui/react";
import { MdEdit, MdDelete } from "react-icons/md";

const TbodyComponent = ({
  columns,
  selectedData,
  hiddenColumns,
  selectable,
  selectedRows,
  setSelectedRows,
  handleSelectRow,
  handleRightClick,
  handleDelete,
  editActive,
  onEdit,
  deleteActive,
  loading,
}) => {
  if (loading) {
    return (
      <Tr>
        <Td colSpan={columns.length + 2} textAlign="center">
          Yükleniyor...
        </Td>
      </Tr>
    );
  }

  return (
    <>
      {selectedData.map((row) => (
        <Tr
          key={row.id}
          onContextMenu={(e) => handleRightClick(e, row)}
          cursor="context-menu"
        >
          {selectable && (
            <Td>
              <Checkbox
                isChecked={selectedRows.includes(row.id)}
                onChange={() => handleSelectRow(row.id)}
              />
            </Td>
          )}
          {columns.map(
            (column) =>
              !hiddenColumns.includes(column.key) &&
              !column.primaryKey && (
                <Td key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </Td>
              )
          )}
          {editActive && (
            <Td>
              <IconButton
                colorScheme="blue"
                icon={<MdEdit />}
                onClick={() => onEdit(row)}
              />
            </Td>
          )}
          {deleteActive && (
            <Td>
              <IconButton
                colorScheme="red"
                icon={<MdDelete />}
                onClick={() => handleDelete([row.id])}
              />
            </Td>
          )}
        </Tr>
      ))}
    </>
  );
};

TbodyComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      primaryKey: PropTypes.bool,
      visible: PropTypes.bool,
      render: PropTypes.func,
      width: PropTypes.string,
    })
  ).isRequired,
  selectedData: PropTypes.array.isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedRows: PropTypes.func.isRequired,
  handleSelectRow: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editActive: PropTypes.bool,
  onEdit: PropTypes.func,
  deleteActive: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default TbodyComponent;
