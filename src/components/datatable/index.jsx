import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  HStack,
  useColorModeValue,
  Input,
  Flex,
} from "@chakra-ui/react";

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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item) =>
    columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "solid" : "outline"}
          >
            {i}
          </Button>
        );
      }
    } else {
      pageNumbers.push(
        <Button
          key={1}
          onClick={() => setCurrentPage(1)}
          variant={currentPage === 1 ? "solid" : "outline"}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<span key="dots1">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? "solid" : "outline"}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="dots2">...</span>);
      }

      pageNumbers.push(
        <Button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          variant={currentPage === totalPages ? "solid" : "outline"}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Box bg={tableBgColor} p={4} boxShadow="sm" borderRadius="md">
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
                onClick={() => requestSort(col.key)}
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
      <HStack justify="flex-end" mt={4}>
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          variant="outline"
        >
          Önceki
        </Button>
        {renderPageNumbers()}
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          variant="outline"
        >
          Sonraki
        </Button>
      </HStack>
    </Box>
  );
};

export default DataTable;
