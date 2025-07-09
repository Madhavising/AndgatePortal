import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = "",
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden sm:flex justify-between items-center text-sm text-gray-600">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden mt-4 flex flex-col items-center gap-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
