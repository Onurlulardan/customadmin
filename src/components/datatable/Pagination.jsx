import React from "react";
import { Button, HStack, Select } from "@chakra-ui/react";

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
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
    <HStack justify="flex-end" mt={4} gap={4}>
      <HStack>
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
        <Select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          width="auto"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </HStack>
    </HStack>
  );
};

export default Pagination;
