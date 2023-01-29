import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../api/axiosDefaults";
import useAuth from "../../hooks/useAuth";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";

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

function LoginForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAccessToken, setCSRFToken } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const updateData = (regData) => {
    console.log(regData);
    setData(regData);
  };

  const onSignIn = async () => {
    setLoading(true);
    try {
      const response = await authAxios.post(
        "auth/login",
        JSON.stringify({
          ...data,
        })
      );
      setTimeout(() => {
        setLoading(false);
        setAccessToken(response.data.access_token);
        setCSRFToken(response.headers["x-csrftoken"]);
        toast.success("You are now logged in.");
        navigate("/home");
      }, 1500);
      //handle success
      console.log(response);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Email or Password is incorrect!");
        setLoading(false);
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
        <Form.Item className="ecom-LostPassword lost_password">
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </Form.Item>
        <Form.Item className="container-1310">
          <Button
            className="ecom-button button ecom-form-login__submit"
            type="Submit"
            htmlType="submit"
            loading={loading}
            onClick={() => onSignIn()}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default LoginForm;
