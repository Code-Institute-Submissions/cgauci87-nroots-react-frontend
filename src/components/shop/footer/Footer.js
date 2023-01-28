import React, { Fragment } from "react";

// Footer Component
function Footer() {
  return (
    <Fragment>
      {/* start site-footer */}
      <footer className="site-footer">
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
                        <a href="https://www.facebook.com/" title="Facebook">
                          fb
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/" title="Instagram">
                          ig
                        </a>
                      </li>{" "}
                    </ul>
                  </div>
                  <div className="extra-link">
                    <ul>
                      <li>
                        <a href="#">Contact us </a>
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
