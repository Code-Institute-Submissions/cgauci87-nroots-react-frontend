import React, { Fragment } from "react";

/**
 * Pagination component
 */
function Pagination({
  extraClass,
  total,
  currentPage,
  pageSize,
  setCurrentPage,
}) {
  const links = [];
  for (let i = 0; i * pageSize < total; i++) {
    links.push(
      <li key={i} className={currentPage === i + 1 ? "active" : ""}>
        <button onClick={(e) => setCurrentPage(i + 1)}>{i + 1}</button>
      </li>
    );
  }

  return (
    <Fragment>
      <div className={"pagination-wrapper " + extraClass}>
        <ul className="pg-pagination">
          {currentPage > 1 ? (
            <li>
              <button
                onClick={(e) => setCurrentPage(currentPage - 1)}
                aria-label="Previous"
              >
                <i className="fi flaticon-back" />
              </button>
            </li>
          ) : null}
          {links}
          {currentPage * pageSize < total ? (
            <li>
              <div id="btn-next">
                <button
                  onClick={(e) => setCurrentPage(currentPage + 1)}
                  aria-label="Next"
                >
                  <i className="fi flaticon-next" />
                </button>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </Fragment>
  );
}

export default Pagination;
