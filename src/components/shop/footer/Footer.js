import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Footer Component
function Footer({currentPage}) {
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
                    <p>© 2022, All Rights Reserved</p>
                  </div>
                  <div className="social">
                    <ul className="clearfix">
                      <li>
                        <Link to="https://facebook.com/"   target="_blank" rel="noopener noreferrer">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/icons/facebook32px.png"
                            }
                            alt="facebook"
                          />
                        </Link>
                      
                      </li>
                      <li>
                      <Link to="https://instagram.com/"   target="_blank" rel="noopener noreferrer">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/icons/instagram32px.png"
                            }
                            alt="instagram"
                          />
                        </Link>
                      
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
