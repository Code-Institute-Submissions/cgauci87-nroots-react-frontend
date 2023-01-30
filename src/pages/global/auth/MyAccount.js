import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal } from "antd";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from "../../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// import hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// import ShippingAddresses
import ShippingAddresses from "../../../components/global/addresses/ShippingAddresses";


// MyAccount Page (This page is accessible only for a logged-in user)
function MyAccount({ options }) {
  /*=========START============================= Get User account data  ===============================START=============*/

  const [user, setUser] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function getUserProfile() {
      const { data } = await axiosPrivate.get("/auth/user/profile/");
      setUser(data);
    }

    getUserProfile();
  }, []);

  /*=========END============================= Get User account data  ===============================END=============*/

  /*============START========================== MyAddresses  Modal =============================START===============*/

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

  let showButton = <span></span>;
  if (user.is_active) {
    showButton = (
      <Button className="label-sm" onClick={showModal}>
        My Addresses
      </Button>
    );
  }
  if (user.is_staff) {
    showButton = <span></span>;
  }

  /*===========END=========================== MyAddresses Modal ===============================END=============*/

  return (
    <Fragment>
      {/* HeaderShop component with options */}
      <HeaderShop options={options} />
      {/* PageTitle component */}
      <PageTitle name="My Account" />

      {/* start my-account-section */}
      <section className="my-account-section">
        <div className="form-horizontal">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="u-columns col2-set">
                  <div className="u-column2 col-2">
                    <form
                      method="post"
                    >
                      <label htmlFor="uf_first_name">First Name&nbsp;</label>
                      <input
                        type="text"
                        value={user.first_name}
                        readOnly={true}
                        className="ecom-Input ecom-Input--text input-text"
                        name="first_name"
                        id="uf_first_name"
                      />
                      <label htmlFor="uf_last_name">Last Name&nbsp;</label>
                      <input
                        type="text"
                        value={user.last_name}
                        readOnly={true}
                        className="ecom-Input ecom-Input--text input-text"
                        name="last_name"
                        id="uf_last_name"
                      />
                      <label htmlFor="uf_email">Email address&nbsp;</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly={true}
                        className="ecom-Input ecom-Input--text input-text"
                        name="email"
                        id="uf_email"
                      />

                      {showButton}
                      <Modal
                        bodyStyle={{
                          overflowY: "auto",
                          maxHeight: "calc(100vh - 200px)",
                        }}
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
                          {/* ShippingAddresses component */}
                          <ShippingAddresses /> 
                        </div>
                      </Modal>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end my-account-section */}
      <Footer />
    </Fragment>
  );
}

export default MyAccount;
