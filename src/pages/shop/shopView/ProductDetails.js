import React, { useState, Fragment, useEffect, useContext } from "react";
import { Carousel } from "antd";
import Footer from "../../components/global/Footer";
import Instagram from "../../components/global/Instagram";
import PageTitle from "../../components/global/PageTitle";
import HeaderShop from "../../components/header/HeaderShop";
import ProductInfoTabs from "../../components/products/ProductInfoTabs";
import QuickView from "../../components/products/QuickView";
import RecentSingleProducts from "../../components/products/RecentSingleProducts";
import { axiosReq } from "../../api/axiosDefaults";
import { CartState } from "../../contexts/CartContext";
import { useParams } from "react-router";
import { toast } from "react-toastify";

import "./shop.css";

function ProductDetails({ options }) {
  const [item, setItem] = useState({});
  const { id } = useParams();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(cart, "cart");

  useEffect(() => {
    console.log("id=>>>>", id);
    const handleMount = async () => {
      try {
        const { data: product } = await axiosReq.get(`/products/${id}/`);
        console.log(product, "data");
        setItem(product);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  console.log(item);

  /**
   * states
   */
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState({});
  const [productCount, setProductCount] = useState(1);

  const HandelQuickViewData = (e, item) => {
    e.preventDefault();
    setShowQuickView(!showQuickView);
    setQuickViewData(item);
  };

  /**
   * Handel Quick View Close
   */
  const HandelQuickViewClose = (e) => {
    e.preventDefault();
    setShowQuickView(false);
    setQuickViewData({});
  };

  // if (!item) {
  //   return <div>Loading...</div>;
  // }

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
                <div className="rating">
                  <i className="fi flaticon-star" />
                  <i className="fi flaticon-star" />
                  <i className="fi flaticon-star" />
                  <i className="fi flaticon-star" />
                  <i className="fi flaticon-star-social-favorite-middle-full" />
                  <span>""</span>
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
                                type: "CHANGE_CART_QTY",
                                payload: {
                                  id: item.id,
                                  qty: e.target.value,
                                },
                              });
                              toast.info(
                                "Item quantity has been updated"
                              )
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
                              dispatch(
                                {
                                  type: "REMOVE_FROM_CART",
                                  payload: item,
                                },
                                toast.info(
                                  "Item has been removed from the cart"
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
                              { type: "ADD_TO_CART", payload: item },
                              toast.info("Item has been added to the cart")
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
          <div className="row">
            <div className="col col-xs-12">
              <RecentSingleProducts onQuickViewClick={HandelQuickViewData} />
            </div>
          </div>
        </div>
        {/* end of container */}
      </section>
      {/* end of shop-single-section */}
      <Instagram />
      <Footer />
    </Fragment>
  );
}

export default ProductDetails;
