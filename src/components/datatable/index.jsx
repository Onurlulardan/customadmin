import React, { useState } from "react";
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

const DataTable = ({ columns, data, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const tableBgColor = useColorModeValue("white", "gray.800");
  const tableBorderColor = useColorModeValue("gray.200", "gray.600");

  // Arama terimine göre filtreleme
  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Hesaplanmış veriler
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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
              <Th key={col.key} border="1px solid" borderColor={tableBorderColor}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {selectedData.map((item, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={col.key} border="1px solid" borderColor={tableBorderColor}>
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
        {[...Array(totalPages).keys()].map((page) => (
          <Button
            key={page + 1}
            onClick={() => setCurrentPage(page + 1)}
            variant={currentPage === page + 1 ? "solid" : "outline"}
          >
            {page + 1}
          </Button>
        ))}
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
