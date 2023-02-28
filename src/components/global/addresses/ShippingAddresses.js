import React, { Fragment, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
// import loading
import Loading from "../../../components/cms/utils/Loading";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// ShippingAddresses Component
function ShippingAddresses({ ordering, getAddress }) {
  const [addressData, setAddressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // hook function
  const axiosPrivate = useAxiosPrivate();

  // ====================================================================================
  // Get all addresses which are associated with the current logged-in user
  const getAddressInfo = async () => {
    const response = await axiosPrivate.get("/auth/user/profile/addresses/");
    setAddressData(response.data.results);
    setLoading(false);
  };
  useEffect(() => {
    getAddressInfo();
    // eslint-disable-next-line
  }, []);

  // ====================================================================================

  // ====================================================================================
  // User can delete a selected address of his own

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    await axiosPrivate.delete(`/auth/user/profile/addresses/${id}/`); // id of the address selected
    getAddressInfo(); // call this function to display the latest payload once the address is deleted. (Display the remaining data, if any)
  };

  // ====================================================================================

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return addressData.length > 0 ? ( // If there is no data ( no addresses of the user ), then display message, see below span
    <Fragment>
      <div className="container">
        <div>
          <ul
            className={
              // ordering
              "addressData " +
              (ordering === 1
                ? "default-column"
                : ordering === 2
                ? "three-column"
                : ordering === 3
                ? "list-view"
                : "")
            }
          >
            {addressData.map((item, ind) => (
              <div className="address-info">
                <li key={ind}>
                  <div>
                    {" "}
                    <Tooltip placement="top" title="Delete Address" color="red">
                      <DeleteOutlined
                        onClick={(e) => deleteAddress(item.id)} // Once user click the delete icon - the id of that address will be retrieved to call the delete
                        style={{ color: "red", fontSize: "120%" }}
                      />
                    </Tooltip>
                  </div>
                  <h4>{item.first_name}</h4>
                  <h4>{item.last_name}</h4>
                  <h4>{item.apartment_address}</h4>
                  <h4> {item.street_address}</h4>
                  <h4>{item.city}</h4>
                  <h4>{item.phone_number}</h4>
                  <h4>{item.email}</h4>

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
