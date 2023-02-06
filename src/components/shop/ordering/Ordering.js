import React, { Fragment } from "react";

function Ordering({ setOrdering }) {
  return (
    <Fragment>
      <form className="ecom-ordering" method="get">
        <select
          name="orderby"
          className="orderby"
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="&ordering=-created_at">Default sort: newness</option>
          <option value="&ordering=price">Sort by price: low to high</option>
          <option value="&ordering=-price">Sort by price: high to low</option>
        </select>
        <input type="hidden" name="post_type" defaultValue="product" />
      </form>
    </Fragment>
  );
}

export default Ordering;
