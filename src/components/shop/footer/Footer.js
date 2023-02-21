import React, { Fragment } from "react";

// Footer Component
function Footer({ currentPage }) {
  return (
    <Fragment>
      {/* start site-footer */}
      <footer className={`site-footer ${currentPage}`}>
        <div className="lower-footer">
          <div className="container-1410">
            <div className="row">
              <div className="col-xs-12">
                <div className="lower-footer-inner clearfix">
                  <div>
                    <p>© 2023, CG All Rights Reserved</p>
                  </div>
                  <div className="social">
                    <ul className="clearfix">
                      <li>
                        <a
                          href="https://facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/icons/facebook32px.png"
                            }
                            alt="facebook"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/icons/instagram32px.png"
                            }
                            alt="instagram"
                          />
                        </a>
                      </li>{" "}
                    </ul>
                  </div>
                  <div className="extra-link">
                    <ul>
                      <li>
                        <a href="/contact">CONTACT US</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end site-footer */}
    </Fragment>
  );
}

export default Footer;
