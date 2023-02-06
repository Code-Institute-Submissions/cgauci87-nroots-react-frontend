import React, { Fragment } from "react";
import { Link } from "react-router-dom";




function ProductCategoriesWidget({setFilter, currentFilter}) {
  
  return (
    <Fragment>
      <div className="widget ecom widget_product_cloud">
        <h3>Filter by Product categories</h3>
        <ul className="product-categories">
        <li className="cloud">
            <Link
            className="cloud-link"
            onClick={e => setFilter("")} 
            style={{
              background: currentFilter === "" ? "#000" : "none",
              color: currentFilter === "" ? "#fff" : "#787878"
            }}
          >
            All Products
          </Link>
          </li>
          <li className="cloud">
          <Link
            className="cloud-link"
            onClick={e => setFilter("category=Tiny Plants")} 
            style={{
              background: currentFilter === "category=Tiny Plants" ? "#000" : "none",
              color: currentFilter === "category=Tiny Plants" ? "#fff" : "#787878"
            }}
          >
            Tiny Plants
          </Link>
          </li>

          <li className="cloud">
          <Link
            className="cloud-link"
            onClick={e => setFilter("category=Large Plants")} 
            style={{
              background: currentFilter === "category=Large Plants" ? "#000" : "none",
              color: currentFilter === "category=Large Plants" ? "#fff" : "#787878"
            }}
          >
            Large Plants
          </Link>
          </li>
          <li className="cloud">
          <Link
            className="cloud-link"
            onClick={e => setFilter("category=Planters")} 
            style={{
              background: currentFilter === "category=Planters" ? "#000" : "none",
              color: currentFilter === "category=Planters" ? "#fff" : "#787878"
            }}
          >
            Planters
          </Link>
          </li>
          <li className="cloud">
          <Link
            className="cloud-link"
            onClick={e => setFilter("category=Plant Care")} 
            style={{
              background: currentFilter === "category=Plant Care" ? "#000" : "none",
              color: currentFilter === "category=Plant Care" ? "#fff" : "#787878"
            }}
          >
            Plant Care
          </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ProductCategoriesWidget;
