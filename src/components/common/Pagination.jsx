import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const pages = Array.from({ length: totalPages });
  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
        {/* Prev */}
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2 text-sm">
          {pages.map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 flex items-center justify-center ${
                  currentPage === page
                    ? "text-indigo-500 border border-indigo-200 rounded-full"
                    : ""
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="rounded-full bg-slate-200/50 disabled:opacity-40"
        >
          <svg
            className="rotate-180"
            width="40"
            height="40"
            viewBox="0 0 40 40"
          >
            <path
              d="M22.5 12.85l-6.25 6.25 6.25 6.25"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
