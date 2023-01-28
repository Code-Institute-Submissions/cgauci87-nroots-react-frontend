import React, { Fragment } from "react";
// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from ".././../../components/shop/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

import { NavLink } from "react-router-dom";

function About({ options }) {
  return (
    <Fragment>
      {/* HeaderShop with options */}
      <HeaderShop options={options} />
      {/* PageTitle component */}
      <PageTitle name="About us" />

      {/* start about-section */}
      <section className="about-section section-padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-lg-8">
              <div className="about-area">
                <div className="img-holder">
                  <img
                    loading="lazy"
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/aboutus/about-us-644x797.webp"
                    }
                    alt="about us picture"
                  />
                </div>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="mission-vision-area">
                <div>
                  <h3>Our mission</h3>
                  <p>
                    Pitifully thin compared with the size of the rest of him,
                    waved about helplessly as he looked. "What's happened to me
                    gregor then turned to look out the window at the dull
                    weather deal to the day
                  </p>
                </div>
                <div>
                  <h3>Goal of our business</h3>
                  <p>
                    Pitifully thin compared with the size of the rest of him,
                    waved about helplessly as he looked. "What's happened to me
                    gregor then turned to look out the window at the dull
                    weather deal to the day
                  </p>
                </div>
                <NavLink to="/shop-full-width" className="theme-btn">
                  Go to shop
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about-section */}
      {/* Footer component */}
      <Footer />
    </Fragment>
  );
}

export default About;
