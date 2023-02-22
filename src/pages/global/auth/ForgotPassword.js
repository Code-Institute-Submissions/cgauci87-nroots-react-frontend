import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from "../../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer"
// import ForgotPasswordForm
import ForgotPasswordForm from "../../../components/global/forms/ForgotPasswordForm";
// ===================================================================================================
// Forgot Password Page
export default function ForgotPassword({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Forgot Password" />

      {/* start forgotpassword-layout */}
      <section className="forgot-password-section">
        <div className="container-1410">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="ecom-notices-wrapper" />
                <div className="u-columns col2-set">
                  <div className="u-column1 col-1">
                    <ForgotPasswordForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end forgotpassword-layout */}
      <Footer />
    </Fragment>
  );
}
