import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../api/axiosDefaults";

import MailOutlined  from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const rules = {
  email: [
    {
      required: true,
      message: "Please input your email address",
    },
    {
      type: "email",
      message: "Please enter a valid email!",
    },
  ],
};

function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const updateData = (regData) => {
    console.log(regData);
    setData(regData);
  };

  const onSend = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post(
        "/auth/forgot-password",
        JSON.stringify({
          ...data,
        })
      );
      setTimeout(() => {
        setLoading(false);
        navigate("/auth/email-verification");
      }, 1500);
      //handle success
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // TODO: handle errors
    }
  };

  return (
    <Fragment>
      <h3>Enter Your Registered Email</h3>
      <Form
        name="forgot-password-form"
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={rules.email}
          hasFeedback
          value={data.email}
          onChange={(e) => {
            let regData = { ...data };
            regData.email = e.target.value;
            updateData(regData);
          }}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item className="ecom-text-box">
          <p>An email with a link will be sent to your email address.</p>
        </Form.Item>
        <Form.Item className="container-1210">
          <Button
            className="ecom-Button ecom-button button ecom-form-register__submit"
            type="Submit"
            htmlType="submit"
            loading={loading}
            onClick={() => onSend()}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default ForgotPasswordForm;
