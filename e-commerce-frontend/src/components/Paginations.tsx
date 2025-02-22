import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="bg-blue-400 text-white py-2 px-4 rounded mx-2 cursor-pointer"
      >
        Previous
      </button>
      <span className="self-center text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-blue-400 text-white py-2 px-4 rounded mx-2 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
