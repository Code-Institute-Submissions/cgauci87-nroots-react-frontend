import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import ShippingAddresses from "../../components/user/ShippingAddresses";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

const { Option } = Select;

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
  phone_number: [
    {
      pattern: "[1-9][0-9]",
      required: true,
      message: "Please input your phone number",
    },
  ],
  apartment_address: [
    {
      required: true,
      message: "Please input your flat/house number or/and name",
    },
  ],
  street_address: [
    {
      required: true,
      message: "Please input your street name in Maltese",
    },
  ],
  city: [
    {
      required: true,
      message: "Please select your city",
    },
  ],
};

function ShippingFields({ shippingData }) {
  const form = shippingData;
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  const axiosPrivate = useAxiosPrivate();
  const setFormValues = (values) => {

    form.setFieldsValue(values);
    /*
        currentDefault = {first_name: 'Stefan,
          last_name: Georg
          street
          city
          ....
        }
        */
        /*Object.keys(values).forEach(key => {
          //key will be first_name, then lat_name, then street... (include  vleft side of dict)
          const obj = {}
          obj[key] = values[key];
          form.setFieldsValue(obj)
        })*/
        
  }

  const getAddressInfo = async () => {
    try {
      const response = await axiosPrivate.get("/auth/user/profile/addresses/");
      const currentDefault = response.data.find((i) => i.default);
      // 
      if (currentDefault){

        setFormValues(currentDefault)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = (payload) => {
    setFormValues(payload)
  };

  useEffect(() => {
    if (shippingData != undefined) {
      console.log("No Address is found");
    } else getAddressInfo();
  }, []);



  let showButton = <h4></h4>;
  if (user.is_active) {
    showButton = (
      <h4>
        Input your shipping address or pick one from
        <Button className="label-sm" onClick={showModal}>
          My Addresses
        </Button>
      </h4>
    );
  }
  if (user.is_staff) {
    showButton = <h4></h4>;
  }

  return (
    <Fragment>
      <div className="col-1">
        <div className="ecom-billing-fields">
          <h3>Shipping Details</h3>
          {showButton}
          <Modal
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            title="My Addresses"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              disabled: false,
            }}
            cancelButtonProps={{
              disabled: false,
            }}
          >
            <div>
              <ShippingAddresses getAddress={getAddress} />
            </div>
          </Modal>
          <Form
            name="shipping-address-form"
            layout="vertical"
            autoComplete="off"
            form={form}
          >
            <Form.Item
              className="form-row form-row form-row-first"
              name="first_name"
              label="First Name"
              rules={rules.first_name}
              hasFeedback
            >
              <Input
                placeholder="John"
                prefix={<UserOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>
            <Form.Item
              className="form-row form-row form-row-first"
              name="last_name"
              label="Last Name"
              rules={rules.last_name}
              hasFeedback
            >
              <Input
                placeholder="Doe"
                prefix={<UserOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              className="form-row form-row form-row-first"
              name="email"
              label="Email"
              rules={rules.email}
              hasFeedback
            >
              <Input
                placeholder="john.doe@example.com"
                prefix={<MailOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>
            <Form.Item
              className="form-row form-row form-row-first"
              name="phone_number"
              label="Phone"
              rules={rules.phone_number}
              hasFeedback
            >
              <Input
                placeholder="79858593"
                prefix={<PhoneOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              className="form-row form-row form-row-first"
              name="apartment_address"
              label="Flat / House Number"
              rules={rules.apartment_address}
              hasFeedback
            >
              <Input
                placeholder="58, St Mary Court, Block C, Flat 4"
                prefix={<ApartmentOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              className="form-row form-row form-row-first"
              name="street_address"
              label="Street Name"
              rules={rules.street_address}
              hasFeedback
            >
              <Input
                placeholder="Triq il-Faqqiegh"
                prefix={<ApartmentOutlined className="text-primary" />}
                className="input-text"
              />
            </Form.Item>

            <Form.Item
              className="form-row form-row form-row-first"
              name="city"
              label="City"
              rules={rules.city}
              hasFeedback
            >
              <Select
                placeholder={
                  <React.Fragment>
                    <ApartmentOutlined style={{ color: "#4E89FF" }} />
                    &nbsp; Select a City
                  </React.Fragment>
                }
                className="input-text"
              >
                <Option value="Mosta">Mosta</Option>
                <Option value="Zabbar">Zabbar</Option>
                <Option value="Valletta">Valletta</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

export default ShippingFields;
