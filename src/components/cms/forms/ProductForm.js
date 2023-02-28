import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, message } from "antd";
import { useParams } from "react-router";

// import components
import PageHeaderAlt from "../../cms/pageHeader/PageHeaderAlt";
import Flex from "../../cms/utils/Flex";
import GeneralField from "./GeneralField";
import Loading from "../utils/Loading";
import { toast } from "react-toastify";

// import hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// declare add/edit for mode
const ADD = "ADD";
const EDIT = "EDIT";

// ======================================================================

// ProductForm component (for ADD & EDIT)
function ProductForm(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const axiosPrivate = useAxiosPrivate();
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
    axiosPrivate.get("categories").then((response) => {
      let _categories = response.data.categories;
      if (_categories.length > 0) {
        let data = {};
        data.category = _categories[0][0];
        form.setFieldsValue(data);
      }
      setCategories(_categories);
    });
  }, [axiosPrivate, form]);

  useEffect(() => {
    axiosPrivate.get("tags").then((response) => {
      let _tags = response.data.tags;
      if (_tags.length > 0) {
        let data = {};
        data.tag = _tags[0][0];
        form.setFieldsValue(data);
      }
      setTags(_tags);
    });
  }, [axiosPrivate, form]);

  // ======================================================================

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await axiosPrivate.get("/products");
        let data = response.data.results;
        const productData = data.find((product) => product.id === +id);
        if (productData) {
          form.setFieldsValue(productData); // set values of product data
          setImage(productData.uploadedImg); // set image
        }
      } catch (error) {
        toast.error(
          "Unable to get product right now... Please try again later"
        ); // the error will trigger if backend is down
      }
    };
    if (mode === EDIT) {
      getProductList(); // Fetch data if edit is clicked
    }
  }, [mode, axiosPrivate, form, id]);

  // ======================================================================

  // ======================================================================

  const onFinish = async () => {
    setSubmitLoading(true); // if user add an image

    // ======================================================================

    const results = form.getFieldsValue();
    results.uploadedImg = uploadedImg;
    // if uploadedImg has not been updated in the edit-product form; then delete results.uploadedImg
    if (results.uploadedImg && results.uploadedImg.includes("http")) {
      delete results.uploadedImg;
    }

    // =======================================================================================
    // Dual API requests based on condiontional rendering

    if (mode === ADD) {
      // if admin/is_staff adding a product
      axiosPrivate({
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
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            toast.error(
              "Please make sure all required fields are filled in correctly."
            ); // display toast message on error 400
            setSubmitLoading(false); // set loading to false
          }
        });
    } else {
      // referring to mode === EDIT, if admin/is_staff edit a product
      axiosPrivate({
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
            message.success(`Changes of ${results.title} saved`);
          }, 1500);
        })
        .catch(function (error) {
          if (error.response.status === 400) {
            toast.error(
              "Please make sure all required fields are filled in correctly."
            ); // display toast message on error 400
            setSubmitLoading(false); // set loading to false
          }
        });
    }
  };

  // =======================================================================================

  if (loading) {
    <div>
      <Loading />
    </div>;
  } else
    return (
      <>
        <Form
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
                <h2 className="mb-3" style={{ marginTop: "50px" }}>
                  {mode === "ADD" ? "Add New Product" : `Product Details`}{" "}
                </h2>
              </Flex>
            </div>
          </PageHeaderAlt>
          <div className="container">
            <Tabs
              defaultActiveKey="1"
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
                },
              ]}
            />
          </div>
          <div className="container">
            <div className="cms-button">
              <Button
                type="file"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={submitLoading}
              >
                {mode === "ADD" ? "Add" : `Save`}
              </Button>
            </div>
          </div>
        </Form>
      </>
    );
}

export default ProductForm;
