import React from "react";
import { Fragment } from "react";

import Header from "../../components/header/HeaderShop";
import Hero1 from "../../components/Hero/Hero1";
import FeaturedProducts from "../../components/products/FeaturedProducts";
import Categories from "../../components/categories/Categories";
import Footer from "../../components/global/Footer";

// HomeDefault page
function HomeDefault({ options }) {
  return (
    <Fragment>
      <Header options={options} />

      <Hero1 />

      <FeaturedProducts />

      <Categories />

      <Footer />
    </Fragment>
  );
}

export default HomeDefault;
