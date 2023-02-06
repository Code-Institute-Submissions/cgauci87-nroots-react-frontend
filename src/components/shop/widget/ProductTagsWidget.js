import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function ProductTagsWidget({ setFilter, currentFilter }) {
  return (
    <Fragment>
      <div className="widget ecom widget_product_cloud">
        <h3>Filter by Product tags</h3>
        <div className="cloud">
          <Link
            className="cloud-link"
            onClick={(e) => setFilter("tag=Featured")}
            style={{
              background: currentFilter === "tag=Featured" ? "#000" : "none",
              color: currentFilter === "tag=Featured" ? "#fff" : "#787878"
            }}
          >
            Featured
          </Link>
          <Link
            className="cloud-link"
            onClick={(e) => setFilter("tag=Special Offer")}
            style={{
              fontWeight:
                currentFilter === "tag=Special Offer" ? "bold" : "normal",
            }}
          >
            Special Offer
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductTagsWidget;