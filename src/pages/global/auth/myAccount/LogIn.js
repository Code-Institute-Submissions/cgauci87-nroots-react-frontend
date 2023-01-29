import React, { Fragment } from "react";
import Footer from "../../components/global/Footer";
import Instagram from "../../components/global/Instagram";
import PageTitle from "../../components/global/PageTitle";
import Header from "../../components/header/HeaderShop";

import LoginForm from "../../components/forms/LoginForm";

// ===================================================================================================

function Login({ options }) {
  return (
    <Fragment>
      <Header options={options} />

      <PageTitle name="Login" />

      {/* start log-in-layout */}
      <section className="sign-in-section">
        <div className="container-1310">
          <div className="row">
            <div className="col-xs-12">
              <div className="ecom">
                <div className="ecom-notices-wrapper" />
                <div className="u-columns col2-set" id="customer_login">
                  <div className="u-column1 col-1">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end log-in-layout */}

      <Instagram />
      <Footer />
    </Fragment>
  );
}

export default Login;
