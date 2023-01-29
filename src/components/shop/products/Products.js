import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { CartState, useCartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";


function Products({ ordering }) {

  const { products, setProducts } = useCartContext();
  console.log("products", products);

  const getProducts = async () => {
    const response = await axiosReq.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log("cart", cart);

  return (
    <Fragment>
      <ul
        className={
          "products " +
          (ordering == 1
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
              <Link to={`/shop/product-details/${item.id}`}>
                <img
                  loading="lazy"
                  src={item.uploadedImg}
                  alt="product image"
                />
              </Link>
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
                        dispatch(
                          { type: "REMOVE_FROM_CART", payload: item },
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
                        dispatch(
                          { type: "ADD_TO_CART", payload: item },
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
                {parseInt(item.price) < parseInt(item.comparePrice) ? (
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
