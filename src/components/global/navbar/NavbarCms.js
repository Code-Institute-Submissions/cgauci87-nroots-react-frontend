import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

// import Logo
import Logo from "../logo/Logo";

// import style
import "./navBar.css";

// NavbarCms component
function NavbarCms({ options }) {
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
        <button onClick={options.onMobileNavClick} className="close-navbar">
          <i className="ti-close" />
        </button>
        <ul className="nav navbar-nav">
          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/cms/products/product-list"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Product List
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/cms/products/add-product"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Add Product
            </NavLink>
          </li>

          <Logo />

          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/cms/orders/order-list"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={options.onMobileNavClick}
              to="/shop"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
      </div>
      {/* end of nav-collapse */}
    </Fragment>
  );
}

export default NavbarCms;
