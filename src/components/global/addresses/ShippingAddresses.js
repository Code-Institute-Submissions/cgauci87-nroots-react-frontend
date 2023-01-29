import React, { Fragment, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// import hook
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// ShippingAddresses Component
function ShippingAddresses({ ordering, getAddress }) {
  const [addressData, setAddressData] = useState([]);
  const [defaultId, setDefaultId] = useState([]);

  // hook function
  const axiosPrivate = useAxiosPrivate();

  // ====================================================================================
  // Get all addresses which are associated with the current logged-in user
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
  // ====================================================================================
  // User can delete a selected address of his own

  const deleteAddress = async (id) => {
    await axiosPrivate.delete(`/auth/user/profile/addresses/${id}/`); // id of the address selected
    getAddressInfo(); // call this function to display the latest payload once the address is deleted. (Display the remaining data, if any) 
  };

  // ====================================================================================

  return addressData.length > 0 ? ( // If there is no data ( no addresses of the user ), then display message, see below span
    <Fragment>
      <div className="container">
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
            {addressData.map((item, index) => ( // an array of data to render all addresses of the user.
              <div className="address-info">
                <li key={index}>
                  <div>
                    {" "}
                    <Tooltip placement="top" title="Delete Address" color="red">
                      <DeleteOutlined
                        onClick={(e) => deleteAddress(item.id)} // Once user click the delete icon - the id of that address will be retrieved to call the delete 
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
    <span> You've got no addresses saved! </span> // This span will be visible if no data/addresses of the user
  );
}

export default ShippingAddresses;
