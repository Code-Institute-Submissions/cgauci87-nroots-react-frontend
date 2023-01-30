import React, { useState, Fragment, useEffect } from "react";
import { Carousel } from "antd";
import { useParams } from "react-router";
import { toast } from "react-toastify";

// import layout components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// import product components
import QuickView from "../../../components/shop/products/QuickView";

//import contexts
import { axiosReq } from "../../../api/axiosDefaults";
import { CartState } from "../../../contexts/CartContext";

// import style
import "./shop.css";

// ProductDetails Page
function ProductDetails({ options }) {
  const [item, setItem] = useState({});
  const { id } = useParams(); // using useParams hook to return the product details from the id

  // ====================================================================================================
  // context API - sharing cart data between components while useReducer handles the cart state.
  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // store cart items in local storage
  }, [cart]);

  // ====================================================================================================
  // Get product details from API by id
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: product } = await axiosReq.get(`/products/${id}/`);
        setItem(product);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]); // handleMount will be called whenever a new product is being selected to render it's details

  /**
   * states
   */
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState({});


  /**
   * Handel Quick View Close
   */
  const HandelQuickViewClose = (e) => {
    // close quick view
    e.preventDefault();
    setShowQuickView(false);
    setQuickViewData({});
  };

  return (
    <Fragment>
      {showQuickView ? (
        <QuickView
          data={quickViewData}
          onQuickViewCloseClick={HandelQuickViewClose}
        />
      ) : (
        ""
      )}

      <HeaderShop options={options} />

      <PageTitle name="Shop single" />

      {/* start shop-single-section */}

      <section className="shop-single-section section-padding">
        <div className="container-1410">
          <div className="row">
            <div className="col col-md-6">
              <div className="shop-single-slider slider-thumbnail">
                <Carousel autoplay>
                  <img src={item.uploadedImg} alt="carousel-img-1" />
                  <img src={item.uploadedImg} alt="carousel-img-2" />
                  <img src={item.uploadedImg} alt="carousel-img-3" />
                </Carousel>

                <div className="slider-nav"></div>
              </div>
            </div>

            <div className="col col-md-6">
              <div className="product-details">
                <h2>{item.title}</h2>
                <div className="price">
                  <span className="current"> € {item.price}</span>
                  <span className="old"> €{item.comparePrice}</span>
                </div>
                <p>{item.description}</p>
                <div className="product-option">
                  <div className="product-row">
                    <div className="touchspin-wrap"></div>
                    <div>
                      {cart.some((p) => p.id === item.id) ? (
                        <>
                          <select
                            value={item.qty}
                            onChange={(e) => {
                              dispatch({
                                type: "CHANGE_CART_QTY", // case is defined in CartReducer.js
                                payload: {
                                  id: item.id,
                                  qty: e.target.value,
                                },
                              });
                              toast.info("Item quantity has been updated"); // toast message upon change of qty
                            }}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          <button
                            onClick={() =>
                              // on click remove from cart
                              dispatch(
                                {
                                  type: "REMOVE_FROM_CART", // case is defined in CartReducer.js
                                  payload: item,
                                },
                                toast.info(
                                  "Item has been removed from the cart" // toast message upon removal of item in the cart
                                )
                              )
                            }
                          >
                            Remove from cart
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            dispatch(
                              { type: "ADD_TO_CART", payload: item }, // case is defined in CartReducer.js
                              toast.info("Item has been added to the cart") // toast message upon adding an item in the cart
                            )
                          }
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="thb-product-meta-before">
                  <div className="product_meta">
                    <span className="posted_in">
                      Categories: {item.category}
                    </span>
                    <span className="tagged_as">Tags:{item.tag}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="row">
            <div className="col col-md-8 col-md-offset-2">
              {/* <ProductInfoTabs /> */}
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end of container */}
      </section>
      {/* end of shop-single-section */}
      <Footer />
    </Fragment>
  );
}

export default ProductDetails;
