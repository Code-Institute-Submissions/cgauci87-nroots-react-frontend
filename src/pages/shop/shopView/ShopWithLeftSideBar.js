import React, { useState, Fragment } from "react";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";

// import products
import Products from "../../../components/shop/products";


// ordering and pagination
import Ordering from "../../../components/shop/ordering/Ordering";
import OrderingToolbar from "../../../components/shop/ordering/OrderingToolbar";
import Pagination from "../../../components/shop/Pagination";

// widgets
import SearchWidget from "../../../omponents/widget/SearchWidget";
import ProductCategoriesWidget from "../../../components/widget/ProductCategoriesWidget";
import TagFilterWidget from "../../../components/widget/TagFilterWidget";

// style
import "./shop.css";

function ShopWithLeftSideBar({ options }) {
  const [ordering, setOrdering] = useState(1);

  /**
   * Handle Ordering Status
   */
  const HandleOrderingStatus = (event, data) => {
    event.preventDefault();
    setOrdering(data);
  };

  return (
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Shop" />

      {/* start shop-section */}
      <section className="shop-section section-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-xs-12">
              <div className="shop-area clearfix">
                <div className="ecom-content-wrap">
                  <div className="ecom-content-inner">
                    <div className="ecom-toolbar-top">
                      <p className="ecom-result-count"></p>

                      <OrderingToolbar
                        HandleOrderingStatus={HandleOrderingStatus}
                        ordering={ordering}
                      />

                      <Ordering />
                    </div>

                    <Products ordering={ordering} />
                  </div>
                  <Pagination extraClass="" />
                </div>
                <div className="shop-sidebar">
                  <SearchWidget title="" />
                  <ProductCategoriesWidget />
                  <TagFilterWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end container */}
      </section>
      {/* end shop-section */}

      <Footer />
    </Fragment>
  );
}

export default ShopWithLeftSideBar;
