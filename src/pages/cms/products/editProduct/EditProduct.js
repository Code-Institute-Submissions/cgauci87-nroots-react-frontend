import React, { Fragment } from "react";
import { useParams } from "react-router-dom";

// import components
import ProductForm from "../../../../components/cms/forms/ProductForm";
import HeaderCms from "../../../../components/global/navbar/HeaderCms";



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
