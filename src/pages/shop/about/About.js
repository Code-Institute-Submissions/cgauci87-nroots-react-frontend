import React, { Fragment } from "react";
// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

import { NavLink } from "react-router-dom";
// About Page
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
                    alt="about us"
                  />
                </div>
              </div>
            </div>
            <div className="col col-lg-4">
              <div className="mission-vision-area">
                <div>
                  <h3>Our mission</h3>
                  <p>
                    Dedicated to growing an outstanding assortment of superior
                    house plants and provide our customers with sterling
                    service. Create for our employees a stimulating, safe,
                    challenging and rewarding environment. Strive for business
                    excellence by building lasting relationships with our
                    customers.
                  </p>
                </div>
                <div>
                  <h3>Goal of our business</h3>
                  <p>
                    We are a family business, focused on exceeding customer
                    expectations on quality and service. It is our primary aim
                    to further develop the site and establish our position in
                    the market as a leading provider of house plants.
                  </p>
                </div>
                <NavLink to="/shop" className="theme-btn">
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
