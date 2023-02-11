import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import HeaderRightShop from "./HeaderRightShop";
import data from "../../../../src/data/topbar-text.json";
import NavbarShop from "./NavbarShop";

import useScrollDirection from "../../../hooks/useScrollDirection"

// HeaderShop Component

function HeaderShop({ options }) {

  const scrollDirection = useScrollDirection();

  const scrollNavClasses =
  "navigation navbar navbar-default " +
  (scrollDirection === "down" ? "-top-24" : "top-0");


  return (
    <Fragment>
      {/* start header */}
      <header id="header" className="site-header header-style-1">
        <div className="topbar">
          <div className="topbar-text">
            {/* load data from static content */}
            <p>{data.content}</p>
          </div>
        </div>
        {/* end topbar */}
        <nav className={scrollNavClasses}>
          <div className="container-fluid">
            <div className="navbar-header">
              {/* toogle navigation for mobile devices */}
              <button
                type="button"
                className="open-btn"
                onClick={options.onMobileNavClick}
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="mobile-only navbar-brand" to="/">
                {/* dispaying logo */}
                <img src={process.env.PUBLIC_URL + "logo64px.png"} alt="logo" />
              </Link>
            </div>

            <NavbarShop options={options} />

            <HeaderRightShop options={options} />
          </div>
          {/* end of container */}
        </nav>
      </header>
      {/* end of header */}
    </Fragment>
  );
}

export default HeaderShop;
