import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";

// Landing Page for PostCheckout (once user submit order - this page will be rentered)

export default function PostCheckout({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

      {/* start emailverification-layout */}
      <section className="email-verification-section section-padding">
      <div className="container">
        <div className="form-horizontal">
          <div className="row">
            <div className="col-xs-12">
              <div className="u-column2 col-2 "></div>

              <div className="border border-success">
                <h2>Thank you for shopping with us!</h2>
                <hr></hr>
                <p>Your order has been successfully submitted.</p>
                <p>
                  An email with your order summary has been sent to your inbox.
                </p>
                <p>
                  We delivery same day for orders submitted before noon. Kindly
                  expect a call from our team to coordinate delivery.
                </p>
              </div>
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
