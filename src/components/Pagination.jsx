import React from "react";

const Pagination = ({
  displaysPerPage,
  totalDisplay,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDisplay / displaysPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              style={{ borderColor: currentPage === number ? "red" : "" }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
