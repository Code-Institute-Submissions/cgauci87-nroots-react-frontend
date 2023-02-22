import React, { useState, Fragment, useEffect } from "react";
import { Carousel } from "antd";
import { useParams } from "react-router";
import { toast } from "react-toastify";

// import layout components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// import lazy loading
import LazyLoad from "react-lazy-load";
import Loading from "../../../components/cms/utils/Loading";

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

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const handleMount = async () => {
      setLoading(true);
      try {
        const { data: product } = await axiosReq.get(`/products/${id}/`);
        setLoading(false);
        setItem(product);
      } catch (error) {
        setLoading(false);
        toast.error(
          "Unable to get product right now... Please try again later"
        ); // the error will trigger if backend is down
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

  // ==============================================================================================================
  //----------------------------------------CONDIONTIONAL RENDERING----------------------------------------------//
  // ==============================================================================================================

  // display category if there is any, otherwise do not display
  let showCategory = <span></span>;
  if (item.category) {
    // replace hyphen (category name to be displayed with empty space if there is more than one word)
    let cat = item.category;
    let cat_name = cat.replace(/-/g, " ");

    // parse url for the item category
    let str = encodeURIComponent(item.category);
    let urlCat = "/shop?filter=category%3D" + str;
    showCategory = (
      <div>
        <span>Category:</span> <a href={urlCat}>{cat_name}</a>
      </div>
    );
  }

  // display tag if there is any, otherwise do not display
  let showTag = <span></span>;
  if (item.tag) {
    // replace hyphen (category name to be displayed with empty space if there is more than one word)
    let tag = item.tag;
    let tag_name = tag.replace(/-/g, " ");
    // parse url for the item tag
    let urlTag = "/shop?filter=tag%3D" + item.tag;
    showTag = (
      <div>
        <span>Tag:</span> <a href={urlTag}>{tag_name}</a>
      </div>
    );
  }

  //=============================================================================================================

  let showOldPrice = <span></span>;
  if (item.comparePrice > 0.0) {
    /* Display old price if not blank - otherwise do not display */
    showOldPrice = <span className="old"> €{item.comparePrice}</span>;
  }

  // ============================================================================================================
  if (loading) {
    <div>
      <Loading />
    </div>;
  } else
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

        <PageTitle name={item.title} previouspage="Shop" />

        {/* start shop-single-section */}

        <section className="shop-single-section section-padding">
          <div className="container-1410">
            <div className="row">
              <div className="col col-md-6">
                <div className="shop-single-slider slider-thumbnail">
                  {/* Wrap Carousel inside LazyLoad to defer loading content in predictable way */}
                  <LazyLoad>
                    <Carousel autoplay>
                      <img src={item.uploadedImg} alt="carousel-img-1" />
                      <img src={item.uploadedImg} alt="carousel-img-2" />
                      <img src={item.uploadedImg} alt="carousel-img-3" />
                    </Carousel>
                  </LazyLoad>

                  <div className="slider-nav"></div>
                </div>
              </div>

              <div className="col col-md-6">
                <div className="product-details">
                  <h2>{item.title}</h2>
                  <div className="price">
                    <span className="current"> € {item.price}</span>
                    {showOldPrice}
                  </div>
                  <p>{item.description}</p>
                  <div>
                    <p style={{ fontWeight: "bold", color: "green" }}>
                      {item.additional_details}
                    </p>
                  </div>
                  <div className="product-option">
                    <div className="product-row">
                      <div className="touchspin-wrap"></div>
                      <div className="product-qty">
                        {cart.some((p) => p.id === item.id) ? (
                          <>
                            <span>
                              <b>Quantity</b>
                            </span>
                            <select
                              style={{
                                width: "40px",
                                textAlign: "center",
                              }}
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
                      <div className="cloud">{showCategory}</div>

                      <div className="cloud">{showTag}</div>
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
