import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// import components
import NavbarCms from "./NavbarCms";
import HeaderRightCms from './HeaderRightCms';

// HeaderCms component
function HeaderCms({ options }) {
  return (
    <Fragment>
      {/* Start header */}
      <header id="header" className="site-header header-style-1">
        <nav className="navigation navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="open-btn"
                onClick={options.onMobleNavClick}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="mobile-only navbar-brand" to="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  alt=""
                />
              </Link>
            </div>

            <NavbarCms options={options} />
            <HeaderRightCms options={options} />
          </div>
          {/* end of container */}
        </nav>
      </header>
      {/* end of header */}
    </Fragment>
  );
}

export default HeaderCms;
