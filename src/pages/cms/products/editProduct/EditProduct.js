import React, { Fragment } from "react";
import ProductForm from "../ProductForm";
import { useParams } from "react-router-dom";

// import components
import HeaderCms from "../../../../../components/header/HeaderCms";


function EditProduct(options) {
  const params = useParams(); // for ID

  return (
    <Fragment>
      <HeaderCms options={options} />
      <ProductForm mode="EDIT" param={params} />
    </Fragment>
  );
}

export default EditProduct;
