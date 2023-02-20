import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import Footer from "../../../components/shop/footer/Footer";

// Landing Page for PostContactUs (once user submit contact form - this page will be rentered)

export default function PostContactUs({ options }) {
  return (
    <Fragment>
      <HeaderShop options={options} />

      {/* start layout */}
      <section className="email-verification-section section-padding">
        <div className="container">
          <div className="form-horizontal">
            <div className="row">
              <div className="col-xs-12">
                <div className="u-column2 col-2 "></div>

                <div className="border border-success">
                  <h2>Thank you for contacting us!</h2>
                  <hr></hr>
                  <p>Your message has been successfully submitted.</p>
                  <p>A copy of your message has been sent to your inbox.</p>
                  <p>Our team will get back to you the soonest possible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end layout */}

      <Footer />
    </Fragment>
  );
}
