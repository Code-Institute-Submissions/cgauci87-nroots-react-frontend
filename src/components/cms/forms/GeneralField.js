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

// ===================================================================================
// convert image file to Base64 in React
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

// ===================================================================================

// GeneralField form component
const GeneralField = (props) => {
  const form = props.data;

  // ===================================================================================

  // Image handler before upload 
  const beforeUpload = (file) => {

    const sizeLimit5Mb = file.size / 2560 / 2560 < 5;
    if (!sizeLimit5Mb) {
      message.error("Image must smaller than 5MB!");
    }

    getBase64(file, (url) => {
      setLoading(false);
      props.setImage(url);
    });

    return false;
  };

  // ===================================================================================

  // Once user upload an image - display loading icon
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // ===================================================================================

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
              <Form.Item name="category"  label="Category" >
                <Select
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
              <Form.Item name="tag" label="Tag">
                <Select
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
