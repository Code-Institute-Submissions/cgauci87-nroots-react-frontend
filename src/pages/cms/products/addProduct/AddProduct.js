import React, { Fragment } from "react";
import ProductForm from "../ProductForm";

import HeaderCms from "../../../../../components/header/HeaderCms";


function AddProduct(options) {
  return (
    <Fragment>
      <HeaderCms options={options} />
      <ProductForm mode="ADD" />
    </Fragment>
  );
}

export default AddProduct;
