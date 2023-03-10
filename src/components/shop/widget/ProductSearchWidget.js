import React, { Fragment } from "react";

function ProductSearchWidget({ query, setQuery, setFilter }) {
  const handleChange = (e) => {
    setFilter("");
    setQuery(e.target.value);
  };

  return (
    <Fragment>
      <div className="widget search-widget">
        <form onSubmit={(event) => event.preventDefault()} className="search">
          <div id="search-input">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search Product.."
            />
            <i id="ti-search" className="ti-search" />
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default ProductSearchWidget;
