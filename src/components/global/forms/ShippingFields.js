import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

// import ShippingAddresses to get/save a user shipping
import ShippingAddresses from "../addresses/ShippingAddresses";

// import hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

const { Option } = Select;
// Validation Rules - antd form
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
// Shipping Fields Page
function ShippingFields({ shippingData, enabled }) {
  const form = shippingData; // Form will get data from shippingData
  const { user } = useAuth(); // Get user from useAuth function

  // = Modal handling events ======================================================

  const [open, setOpen] = useState(false);
  const showModal = () => {
    // Show Modal if "My Addresses" button is clicks
    setOpen(true);
  };
  const handleOk = (e) => {
    setOpen(false);
  };
  const handleCancel = (e) => {
    // Close Modal if user clicks Cancel
    setOpen(false);
  };

  // = Get Address data =============================================================

  const axiosPrivate = useAxiosPrivate();
  const setFormValues = (values) => {
    form.setFieldsValue(values); // set dynamic field values
  };
  useEffect(() => {
    const getAddressInfo = async () => {
      try {
        const response = await axiosPrivate.get(
          "/auth/user/profile/addresses/"
        );
        const currentDefault = response.data.results((i) => i.default);
        if (currentDefault) {
          setFormValues(currentDefault); // set default address
        }
      } catch (error) {
        // console.log(error);
      }
    };
    if (shippingData !== undefined) {
      console.log("No Address is found");
    } else getAddressInfo();
    // eslint-disable-next-line
  }, [axiosPrivate, shippingData]);
  // =============================================================================

  const getAddress = (payload) => {
    setFormValues(payload); // get address from payload newly updated data
  };

  // = 'My Addresses' button ===================================================

  let showButton = <span></span>;
  if (user.is_active) {
    // Show button only if user is logged in
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
    // Disable button if user.is_staff
    showButton = <span></span>;
  }
  // =============================================================================
  const disabled = !enabled;

  return (
    <Fragment>
      <div className="col-1">
        <div className="ecom-billing-fields">
          <h3>Shipping Details</h3>
          {showButton}
          <Modal
            title="My Addresses"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel} // close the model handling
            okButtonProps={{
              disabled: false,
            }}
            cancelButtonProps={{
              disabled: false,
            }}
          >
            {/* get address from ShippingAddresses component */}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
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
                disabled={disabled}
              >
                <Option value="Dublin">Dublin</Option>
                <Option value="Cork">Cork</Option>
                <Option value="Galway">Galway</Option>
                <Option value="Limerick">Limerick</Option>
                <Option value="Waterford">Waterford</Option>
                <Option value="Drogheda">Drogheda</Option>
                <Option value="Dún Dealgan">Dún Dealgan</Option>
                <Option value="Swords">Swords</Option>
                <Option value="Tralee">Tralee</Option>
                <Option value="Carlow">Carlow</Option>
                <Option value="Ennis">Ennis</Option>
                <Option value="Dunleary">Dunleary</Option>
                <Option value="Kilkenny">Kilkenny</Option>
                <Option value="Naas">Naas</Option>
                <Option value="Sligo">Sligo</Option>
                <Option value="Monaghan">Monaghan</Option>
                <Option value="Ros Comáin">Ros Comáin</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}

export default ShippingFields;
