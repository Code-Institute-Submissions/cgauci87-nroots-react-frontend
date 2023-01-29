import React, { Fragment } from "react";

import Footer from "../../components/global/Footer";
import Instagram from "../../components/global/Instagram";
import Header from "../../components/header/HeaderShop";
import PageTitle from "../../components/global/PageTitle";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

export default function ForgotPassword({ options }) {
  return (
    <Fragment>
      <Header options={options} />

      <PageTitle name="Forgot Password" />

      {/* start forgotpassword-layout */}
      <section className="forgot-password-section">
        <div className="container-1310">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="ecom-notices-wrapper" />
                <div className="u-columns col2-set">
                  <div className="u-column2 col-2">
                    <ForgotPasswordForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end forgotpassword-layout */}

      <Instagram />
      <Footer />
    </Fragment>
  );
}
