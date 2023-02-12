import React, { useState, Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";
import PageTitle from "../../../components/global/pageTitle/PageTitle";

// import products
import Products from "../../../components/shop/products/Products";

// import ordering
import Ordering from "../../../components/shop/ordering/Ordering";
import GridOrderingToolbar from "../../../components/shop/ordering/GridOrderingToolbar";

// import  widgets
import ProductSearchWidget from "../../../components/shop/widget/ProductSearchWidget";
import ProductCategoriesWidget from "../../../components/shop/widget/ProductCategoriesWidget";
import ProductTagsWidget from "../../../components/shop/widget/ProductTagsWidget";

// import this hook to sync query parameters
import { useQueryState } from "../../../hooks/useQueryState";

// style
import "./shop.css";


function ShopWithLeftSideBar({ options }) {
  const [ordering, setOrdering] = useState("&ordering=-created_at");
  const [gridOrdering, setGridOrdering] = useState("1");

  const [filter, setFilter] = useQueryState("filter");

  //const [query, setQuery] = useState("");
  const [query, setQuery] = useQueryState("query");

  /**
   * Handle Ordering Status
   */
  const HandleOrderingStatus = (event, data) => {
    event.preventDefault();
    setGridOrdering(data);
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

                      <GridOrderingToolbar
                        HandleOrderingStatus={HandleOrderingStatus}
                        gridOrdering={gridOrdering}
                      />

                      <Ordering setOrdering={setOrdering} />
                    </div>

                    <Products
                      gridOrdering={gridOrdering}
                      ordering={ordering}
                      filter={filter}
                      query={query}
                    />
                  </div>
                </div>
                <div className="shop-sidebar">
                  <ProductSearchWidget
                    setQuery={setQuery}
                    setFilter={setFilter}
                  />
                  <ProductCategoriesWidget
                    setFilter={setFilter}
                    currentFilter={filter}
                  />
                  <ProductTagsWidget
                    setFilter={setFilter}
                    currentFilter={filter}
                  />
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
