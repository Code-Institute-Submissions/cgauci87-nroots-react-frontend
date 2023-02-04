import React, { Fragment } from "react";
import { Link } from "react-router-dom";




function ProductCategoriesWidget({setFilter}) {
  
  return (
    <Fragment>
      <div className="widget ecom widget_product_categories">
        <h3>Filter by categories</h3>
        <ul className="product-categories">
          <li className="cat-item">
            <Link onClick={e => setFilter('categories=Tiny Plants')}>
              Tiny Plants
            </Link>
          </li>

          <li className="cat-item">
            <a href="#" onClick={e => setFilter('categories=Large Plants')}>Large Plants</a>
          </li>
          <li className="cat-item">
            <a href="#" onClick={e => setFilter('categories=Planters')}>Planters</a>
          </li>
          <li className="cat-item">
            <a href="#" onClick={e => setFilter('categories=Plant Care')}>Plant Care</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ProductCategoriesWidget;
