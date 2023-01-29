import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from "../../../components/shop/pageTitle/PageTitle";

// Email Verification Page (once user submit ForgotPasswordForm - this page will be rentered)

export default function EmailVerification({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Email Verification" />

      {/* start emailverification-layout */}
      <section className="email-verification-section">
        <div className="form-horizontal">
          <div className="row">
            <div className="col-xs-12">
              <div className="u-column2 col-2 "></div>

              <div className="border border-success">
                <h2>You're Almost There...</h2>
                <h3>
                  An email with a link has been sent to your registered email
                  address. Please follow the instructions in the email to
                  complete the reset password process.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end emailverification-layout */}

      <Footer />
    </Fragment>
  );
}
