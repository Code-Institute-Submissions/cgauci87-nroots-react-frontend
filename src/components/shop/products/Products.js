import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// import context
import { axiosReq } from "../../../api/axiosDefaults";
import { CartState, useCartContext } from "../../../contexts/CartContext";

// import lazy loading
import LazyLoad from "react-lazy-load";

// Products component
function Products({ ordering }) {
  // ===============================================================
  const { products, setProducts } = useCartContext();

  const getProducts = async () => {
    const response = await axiosReq.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []); // Get products from API

  const {
    state: { cart },
    dispatch,
  } = CartState(); // CartState

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ===============================================================

  return (
    <Fragment>
      <ul
        className={
          "products " +
          (ordering == 1 // ordering defined
            ? "default-column"
            : ordering == 2
            ? "three-column"
            : ordering == 3
            ? "list-view"
            : "")
        }
      >
        {products.map((item, index) => (
          <li key={index} className="product">
            <div className="product-holder">
              {/* Wrap img inside LazyLoad to defer loading content in predictable way */}
              <LazyLoad  height={220} width={220}>
                {/* link to product details of the selected product */}
                <Link to={`/shop/product-details/${item.id}`}>
                  <img
                    src={item.uploadedImg}
                    alt="product image"
                  />
                </Link>
              </LazyLoad>
              <div className="shop-action-wrap">
                <ul className="shop-action">
                  <li>
                    <Link to={`/shop/product-details/${item.id}`}>
                      <a
                        href="#"
                        title="See Product Details!"
                        data-tip="Product Details"
                      >
                        <i className="fi flaticon-view" />
                      </a>
                    </Link>
                  </li>
                  {cart.some((p) => p.id === item.id) ? (
                    <li
                      onClick={() =>
                        // on click remove item from cart
                        dispatch(
                          { type: "REMOVE_FROM_CART", payload: item }, // case is defined in CartReducer.js
                          toast.info("Item has been removed from the cart")
                        )
                      }
                    >
                      <a
                        style={{ background: "#000", color: "green" }}
                        title="Remove from cart!"
                        data-tip="Remove from cart!"
                      >
                        <i className="fi flaticon-shopping-cart" />
                      </a>
                    </li>
                  ) : (
                    <li
                      onClick={() =>
                        // on click add item to cart
                        dispatch(
                          { type: "ADD_TO_CART", payload: item }, // case is defined in CartReducer.js
                          toast.info("Item has been added to the cart")
                        )
                      }
                    >
                      <a title="Add to cart!" data-tip="Add to cart!">
                        <i className="fi flaticon-shopping-cart" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="product-info">
              <h4>
                <Link to={`/shop/product-details/${item.id}`}>
                  {item.title}
                </Link>
              </h4>
              <span className="ecom-Price-amount amount">
                <ins>
                  <span className="ecom-Price-amount amount">
                    <bdi>
                      <span className="ecom-Price-currencySymbol">€</span>
                      {item.price}
                    </bdi>
                  </span>
                </ins>
                {parseInt(item.price) < parseInt(item.comparePrice) ? ( // parses a value as a string and returns the first integer.
                  <del>
                    <span className="ecom-Price-amount amount">
                      <bdi>
                        <span className="ecom-Price-currencySymbol">€</span>
                        {item.comparePrice}
                      </bdi>
                    </span>
                  </del>
                ) : (
                  ""
                )}
              </span>
              <p className="product-description">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default Products;
