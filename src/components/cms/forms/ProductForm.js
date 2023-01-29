import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, message } from "antd";
import { useParams } from "react-router";
import { axiosReq } from "../../../../../api/axiosDefaults";

// import components
import PageHeaderAlt from "../../../../src/components/cms/pageHeader/PageHeaderAlt";
import Flex from "../../../../src/components/cms/utils/Flex";
import GeneralField from "./GeneralField";

// declare add/edit for mode
const ADD = "ADD";
const EDIT = "EDIT";

// ======================================================================

// ProductForm component (for ADD & EDIT)
function ProductForm(props) {
  const { mode = ADD } = props; // props passed are for add product

  const { id } = useParams(); // using this hook to return the id of a selected product

  // declare states
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

// ======================================================================
// Category & Tags API

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axiosReq.get("/categories").then((response) => {
      let _categories = response.data.categories;
      if (_categories.length > 0) {
        let data = {};
        data.category = _categories[0][0];
        form.setFieldsValue(data);
      }
      setCategories(_categories);
    });
  }, []);

  useEffect(() => {
    axiosReq.get("/tags").then((response) => {
      let _tags = response.data.tags;
      if (_tags.length > 0) {
        let data = {};
        data.tag = _tags[0][0];
        form.setFieldsValue(data);
      }
      setTags(_tags);
    });
  }, []);

  // ======================================================================


  const getProductList = async () => {
    try {
      const response = await axiosReq.get("/products");
      let data = response.data;
      const productData = data.find((product) => product.id === +id);
      if (productData) {
        form.setFieldsValue(productData); // set values of product data
        setImage(productData.uploadedImg); // set image 
      }
    } catch (error) {
      console.log(error);
    }
  };

    // ======================================================================


  useEffect(() => {
    if (mode === EDIT) {
      getProductList(); // Fetch data if edit is clicked
    }
  }, []);

    // ======================================================================

  const onFinish = async () => {
    setSubmitLoading(true); // if user add an image

    // ======================================================================


    var formData;
    let results = form.getFieldsValue();
    formData = results;

    results.uploadedImg = uploadedImg;
    // if uploadedImg has not been updated in the edit-product form; then delete results.uploadedImg
    if (results.uploadedImg && results.uploadedImg.includes("http")) {
      delete results.uploadedImg;
    }

// =======================================================================================
// Dual API requests based on condiontional rendering
    if (mode === ADD) { // if admin/is_staff adding a product
      axiosReq({
        method: "post",
        url: "/products/",
        data: {
          ...results,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          setTimeout(() => {
            setSubmitLoading(false);
            message.success(`Created ${results.title} to product list`);
          }, 1500);
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } else { // referring to mode === EDIT, if admin/is_staff edit a product
      axiosReq({
        method: "patch",
        url: `/products/${id}/`, // update the specific product by id
        data: {
          ...results,
        },
        headers: { "Content-Type": "multipart/form-data" }, // The content-type is mulipart/form-data due to image
      })
        .then(function (response) {
          setTimeout(() => {
            setSubmitLoading(false);
            message.success(`Product saved`);
          }, 1500);
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          setSubmitLoading(false);
          console.log(response);
        });
    }
  };

  // =======================================================================================


  return (
    <>
      <Form
        style={{ marginLeft: 250 }}
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
        value={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
               {/* conditional rendering depends on the mode */}
              <h2 className="mb-3"> 
                {mode === "ADD" ? "Add New Product" : `Edit Product`}{" "} 
              </h2>
              <div className="mb-3">
                <Button
                  type="file"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "General",
                key: "1",
                children: (
                  <GeneralField
                    setImage={setImage}
                    imageUrl={uploadedImg}
                    categories={categories}
                    tags={tags}
                    data={form}
                  />
                ),
              }
            ]}
          />
        </div>
      </Form>
    </>
  );
}

export default ProductForm;
