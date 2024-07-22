import React from "react";
import {
  Tbody,
  Tr,
  Td,
  Checkbox,
  Flex,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

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
        <Td colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justifyContent="center" alignItems="center" minH={"300px"}>
            <Spinner size="lg" />
          </Flex>
        </Td>
      </Tr>
    );
  }

  if (selectedData.length === 0) {
    return (
      <Tr>
        <Td colSpan={columns.length + (selectable ? 3 : 2)}>
          <Flex justifyContent="center" alignItems="center" minH={"300px"}>
            <Text>Gösterilecek bir data yok!</Text>
          </Flex>
        </Td>
      </Tr>
    );
  }

  return (
    <>
      {selectedData.map((item, rowIndex) => {
        const primaryKey = columns.find((col) => col.primaryKey).key;
        const primaryKeyValue = item[primaryKey];
        return (
          <Tr
            key={rowIndex}
            onContextMenu={(event) => handleRightClick(event, item)}
          >
            {selectable && (
              <Td maxW={"20px"}>
                <Checkbox
                  isChecked={selectedRows.includes(item.id)}
                  onChange={() =>
                    handleSelectRow(item.id, selectedRows, setSelectedRows)
                  }
                />
              </Td>
            )}
            {columns.map(
              (col) =>
                !hiddenColumns.includes(col.key) &&
                col.visible !== false && (
                  <Td
                    key={col.key}
                    onClick={() =>
                      handleSelectRow(item.id, selectedRows, setSelectedRows)
                    }
                    maxW={col.width ? col.width : "auto"}
                  >
                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key]}
                  </Td>
                )
            )}
            {editActive && (
              <Td maxW={"20px"}>
                <Flex justify="center">
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      onEdit(primaryKeyValue);
                    }}
                  >
                    <MdEdit />
                  </Button>
                </Flex>
              </Td>
            )}
            {deleteActive && (
              <Td maxW={"20px"}>
                <Flex justify="center">
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete([primaryKeyValue])}
                  >
                    <MdDeleteForever />
                  </Button>
                </Flex>
              </Td>
            )}
          </Tr>
        );
      })}
    </>
  );
};

export default TbodyComponent;
