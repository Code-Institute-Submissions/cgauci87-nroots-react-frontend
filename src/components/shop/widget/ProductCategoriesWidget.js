import React, {Fragment} from 'react';

/**
 * Product Categories Widget
 * @returns {*}
 * @constructor
 */
function ProductCategoriesWidget() {

    return (
        <Fragment>
            <div className="widget ecom widget_product_categories">
                <h3>Filter by categories</h3>
                <ul className="product-categories">
                    <li className="cat-item">
                        <a href="#">Mushroom Kits</a>
                    </li>
                    <li className="cat-item">
                        <a href="#">Mushroom Powder</a>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
}

export default ProductCategoriesWidget;