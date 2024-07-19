import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Flex,
  useColorModeValue,
  Button,
  HStack,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import {
  requestSort,
  getSortedData,
  getFilteredData,
  toggleColumnVisibility,
} from "./helpers";
import { IoMdRefresh } from "react-icons/io";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { BiHide } from "react-icons/bi";

const DataTable = ({
  columns,
  data,
  totalCount,
  rowsPerPage = 10,
  onPageChange,
  onRefresh,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const tableBgColor = useColorModeValue("white", "gray.800");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage, rowsPerPage, searchTerm);
    }
  }, [currentPage, rowsPerPage, searchTerm, onPageChange]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: null });
    setCurrentPage(1);
  };

  const sortedData = useMemo(
    () => getSortedData(data, sortConfig),
    [data, sortConfig]
  );

  const filteredData = useMemo(
    () => getFilteredData(sortedData, columns, searchTerm),
    [sortedData, columns, searchTerm]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <Box
      bg={tableBgColor}
      p={4}
      boxShadow="sm"
      borderRadius="md"
      overflow={"auto"}
    >
      <Flex justify="space-between" mb={4}>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="auto"
        />
        <HStack spacing={2}>
          <Tooltip label="Refresh data" placement="top-start">
            <Button onClick={handleRefresh}>
              <IoMdRefresh />
            </Button>
          </Tooltip>
          <Tooltip label="Clear filter" placement="top-start">
            <Button onClick={handleClearFilter}>
              <FaFilterCircleXmark />
            </Button>
          </Tooltip>
          <Menu closeOnSelect={false}>
            <Tooltip label="Hide/Show columns" placement="top-start">
              <MenuButton as={Button}>
                <BiHide />
              </MenuButton>
            </Tooltip>
            <MenuList>
              {columns.map((col) => (
                <MenuItem key={col.key}>
                  <Checkbox
                    isChecked={!hiddenColumns.includes(col.key)}
                    onChange={() =>
                      toggleColumnVisibility(
                        col.key,
                        hiddenColumns,
                        setHiddenColumns
                      )
                    }
                  >
                    {col.header}
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
      <Table variant="striped" colorScheme="gray" bg={tableBgColor}>
        <Thead>
          <Tr>
            {columns.map(
              (col) =>
                !hiddenColumns.includes(col.key) && (
                  <Th
                    key={col.key}
                    border="1px solid"
                    borderColor={tableBorderColor}
                    onClick={() =>
                      requestSort(col.key, sortConfig, setSortConfig)
                    }
                    cursor="pointer"
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
          </Tr>
        </Thead>
        <Tbody>
          {selectedData.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map(
                (col) =>
                  !hiddenColumns.includes(col.key) && (
                    <Td key={col.key}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </Td>
                  )
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default DataTable;
