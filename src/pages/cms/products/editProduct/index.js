import React, { Fragment } from "react";
import ProductForm from "../ProductForm";
import { useParams } from "react-router-dom";

import HeaderCms from "../../../../../components/header/HeaderCms";


function EditProduct(options) {
  const params = useParams();

  return (
    <Fragment>
      <HeaderCms options={options} />
      <ProductForm mode="EDIT" param={params} />
    </Fragment>
  );
}

export default EditProduct;
