import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

// import hooks
import { authAxios } from "../../../api/axiosDefaults";
import useAuth from "../../../hooks/useAuth";

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
  password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
};
// ===============================================================================
// LoginForm component
function LoginForm() {
  const [form] = Form.useForm(); // built-in useForm method of ant design for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAccessToken, setCSRFToken } = useAuth();

  const [data, setData] = useState({
    // saving input values inside of state
    email: "",
    password: "",
    password2: "",
  });

  const updateData = (regData) => {
    setData(regData);
  };

  const onSignIn = async () => {
    setLoading(true); // set loading to true as soon as the onSignIn is invoked
    try {
      const response = await authAxios.post(
        "auth/login", // API
        JSON.stringify({
          ...data, // using spread syntax to be included
        })
      );
      setTimeout(() => {
        // set timeout to call after 1500 milliseconds --> on success:
        setLoading(false); // set loading to false
        setAccessToken(response.data.access_token); // set accesstoken
        setCSRFToken(response.headers["x-csrftoken"]); // set csrftoken
        toast.success("You are now logged in."); // display toast message
        navigate("/home"); // navigate to home
      }, 1500);
    } catch (error) {
      if (error.response.status === 401) {
        // on error 401:
        toast.error("Email or Password is incorrect!"); // display toast message
        setLoading(false); // set loading to false
      }
    }
  };

  return (
    <Fragment>
      <h3>Login by email</h3>
      <Form name="login-form" layout="vertical" autoComplete="off" form={form}>
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
        <Form.Item className="ecom-LostPassword lost_password">
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </Form.Item>
        <Form.Item className="container-1310">
          <Button
            className="ecom-button"
            type="Submit"
            htmlType="submit"
            loading={loading} // set loading
            onClick={() => onSignIn()} // onSignIn function
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default LoginForm;
