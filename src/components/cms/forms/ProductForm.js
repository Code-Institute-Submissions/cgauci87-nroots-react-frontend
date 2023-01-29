import React, { useState, useEffect } from "react";
import PageHeaderAlt from "../../../../../components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "../../../../../shared-components/Flex";
import GeneralField from "./GeneralField";
import VariationField from "./VariationField";
import ShippingField from "./ShippingField";

import { useParams } from "react-router";
import { axiosReq } from "../../../../../api/axiosDefaults";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

function ProductForm(props) {
  const { mode = ADD } = props;

  const { id } = useParams();
  console.log("id to edit", id);

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  /*const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "",
    tag: "",
    uploadedImg: [],
  });*/

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //  pending bug - change not being effective
  useEffect(() => {
    axiosReq.get("/categories").then((response) => {
      let _categories = response.data.categories;
      console.log("Current Categories");
      console.log(_categories);
      if (_categories.length > 0) {
        let data = {};
        data.category = _categories[0][0];
        // setData(_data);
        form.setFieldsValue(data);
      }
      setCategories(_categories);
    });
  }, []);

  useEffect(() => {
    axiosReq.get("/tags").then((response) => {
      let _tags = response.data.tags;
      console.log("Current Tags");
      console.log(_tags);
      if (_tags.length > 0) {
        let data = {};
        data.tag = _tags[0][0];
        //setData(_data);
        form.setFieldsValue(data);
      }
      setTags(_tags);
    });
  }, []);

  const getProductList = async () => {
    try {
      const response = await axiosReq.get("/products");
      let data = response.data;
      const productData = data.find((product) => product.id === +id);
      console.log("productData", productData);
      if (productData) {
        form.setFieldsValue(productData);
        setImage(productData.uploadedImg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mode === EDIT) {
      getProductList();
    }
  }, []);

  // const handleUploadChange = (info) => {
  //   console.log(info.file);
  //   let _data = {data};
  //   _data.uploadedImg = info.file;
  //   setImage(info.file);
  // };

  const updateData = (_data) => {
    console.log("updateData Triggered");
    console.log(_data);
    //setData(_data);
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    var formData;

    let results = form.getFieldsValue();
    formData = results;

    results.uploadedImg = uploadedImg;
    // if uploadedImg has not been updated in the edit-product form; then delete response of the uploadedImg to prevent triggering validation.
    if (results.uploadedImg && results.uploadedImg.includes("http")) {
      delete results.uploadedImg;
    }

    console.log("Results: ", results);

    if (mode === ADD) {
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
    } else {
      axiosReq({
        method: "patch",
        url: `/products/${id}/`,
        data: {
          ...results,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          setTimeout(() => {
            setSubmitLoading(false);

            message.success(`Product saved`);
          }, 1500);
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          setSubmitLoading(false);
          console.log(response);
        });
    }
  };

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
                    uploadLoading={uploadLoading}
                    // handleUploadChange={handleUploadChange}
                    categories={categories}
                    tags={tags}
                    data={form}
                    updateData={updateData}
                  />
                ),
              },
              {
                label: "Variation",
                key: "2",
                children: <VariationField />,
              },
              {
                label: "Shipping",
                key: "3",
                children: <ShippingField />,
              },
            ]}
          />
        </div>
      </Form>
    </>
  );
}

export default ProductForm;
