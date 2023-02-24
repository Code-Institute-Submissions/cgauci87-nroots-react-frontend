import React, { Fragment } from "react";

// Product Tags
function ProductTagsWidget({ setFilter, currentFilter }) {
  return (
    <Fragment>
      <div className="widget ecom widget_product_cloud">
        <h3>Filter by Product tags</h3>
        <div className="cloud">
          <button
            className="cloud-link"
            onClick={(e) => setFilter("tag=Featured")}
            style={{
              background: currentFilter === "tag=Featured" ? "#000" : "none",
              color: currentFilter === "tag=Featured" ? "#fff" : "#787878",
            }}
          >
            Featured
          </button>
          <button
            className="cloud-link"
            onClick={(e) => setFilter("tag=Special-Offer")}
            style={{
              background: currentFilter === "tag=Special-Offer" ? "#000" : "none",
              color: currentFilter === "tag=Special-Offer" ? "#fff" : "#787878",
            }}
          >
            Special Offer
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductTagsWidget;
