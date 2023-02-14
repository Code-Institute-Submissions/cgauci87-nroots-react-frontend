import React, {Fragment } from 'react';

import {Link} from "react-router-dom";


function CalculatedShipping({currencySymbol, price}) {
    return (
        <Fragment>
            <div className="cart_totals calculated_shipping">
                <h2>Cart Totals</h2>
                <table className="shop_table shop_table_responsive">
                    <tbody>
                    <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td data-title="Subtotal">
                            <span className="ecom-Price-amount amount">
                                    <span className="ecom-Price-currencySymbol">
                                        {currencySymbol}
                                    </span>{price}
                            </span>
                        </td>
                    </tr>
                    <tr className="shipping">
                        <th>Shipping</th>
                        <td data-title="Shipping">
                            Free Shipping
                        </td>
                    </tr>
                    <tr className="order-total">
                        <th>Total</th>
                        <td data-title="Total"><strong><span
                            className="ecom-Price-amount amount"><span
                            className="ecom-Price-currencySymbol">{currencySymbol}</span>{price}</span></strong>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <Link className="ecom-button" to="/checkout">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default CalculatedShipping;