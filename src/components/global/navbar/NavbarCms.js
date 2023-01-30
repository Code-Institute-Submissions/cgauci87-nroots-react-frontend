import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

// import Logo
import Logo from "../logo/Logo";

// import style
import "./navBar.css";

// NavbarCms component
function NavbarCms({ options }) {
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
              to="/cms/products/add-product"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Add
            </NavLink>
          </li>

          <Logo />

          <li>
            <NavLink
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
              to="/"
              className={(navData) =>
                navData.isActive ? "current-menu-item" : "none"
              }
            >
              Mailbox
            </NavLink>
          </li>
        </ul>
      </div>
      {/* end of nav-collapse */}
    </Fragment>
  );
}

export default NavbarCms;
