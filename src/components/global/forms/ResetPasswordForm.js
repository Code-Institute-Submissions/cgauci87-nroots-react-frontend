import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

// import hooks
import { authAxios } from "../../../api/axiosDefaults";

// ===============================================================================
// Validation rules - antd form

const rules = {
  new_password: [
    {
      required: true,
      message: "Please input your password",
    },
  ],
  confirm_password: [
    {
      required: true,
      message: "Please confirm your password!",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("new_password") === value) {
          // Check if new_password and confirm_password are equal - otherwise return password do not match
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};
// ===============================================================================
// ResetPasswordForm component
function ResetPasswordForm() {
  const [form] = Form.useForm(); // built-in useForm method of ant design for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // saving input values inside of state
  const [data, setData] = useState({
    new_password: "",
    confirm_password: "",
    reset_token: "",
  });

  const updateData = (regData) => {
    console.log(regData);
    setData(regData);
  };

  const onSend = async () => {
    setLoading(true); // set loading to true as soon as the onSend is invoked
    try {
      const response = await authAxios.patch(
        "/auth/forgot-password", // API
        JSON.stringify({
          ...data, // using spread syntax to be included
        })
      );
      setTimeout(() => {
        // set timeout to call after 1500 milliseconds --> on success:
        setLoading(false); // set loading to false
        navigate("/auth/login"); // navigate to /auth/login
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // ===========================================================================================
  //To retrieve the reset_token
  useEffect(() => {
    let reset_token = window.location.search.split("reset_token=")[1];
    document.getElementById("reset_token").value = reset_token;
    setData({
      reset_token: reset_token,
    });
  }, []);
  // ===========================================================================================

  return (
    <Fragment>
      <h3>Input Your New Password</h3>
      <Form
        name="reset-password-form"
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="new_password"
          label="Password"
          rules={rules.new_password}
          hasFeedback
          value={data.new_password}
          onChange={(e) => {
            let regData = { ...data };
            regData.new_password = e.target.value;
            updateData(regData); // saving an input value inside of state
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          label="Confirm Password"
          rules={rules.confirm_password}
          hasFeedback
          value={data.confirm_password}
          onChange={(e) => {
            let regData = { ...data };
            regData.confirm_password = e.target.value;
            updateData(regData); // saving an input value inside of state
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Input
          type="hidden" // this input field will be hidden as we require the reset_token to be retrieved from the url and save it inside of state
          id="reset_token"
          name="token"
          value={data.reset_token}
        ></Input>

        <Form.Item className="container-1210">
          <Button
            className="ecom-button"
            type="Submit"
            htmlType="submit"
            loading={loading} // set loading
            onClick={() => onSend()} // onSend function
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default ResetPasswordForm;
