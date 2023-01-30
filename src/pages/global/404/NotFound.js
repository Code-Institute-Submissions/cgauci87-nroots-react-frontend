import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";

//  404 Page (Not Found)

function NotFound({ options }) {
  return (
    <Fragment>
      {/* HeaderShop with options */}
      <HeaderShop options={options} />

      {/* start error-404-section */}
      <section className="error-404-pg error-404-section section-padding">
        <div className="container-1410">
          <div className="error-404-area">
            <h2>404</h2>
            <div className="error-message">
              <h3>Oops! Page Not Found!</h3>
              <p>
                We’re sorry but we can’t seem to find the page you requested.
                This might be because you have typed the web address
                incorrectly.
              </p>
              <NavLink to="/" className="theme-btn">
                Back to Home
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      {/* end error-404-section */}
      {/* Footer component  */}
      <Footer />
    </Fragment>
  );
}

export default NotFound;
