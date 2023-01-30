import React, { Fragment } from "react";
// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from "../../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";
// import LoginForm
import LoginForm from "../../../components/global/forms/LoginForm";
// ===================================================================================================
// Login Page
function Login({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

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
      <Footer />
    </Fragment>
  );
}

export default Login;
