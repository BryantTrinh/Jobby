import React from 'react';
import { Button, HStack, Text } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <HStack spacing={2} justify="center" mb={4}>
      {totalPages === 0 ? (
        <Text>No jobs available</Text>
      ) : (
        <>
          <Button size="sm" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
            {'<<'}
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              size="sm"
              colorScheme={page === currentPage ? 'teal' : 'gray'}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </Button>
          ))}
          <Button size="sm" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
            {'>>'}
          </Button>
        </>
      )}
    </HStack>
  );
};

export default Pagination;
