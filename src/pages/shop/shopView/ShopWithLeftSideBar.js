import React, { useState, Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";
import PageTitle from "../../../components/global/pageTitle/PageTitle";

// import products
import Products from "../../../components/shop/products/Products";

// import ordering and pagination
import Ordering from "../../../components/shop/ordering/Ordering";
import OrderingToolbar from "../../../components/shop/ordering/OrderingToolbar";

// import  widgets
import SearchWidget from "../../../components/shop/widget/SearchWidget";
import ProductCategoriesWidget from "../../../components/shop/widget/ProductCategoriesWidget";
import TagFilterWidget from "../../../components/shop/widget/TagFilterWidget";

// style
import "./shop.css";

function ShopWithLeftSideBar({ options }) {
  const [ordering, setOrdering] = useState('&ordering=-created_at');

  const [filter, setFilter] = useState('')
  const [query, setQuery] = useState('')

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

                      <Ordering setOrdering={setOrdering} />
                    </div>

                    <Products ordering={ordering}  filter={filter} query={query} ordering={ordering}/>
                  </div>
                  
                </div>
                <div className="shop-sidebar">
                  <SearchWidget setQuery={setQuery} setFilter={setFilter} />
                  <ProductCategoriesWidget setFilter={setFilter} currentFilter={filter} />
                  <TagFilterWidget setFilter={setFilter} />
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
