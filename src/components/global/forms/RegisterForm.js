import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

// import Interceptor
import axiosInstance from "../../../utils/apiInterceptor";

// ===============================================================================
// Validation rules - antd form
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
      message: "Please enter a valid email",
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
// ===============================================================================
// RegistrationForm component
function RegisterForm() {
  const [form] = Form.useForm(); // built-in useForm method of ant design for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    // saving input values inside of state
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
    setLoading(true); // set loading to true as soon as the onSignUp is invoked
    try {
      await axiosInstance.post(
        "auth/register", // API
        JSON.stringify({
          ...data, // using spread syntax to be included
        })
      );
      setTimeout(() => {
        // set timeout to call after 1500 milliseconds
        setLoading(false); // set loading to false on success
        toast.success("Your account has been created successfully.", {
          // display toast message on success
        });
        navigate("/auth/login"); // navigate to login page once successful
      }, 1500);
    } catch (error) {
      // Error Handling
      if (error.response.status === 400) {
        toast.error("Account with this email already exists."); // display toast message on error 400
        setLoading(false); // set loading to false
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
            updateData(regData); // saving an input value inside of state
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
            updateData(regData); // saving an input value inside of state
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
            updateData(regData); // saving an input value inside of state
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
            updateData(regData); // saving an input value inside of state
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
            updateData(regData); // saving an input value inside of state
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item>
          <p>
            An email confirming your registration will be sent to your email
            address.
          </p>
        </Form.Item>
        <Form.Item className="container-1210">
          <Button
            className="ecom-button"
            type="Submit"
            htmlType="submit"
            loading={loading} // set loading
            onClick={() => onSignUp()} // onSignup function
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default RegisterForm;
