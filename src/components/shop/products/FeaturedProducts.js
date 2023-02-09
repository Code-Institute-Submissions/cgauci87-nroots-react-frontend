import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import axios
import { axiosReq } from "../../../api/axiosDefaults";

// import lazy loading
import LazyLoad from "react-lazy-load";

// Featured Products Component
function FeaturedProducts() {
  //=====================================================================================================
  // Get Featured Products data
  const [featuredProductsData, setFeaturedProductsData] = useState([]);
  const getFeaturedProducts = async () => {
    try {
      const response = await axiosReq.get(`/products/?tag=Featured`);
      setFeaturedProductsData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeaturedProducts(); // Get featured products data whenever there is an update (asynchronous)
  }, []);

  // =====================================================================================================
  // inline style for featured product images
  const imgStyle = {
    width: "460px",
    height: "415px",
  };
  // =====================================================================================================

  return (
    <Fragment>
      {/* start featured-products-section */}
      <section className="featured-products-section section-padding">
        <div className="container-1410">
          <div className="row">
            <div className="col col-xs-12">
              <div className="product-grids clearfix">
                {featuredProductsData.map((item, index) => (
                  <div key={index} className="grid">
                    <div className="img-holder">
                      <div className="cloud">
                        <a
                          style={{
                            color: "white",
                            background: "black",
                            marginTop: "8px",
                          }}
                          href="/shop?filter=tag%3DFeatured"
                          className="cloud-link"
                        >
                          Featured
                        </a>
                      </div>
                      <LazyLoad height={460} width={415}>
                        {/* link to product details of the selected product */}
                        <Link to={`/shop/product-details/${item.id}`}>
                          <img
                            src={item.uploadedImg}
                            alt="product image"
                            style={imgStyle}
                          />
                        </Link>
                      </LazyLoad>
                    </div>
                    <div className="details">
                      <h3>{item.title}</h3>
                      <Link
                        className="shop-btn"
                        to={`/shop/product-details/${item.id}`}
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end container-1410 */}
      </section>
      {/* end featured-products-section */}
    </Fragment>
  );
}

export default FeaturedProducts;
