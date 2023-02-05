import React, { Fragment } from "react";

function SearchWidget({ query, setQuery }) {
  return (
    <Fragment>
      <div className="widget search-widget">
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Product.."
            />
            <button type="submit">
              <i className="ti-search" />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SearchWidget;
