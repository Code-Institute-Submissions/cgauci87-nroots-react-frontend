import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// import style
import "./navbarRight.css";

//HeaderRight component
function HeaderRight({ options }) {
  return (
    <Fragment>
      <div className="header-right">
        <div className="my-account-link">
          <button
            className="cart-toggle-btn"
            onClick={options.onUsrAccountClick}
          >
            <i className="icon-user" />
          </button>
          <div
            className={
              "mini-cart-content " +
              (options.usrAccount ? "mini-cart-content-toggle" : "")
            }
          >
            <div className="">
              <Link className="view-cart-btn" to="/my-account" onClick={options.onMyAccountClick}>
                My Account
              </Link>
              <Link className="view-cart-btn">Sign Out</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderRight;
