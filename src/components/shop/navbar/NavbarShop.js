import React, { useEffect, useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { authAxios, axiosReq } from "../../api/axiosDefaults";
import Logo from "./Logo";
import "./navBar.css";

/**
 * nav bar component
 * @param options
 * @returns {*}
 * @constructor
 */

function NavbarShop({ options }) {
  return (
    <Fragment>
      <div
        id="navbar"
        className={
          "navbar-collapse collapse navigation-holder " +
          (options.mobileNav ? "slideInn" : "")
        }
      >
        <button onClick={options.onMobileNavClick} className="close-navbar">
          <i className="ti-close" />
        </button>
        <ul className="nav navbar-nav">
          <li>
            <NavLink
              to="/home"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              About
            </NavLink>
          </li>

        <Logo />

          <li>
            <NavLink
              to="/shop"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* end of nav-collapse */}
    </Fragment>
  );
}

export default NavbarShop;
