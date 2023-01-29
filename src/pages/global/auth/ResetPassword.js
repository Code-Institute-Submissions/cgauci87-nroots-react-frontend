import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from "../../../components/shop/pageTitle/PageTitle";
// import ResetPasswordForm
import ResetPasswordForm from "../../../components/global/forms/ResetPasswordForm";
// ===================================================================================================

// Reset Password Page (once user has received the forgot password email and proceed with the link - this page will be rentered)
export default function ResetPassword({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Reset Password" />

      {/* start resetpassword-layout */}
      <section className="forgot-password-section">
        <div className="container-1310">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="ecom-notices-wrapper" />
                <div className="u-columns col2-set">
                  <div className="u-column2 col-2">
                    <ResetPasswordForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end resetpassword-layout */}
      <Footer />
    </Fragment>
  );
}
