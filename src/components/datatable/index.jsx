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
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import { requestSort, getSortedData, getFilteredData } from "./helpers";

const DataTable = ({
  columns,
  data,
  totalCount,
  rowsPerPage = 10,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const tableBgColor = useColorModeValue("white", "gray.800");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage, rowsPerPage, searchTerm);
    }
  }, [currentPage, rowsPerPage, searchTerm, onPageChange]);

  const sortedData = useMemo(
    () => getSortedData(data, sortConfig),
    [data, sortConfig]
  );

  const filteredData = useMemo(
    () => getFilteredData(sortedData, columns, searchTerm),
    [sortedData, columns, searchTerm]
  );

  const totalPages = Math.ceil(totalCount / rowsPerPage);
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
      </Flex>
      <Table variant="striped" colorScheme="gray" bg={tableBgColor}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                border="1px solid"
                borderColor={tableBorderColor}
                onClick={() => requestSort(col.key, sortConfig, setSortConfig)}
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
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {selectedData.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((col) => (
                <Td
                  key={col.key}
                  border="1px solid"
                  borderColor={tableBorderColor}
                >
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </Td>
              ))}
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
