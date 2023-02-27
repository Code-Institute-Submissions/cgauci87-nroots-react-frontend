import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";


// import css for cart
import "./cart.css";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";
import CalculatedShipping from "../../../components/shop/cart/CalculatedShipping";

// import Context API for cart state
import { CartState } from "../../../contexts/CartContext";

// Cart Page
function Cart({ options }) {
  const navigate = useNavigate();

  // =======================================================================
  // item from payload
  const [item] = [];

  // =======================================================================
  // state of the cart
  const {
    state: { cart },
    dispatch,
  } = CartState();

  // =======================================================================
  // set cart items in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // =======================================================================
  // set total price  based on the below calculation

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => {
        return total + parseFloat(item.price) * item.qty;
      }, 0)
    );
  }, [cart]);

  // =======================================================================

  return cart.length > 0 ? ( // if card is empty - then navigate to /shop
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Cart" />

      {/* start cart-section */}
      <section className="cart-section ecom-cart section-padding">
        <div className="container-1410">
          <div className="row">
            <div className="col col-xs-12">
              <div className="ecom">
                <form action="/" method="post">
                  <table className="shop_table shop_table_responsive cart">
                    <thead>
                      <tr>
                        <th
                          className="product-remove"
                          onClick={() =>
                            //  on click -> remoeve item
                            dispatch({
                              type: "REMOVE_FROM_CART", // case is defined in CartReducer.js
                              payload: item,
                            })
                          }
                        >
                          &nbsp;
                        </th>
                        <th className="product-thumbnail">&nbsp;</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity">Qty</th>
                        <th className="product-subtotal">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(
                        (
                          item // an array of data to render cart items
                        ) => (
                          <tr className="cart_item">
                            <td className="product-remove">
                              <a
                                href="/#"
                                onClick={() =>
                                  //  on click -> remoeve item
                                  dispatch(
                                    {
                                      type: "REMOVE_FROM_CART", // case is defined in CartReducer.js
                                      payload: item,
                                    },
                                    toast.info(
                                      "Item has been removed from the cart" // toast message upon removal of an item
                                    )
                                  )
                                }
                                className="remove bg-danger"
                                title="Remove this item"
                                data-product_id={item.id}
                              >
                                ×
                              </a>
                            </td>
                            <td className="mini-cart-item-image">
                              <img
                                width={57}
                                height={70}
                                src={item.uploadedImg}
                                className="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"
                                alt="product"
                              />
                            </td>
                            <td className="product-name" data-title="Product">
                              <Link to={`/shop/product-details/${item.id}`}>
                                <a
                                  href="/#"
                                  title="See Product Details!"
                                  data-tip="Product Details"
                                >
                                  {item.title}
                                </a>
                              </Link>
                            </td>
                            <td className="product-price" data-title="Price">
                              <span className="ecom-Price-amount amount">
                                <span className="ecom-Price-currencySymbol">
                                  €
                                </span>
                                {item.price}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity">
                                <Tooltip title="Change Qty" placement="top">
                                  <select
                                    value={item.qty}
                                    onChange={(e) => {
                                      // change qty according to the selected option
                                      dispatch({
                                        type: "CHANGE_CART_QTY", // case is defined in CartReducer.js
                                        payload: {
                                          id: item.id,
                                          qty: e.target.value,
                                        },
                                      });
                                      toast.info(
                                        "Item quantity has been updated"
                                      ); // toast message upon change of qty
                                    }}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </Tooltip>
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="ecom-Price-amount amount">
                                <span className="ecom-Price-currencySymbol">
                                  €
                                </span>
                                {(item.price * item.qty).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </form>
                <div className="cart-collaterals">
                  <CalculatedShipping
                    currencySymbol="€"
                    price={total.toFixed(2)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end cart-section */}

      <Footer />
    </Fragment>
  ) : (
    setTimeout(() => {
      navigate("/shop"); // navigate to /shop if cart is empty - This case mainly occur when customer will have one or more item in cart and then decide to remove items.
    }, 1500)
  );
}

export default Cart;
