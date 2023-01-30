import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// hooks
import useLogout from "../../../hooks/useLogout";

// import style
// import "./navbarRight.css";

//HeaderRight component
function HeaderRightCms({ options }) {

  const logout = useLogout();
  const navigate = useNavigate();

  async function onLogout() {
    // call this function when user clicks logout
    await logout();
    navigate("/");
  }


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
              "mini-content " +
              (options.usrAccount ? "mini-content-toggle" : "")
            }
          >
            <div className="">
              <Link
                className="view-btn"
                to="/my-account"
                onClick={options.onMyAccountClick}
              >
                My Account
              </Link>
              {/* <Link className="view-btn" onClick={onLogout}>
                Logout
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderRightCms;
