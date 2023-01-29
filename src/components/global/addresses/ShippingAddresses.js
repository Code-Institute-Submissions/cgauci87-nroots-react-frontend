import React, { Fragment, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// import hook
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

// ShippingAddresses Component
function ShippingAddresses({ ordering, getAddress }) {

  const [addressData, setAddressData] = useState([]);
  const [defaultId, setDefaultId] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  // ====================================================================================
  // Get all addresses which are associated with the current user 
  const getAddressInfo = async () => {
    const response = await axiosPrivate.get("/auth/user/profile/addresses/");
    setAddressData(response.data);
    const currentDefault = response.data.find((i) => i.default);
    const currentDefaultId = currentDefault ? currentDefault.id : false;
    setDefaultId(currentDefaultId);
  };
  useEffect(() => {
    getAddressInfo();
  }, []);

    // ====================================================================================


  // Set new default id if user clicks set default to a preferred address
  const setNewDefault = async (newDefaultId) => {
    await axiosPrivate.patch(`/auth/user/profile/addresses/${newDefaultId}/`, {
      default: true,
    });
    await axiosPrivate.patch(`/auth/user/profile/addresses/${defaultId}/`, {
      default: false,
    });
    setDefaultId(newDefaultId);
  };

  const deleteAddress = async (id) => {
    await axiosPrivate.delete(`/auth/user/profile/addresses/${id}/`);
    getAddressInfo();
  };

  // const deleteAddress = async (id) => {
  //   await axiosReq.delete(`/auth/user/profile/addresses/${id}/`);
  //   getAddressInfo();
  // };

  return addressData.length > 0 ? (
    <Fragment>
      <div className="container">
        {/* <div>
          <img className="address-img" src={address_img} />
        </div> */}
        <div>
          <ul
            className={
              "addressData " +
              (ordering == 1
                ? "default-column"
                : ordering == 2
                ? "three-column"
                : ordering == 3
                ? "list-view"
                : "")
            }
          >
            {addressData.map((item, index) => (
              <div className="address-info">
                <li key={index}>
                  <div>
                    {" "}
                    <Tooltip placement="top" title="Delete Address" color="red">
                      <DeleteOutlined
                        onClick={(e) => deleteAddress(item.id)}
                        style={{ color: "red", fontSize: "120%" }}
                      />
                    </Tooltip>
                  </div>
                  <h4>{item.apartment_address}</h4>
                  <h4> {item.street_address}</h4>
                  <h4>{item.city}</h4>
                  <br></br>
                  {getAddress ? (
                    <button
                      className="button-sm"
                      onClick={(e) => getAddress(item)}
                    >
                      Use Address
                    </button>
                  ) : null}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  ) : (
    <span> You've got no addresses saved! </span>
  );
}

export default ShippingAddresses;
