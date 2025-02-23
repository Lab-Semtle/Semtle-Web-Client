const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          처음
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "font-bold" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
          마지막
        </button>
      </div>
    );
  };
  
  export default Pagination;
  