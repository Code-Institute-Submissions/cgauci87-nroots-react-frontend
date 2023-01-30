import React, { Fragment } from "react";

// import components
import HeaderShop from "../../../components/shop/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// ContactUs Page
function ContactUs({ options }) {
  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  /*data for address*/
  const contactUsData = {
    address:
      "UA6 Grenogue Ind. Est., Dublin",
    phone_1: " 01-4013618",
    email_1: "nroots@example.com",
    time: "10AM - 5 PM, Monday to Sunday",
  };

  return (
    <Fragment>
    {/* HeaderShop with options */}
      <HeaderShop options={options} />
    
      <PageTitle name="Contact" />

      {/* start contact-section */}
      <section className="contact-section contact-pg-section section-padding">
        <div className="container-1410">
          <div className="row">
            <div className="col col-lg-10 col-lg-offset-1">
              <div className="contact-info">
                <ul>
                  <li>
                    <i className="pe-7s-culture" />
                    <h4>Office address</h4>
                    <p>{contactUsData.address}</p>
                  </li>
                  <li>
                    <i className="pe-7s-phone" />
                    <h4>Phone number</h4>
                    <p>
                      {contactUsData.phone_1}

                    </p>
                  </li>
                  <li>
                    <i className="pe-7s-mail" />
                    <h4>Email us</h4>
                    <p>
                      {contactUsData.email_1} 
                    </p>
                  </li>
                  <li>
                    <i className="pe-7s-alarm" />
                    <h4>Office time</h4>
                    <p>{contactUsData.time}</p>
                  </li>
                </ul>
              </div>
              <div className="contact-form-col">
                <h2>Let’s talk to us</h2>
                <div className="contact-form">
                  <form
                    method="post"
                    className="contact-validation-active"
                    id="contact-form-main"
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name*"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email*"
                      />
                    </div>
                    <div className="fullwidth">
                      <select name="subject">
                        <option disabled="disabled">Contact subject</option>
                        <option>Subject 1</option>
                        <option>Subject 2</option>
                        <option>Subject 3</option>
                      </select>
                    </div>
                    <div className="fullwidth">
                      <textarea
                        name="note"
                        id="note"
                        placeholder="Case Description..."
                        defaultValue={""}
                      />
                    </div>
                    <div className="submit-area">
                      <button
                        onClick={onSubmitForm}
                        type="submit"
                        className="theme-btn"
                      >
                        Submit It Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end contact-section-s3 */}

      {/*  start contact-map */}
      <section className="contact-map-section">
        <h2 className="hidden">Contact map</h2>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2384.610951107991!2d-6.473965484194954!3d53.29650387996864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486774042d477823%3A0xea6bc60be35239ff!2sGreenogue%20Business%20Park!5e0!3m2!1sen!2smt!4v1674931129132!5m2!1sen!2smt"
            allowFullScreen
          />
        </div>
      </section>
      {/* end contact-map */}

      {/* Footer component */}
      <Footer />
    </Fragment>
  );
}

export default ContactUs;
