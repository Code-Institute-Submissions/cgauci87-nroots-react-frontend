import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

// import context
import { axiosReq } from "../../../api/axiosDefaults";
import { CartState, useCartContext } from "../../../contexts/CartContext";

// import lazy loading
import LazyLoad from "react-lazy-load";

// import pagination
import Pagination from "../../../components/shop/pagination/Pagination";

// Products component
function Products({ gridOrdering, ordering, filter, query }) {
  // ===============================================================
  const { products, setProducts } = useCartContext();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true); // set loading to true as soon as getProducts is invoked
      try {
        const response = await axiosReq.get(
          `/products/?${filter}&search=${query}${ordering}&page=${currentPage}`
        );
        setProducts(response.data.results);
        setTotalProducts(response.data.count);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Unable to get products right now... Please try again later"
        ); // the error will trigger if backend is down
        setLoading(false);
      }
    };
    getProducts();
  }, [setProducts, filter, query, ordering, currentPage]); // Get products from API & filter whenever it changes

  const {
    state: { cart },
    dispatch,
  } = CartState(); // CartState

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ===============================================================
  if (loading) {
    <div>
      <LoadingOutlined />
    </div>;
  } else
    return products.length > 0 ? (
      <Fragment>
        <ul
          className={
            "products " +
            (gridOrdering === 1 // grid ordering defined
              ? "default-column"
              : gridOrdering === 2
              ? "three-column"
              : gridOrdering === 3
              ? "list-view"
              : "")
          }
        >
          {products.map((item, index) => (
            <li key={index} className="product">
              <div className="product-holder">
                {/* Wrap img inside LazyLoad to defer loading content in predictable way */}
                <LazyLoad height={220} width={220}>
                  {/* link to product details of the selected product */}
                  <Link to={`/shop/product-details/${item.id}`}>
                    <img src={item.uploadedImg} alt="product" />
                  </Link>
                </LazyLoad>
                <div className="shop-action-wrap">
                  <ul className="shop-action">
                    <li id="tooltip-details">
                      <Link to={`/shop/product-details/${item.id}`}>
                        <Tooltip title="See Product Details!">
                          <i className="fi flaticon-view" />
                        </Tooltip>
                      </Link>
                    </li>
                    {cart.some((p) => p.id === item.id) ? (
                      <li id="tooltip-remove"  style={{ background: "#000", color: "green" }}
                        onClick={() =>
                          // on click remove item from cart
                          dispatch(
                            { type: "REMOVE_FROM_CART", payload: item }, // case is defined in CartReducer.js
                            toast.info("Item has been removed from the cart")
                          )
                        }
                      >
                        <Tooltip
                          title="Remove from cart!"
                        >
                          <i className="fi flaticon-shopping-cart" />
                        </Tooltip>
                      </li>
                    ) : (
                      <li
                        id="tooltip-add"
                        onClick={() =>
                          dispatch(
                            { type: "ADD_TO_CART", payload: item }, // case is defined in CartReducer.js
                            toast.info("Item has been added to the cart")
                          )
                        }
                      >
                        <Tooltip title="Add to cart!">
                          <i className="fi flaticon-shopping-cart" />
                        </Tooltip>
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
        {/* pageSize value should match with pagination settings of the backend */}
        <Pagination
          extraClass=""
          total={totalProducts}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={12}
        />
      </Fragment>
    ) : (
      <h3>No products found!</h3>
    );
}

export default Products;
