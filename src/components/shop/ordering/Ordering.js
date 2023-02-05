import React, { Fragment } from "react";

function Ordering({setOrdering}) {
  return (
    <Fragment>
      <form className="ecom-ordering" method="get">
        <select name="orderby" className="orderby" onChange={e => setOrdering(e.target.value)}>
          <option value="&ordering=-created_at">Default sorting</option>
          <option value="&ordering=-created_at">Sort by newness</option>
          <option value="&ordering=price">Sort by price: low to high</option>
          <option value="&ordering=-price">Sort by price: high to low</option>
        </select>
        <input type="hidden" name="post_type" defaultValue="product" />

        {/* example below */}

        <li class="filters">
          <a class="filter_by" href="?sort=l2h">
            Price:--low to high
          </a>
        </li>
        <li class="filters">
          <a class="filter_by" href="?sort=h2l">
            Price:-- high to low
          </a>
        </li>
      </form>
    </Fragment>
  );
}

export default Ordering;
