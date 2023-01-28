import React from "react";
import { Fragment } from "react";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import Hero1 from "../../../components/shop/hero/Hero1";
import FeaturedProducts from "../../../components/shop/products/FeaturedProducts";
import Categories from "../../../components/shop/products/Categories";
import Footer from "../../../components/shop/footer/Footer";

// HomeDefault Page
function HomeDefault({ options }) {
  return (
    <Fragment>
      {/* HeaderShop component with options props*/}
      <HeaderShop options={options} />
      {/* Hero1 component */}
      <Hero1 />
      {/* FeaturedProducts component */}
      <FeaturedProducts />
      {/* Categories component */}
      <Categories />
      {/* Footer Component */}
      <Footer />
    </Fragment>
  );
}

export default HomeDefault;
