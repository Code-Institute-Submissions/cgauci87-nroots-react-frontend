import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlined from "@ant-design/icons";
import { Button, Form, Input } from "antd";

// import hooks
import { authAxios } from "../../../api/axiosDefaults";

// ===============================================================================
// Validation rules - antd form
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
// ===============================================================================
// ForgotPasswordForm component
function ForgotPasswordForm() {
  const [form] = Form.useForm(); // built-in useForm method of ant design for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // saving input value inside of state
  const [data, setData] = useState({
    email: "",
  });

  const updateData = (regData) => {
    console.log(regData);
    setData(regData);
  };

  const onSend = async () => {
    setLoading(true); // set loading to true as soon as the onSend is invoked
    try {
      const response = await authAxios.post(
        "/auth/forgot-password", // API
        JSON.stringify({
          ...data, // using spread syntax to be included
        })
      );
      setTimeout(() => {
        // set timeout to call after 1500 milliseconds --> on success:
        setLoading(false); // set loading to false
        navigate("/auth/email-verification"); // navigate to /auth/email-verification
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
            updateData(regData); // saving an input value inside of state
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
            loading={loading} // set loading
            onClick={() => onSend()} // onSend function
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default ForgotPasswordForm;
