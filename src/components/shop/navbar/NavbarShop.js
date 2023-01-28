import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "../../global/style/navBar.css";

// NavbarShop Component

function NavbarShop({ options }) {
  return (
    <Fragment>
      <div
        id="navbar"
        className={
          "navbar-collapse collapse navigation-holder " +
          (options.mobileNav ? "slideInn" : "") // show mobile nav on mobile/portable devices
        }
      >
        {/* on click handle mobile nav status / options App.js */}
        <button onClick={options.onMobileNavClick} className="close-navbar"> 
          <i className="ti-close" />
        </button>
        <ul className="nav navbar-nav">
          <li>
            <NavLink
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
