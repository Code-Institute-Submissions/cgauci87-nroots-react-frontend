import React, { Fragment } from "react";
import { Link } from "react-router-dom";




function ProductCategoriesWidget({setFilter, currentFilter}) {
  
  return (
    <Fragment>
      <div className="widget ecom widget_product_categories">
        <h3>Filter by categories</h3>
        <ul className="product-categories">
        <li className="cat-item">
            <Link onClick={e => setFilter('')} style={{fontWeight: currentFilter === '' ? 'bold' : 'normal'}}>
              All Products
            </Link>
          </li>
          <li className="cat-item" style={{fontWeight: currentFilter === 'category=Tiny Plants' ? 'bold' : 'normal'}}>
            <Link onClick={e => setFilter('category=Tiny Plants')}>
              Tiny Plants
            </Link>
          </li>

          <li className="cat-item">
            <a href="#" onClick={e => setFilter('category=Large Plants')}>Large Plants</a>
          </li>
          <li className="cat-item">
            <a href="#" onClick={e => setFilter('category=Planters')}>Planters</a>
          </li>
          <li className="cat-item">
            <a href="#" onClick={e => setFilter('category=Plant Care')}>Plant Care</a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ProductCategoriesWidget;
