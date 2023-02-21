import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  FontColorsOutlined,
  MessageOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";

// import axios
import { jsonAxios } from "../../../api/axiosDefaults";

// ===============================================================================
const { TextArea } = Input;

// Validation rules - antd form
const rules = {
  full_name: [
    {
      required: true,
      message: "Please input your name",
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
  subject: [
    {
      required: true,
      message: "Please input subject",
    },
  ],
  message: [
    {
      required: true,
      message: "Please input your message",
    },
  ],
};
// ===============================================================================
// RegistrationForm component
function ContactUsForm() {
  const [form] = Form.useForm(); // built-in useForm method of ant design for validation
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    // saving input values inside of state
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateData = (cfData) => {
    console.log(cfData);
    setData(cfData);
  };

  const onSubmit = async () => {
    setLoading(true); // set loading to true as soon as the onSubmit is invoked
    try {
      await jsonAxios.post(
        "/contact", // API
        JSON.stringify({
          ...data, // using spread syntax to be included
        })
      );
      setTimeout(() => {
        // set timeout to call after 1500 milliseconds
        setLoading(false); // set loading to false on success
        navigate("/contact-form-submitted"); // navigate to login page once successful
      }, 1500);
    } catch (error) {
      // Error Handling
      if (error.response.status === 400) {
        toast.error(
          "Please make sure all required fields are filled in correctly."
        ); // display toast message on error 400
        setLoading(false); // set loading to false
      }
    }
  };

  return (
    <Fragment>
      <h3>Get in touch</h3>
      <Form
        name="register-form"
        layout="vertical"
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="full_name"
          label="Name"
          rules={rules.full_name}
          hasFeedback
          value={data.full_name}
          onChange={(e) => {
            let cfData = { ...data };
            cfData.full_name = e.target.value;
            updateData(cfData); // saving an input value inside of state
          }}
        >
          <Input prefix={<UserOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={rules.email}
          hasFeedback
          value={data.email}
          onChange={(e) => {
            let cfData = { ...data };
            cfData.email = e.target.value;
            updateData(cfData); // saving an input value inside of state
          }}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <div className="fullwidth">
          <Form.Item
            name="subject"
            label="Subject"
            rules={rules.subject}
            hasFeedback
            value={data.subject}
            onChange={(e) => {
              let cfData = { ...data };
              cfData.subject = e.target.value;
              updateData(cfData); // saving an input value inside of state
            }}
          >
            <Input prefix={<FontColorsOutlined className="text-primary" />} />
          </Form.Item>
        </div>

        <div className="fullwidth">
          <Form.Item
            name="message"
            label="Message"
            rules={rules.message} 
            hasFeedback
            value={data.message}
            onChange={(e) => {
              let cfData = { ...data };
              cfData.message = e.target.value;
              updateData(cfData); // saving an input value inside of state
            }}
          >
            <MessageOutlined className="text-primary" />
            <TextArea rows={10} />
          </Form.Item>
        </div>

        <Form.Item className="container-1210">
          <Button
            className="ecom-button"
            type="Submit"
            htmlType="submit"
            loading={loading} // set loading
            onClick={() => onSubmit()} //onSubmit function
          >
            Submit Message
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default ContactUsForm;
