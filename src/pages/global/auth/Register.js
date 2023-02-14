import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from "../../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// import RegisterForm
import RegisterForm from "../../../components/global/forms/RegisterForm";

// Register Page
export default function Register({ options }) {
  return (
    <Fragment>
      {/* HeaderShop component */}
      <HeaderShop options={options} />

      <PageTitle name="Register" />

      {/* start register-layout */}
      <section className="sign-up-section">
        <div className="container-1310">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="ecom-notices-wrapper" />
                <div className="u-columns col2-set">
                  <div className="u-column1 col-1">
                    <RegisterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end register-layout */}
      {/* Footer component */}
      <Footer />
    </Fragment>
  );
}
