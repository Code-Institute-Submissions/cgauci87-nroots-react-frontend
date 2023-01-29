import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAxios } from "../../api/axiosDefaults";

import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

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
          return Promise.resolve();
        }
        return Promise.reject("Passwords do not match!");
      },
    }),
  ],
};

function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    try {
      const response = await authAxios.patch(
        "/auth/forgot-password",
        JSON.stringify({
          ...data,
        })
      );
      setTimeout(() => {
        setLoading(false);
        navigate("/auth/login");
      }, 1500);
      //handle success
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // TODO: handle errors
    }
  };
  //   To retrieve the reset_token
  useEffect(() => {
    let reset_token = window.location.search.split("reset_token=")[1];
    document.getElementById("reset_token").value = reset_token;
      console.log (reset_token, "<< This is the Reset Token inside the useEffect")
    setData(
      {
        // ...data,
        reset_token: reset_token
      }
    )
  }, []);


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
            updateData(regData);
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
            updateData(regData);
          }}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        {/* <Form.Item hidden id="reset_token" name="token" value=""></Form.Item> */}

        <Input type="hidden" id="reset_token" name="token" value={data.reset_token}></Input>

        <Form.Item className="container-1210">
          <Button
            className="ecom-Button ecom-button button ecom-form-register__submit"
            type="Submit"
            htmlType="submit"
            loading={loading}
            onClick={() => onSend()}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default ResetPasswordForm;
