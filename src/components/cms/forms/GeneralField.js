import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message,
  Select,
  InputNumber,
} from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const GeneralField = (props) => {
  console.log("general field received title", props.data.title);
  const form = props.data;
  form.setFieldValue({ uploadedImg: "test" });
  console.log(form.getFieldsValue());

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    console.log("fields", form.getFieldsValue());
    getBase64(file, (url) => {
      setLoading(false);
      props.setImage(url);
    });

    return false;
  };

  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, () => {
        setLoading(false);
      });
    }
  };
  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Form
        name="shipping-address-form"
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="Basic Info">
              <Form.Item
                label="Product Title"
                name="title"
                value={props.data.title}
                className="w-100"
                rules={[
                  {
                    required: true,
                    message: "Please input a product title",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Product Description"
                name="description"
                value={props.data.description}
                rules={[
                  {
                    required: true,
                    message: "Please input a product description",
                  },
                ]}
                rows={4}
              >
                <Input.TextArea />
              </Form.Item>
            </Card>
            <Card title="Pricing">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="New Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input a new price",
                      },
                    ]}
                  >
                    <InputNumber
                      // defaultValue={10.99}
                      step={0.01}
                      prefix="€"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Old Price"
                    name="comparePrice"
                    rules={[
                      {
                        required: true,
                        message: "Please input an old price",
                      },
                    ]}
                  >
                    <InputNumber
                      // defaultValue={11.99}
                      defaultValue={props.data.comparePrice}
                      step={0.01}
                      prefix="€"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Card title="Media">
              <Form.Item name="uploadedImg"></Form.Item>
              <Upload
                name="uploadedImg"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                {props.imageUrl ? (
                  <img
                    src={props.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Card>
            <Card title="Category & Tag">
              <Form.Item name="category">
                <Select
                  mode="category"
                  placeholder="Pick a Category"
                  className="w-100"
                  value={props.data.category}
                >
                  {props.categories.map((elm) => (
                    <Option key={elm[0]} value={elm[0]}>
                      {elm[1]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="tag">
                <Select
                  mode="tag"
                  placeholder="Pick a Tag"
                  className="w-100"
                  value={props.data.tag}
                >
                  {props.tags.map((elm) => (
                    <Option key={elm[0]} value={elm[0]}>
                      {elm[1]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GeneralField;
