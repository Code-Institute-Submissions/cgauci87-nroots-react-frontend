import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../global/logo/Logo";
import "./navBar.css";

// NavbarShop Component

function NavbarShop({ options }) {
  const mobNavClasses =
    "navbar-collapse collapse navigation-holder " +
    (options.mobileNav ? "slideInn" : "");

  return (
    <Fragment>
      <div
        id="navbar"
        className={
          mobNavClasses // show mobile nav on mobile/portable devices
        }
      >
        {/* on click handle mobile nav status / options App.js */}
        <button onClick={options.onMobileNavClick} className="close-navbar">
          <i className="ti-close" />
        </button>
        <ul className="nav navbar-nav">
          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/home" // navigate to home page
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/about" // navigate to about page
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
              onClick={options.onMobileNavClick}
              to="/shop" // navigate to shop page
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/contact" // navigate to contact page
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
