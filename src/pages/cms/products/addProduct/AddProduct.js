import React, { Fragment } from "react";

// import components
import ProductForm from "../../../../components/cms/forms/ProductForm";
import HeaderCms from "../../../../components/global/navbar/HeaderCms";


function AddProduct(options) {
  return (
    <Fragment>
      <HeaderCms options={options} />
      <ProductForm mode="ADD" />
    </Fragment>
  );
}

export default AddProduct;
