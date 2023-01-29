import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

// import Interceptor
import axiosInstance from "../../utils/apiInterceptor";


const rules = {
  first_name: [
    {
      required: true,
      message: "Please input your first name",
    },
  ],
  last_name: [
    {
      required: true,
      message: "Please input your last name",
    },
  ],
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
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  password2: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

function RegisterForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const updateData = (regData) => {
    console.log(regData);
    setData(regData);
  };

  const onSignUp = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "auth/register",
        JSON.stringify({
          ...data,
        })
      );
      setTimeout(() => {
        setLoading(false);
        toast.success("Your account has been created successfully.", {
        });
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("account with this email already exists.");
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <h3>Register by email</h3>
      <Form
        name="register-form"
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={rules.first_name}
          hasFeedback
          value={data.first_name}
          onChange={(e) => {
            let regData = { ...data };
            regData.first_name = e.target.value;
            updateData(regData);
          }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={rules.last_name}
          hasFeedback
          value={data.last_name}
          onChange={(e) => {
            let regData = { ...data };
            regData.last_name = e.target.value;
            updateData(regData);
          }}
        >
          <Input />
        </Form.Item>

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
        <Form.Item
          name="password"
          label="Password"
          rules={rules.password}
          hasFeedback
          value={data.password}
          onChange={(e) => {
            let regData = { ...data };
            regData.password = e.target.value;
            updateData(regData);
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="password2"
          label="Confirm Password"
          rules={rules.password2}
          hasFeedback
          value={data.password2}
          onChange={(e) => {
            let regData = { ...data };
            regData.password2 = e.target.value;
            updateData(regData);
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item className="ecom-text-box">
          <p>
            An email confirming your registration will be sent to your email
            address.
          </p>
        </Form.Item>
        <Form.Item className="ecom-text-box ecom-privacy-policy-text">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <a href="#" className="ecom-privacy-policy-link">
              privacy policy
            </a>
            .
          </p>
        </Form.Item>
        <Form.Item className="container-1210">
          <Button
            className="ecom-Button ecom-button button ecom-form-register__submit"
            type="Submit"
            htmlType="submit"
            loading={loading}
            onClick={() => onSignUp()}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default RegisterForm;
