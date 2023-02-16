import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// hooks
import useLogout from "../../../hooks/useLogout";

// import style
import "./navbarRight.css";

//HeaderRight component
function HeaderRightCms({ options }) {
  const logout = useLogout();
  const navigate = useNavigate();

  async function onLogout() {
    // call this function when user clicks logout
    await logout();
    navigate("/");
  }

  console.log(options.usrAccount, "<<< UsrAccount has been invoked")
  // debugger;
  
  return (
    <Fragment>
      <div className="header-right">
        <div className="my-account-link">
          <button
            className="toggle-btn"
            onClick={options.onUsrAccountClick}
          >
            <i className="icon-user" />
          </button>
          <div
            className={
              "usr-account-options-content " +
              (options.usrAccount ? "mini-content-toggle" : "")
            }
          >
            <div className="options-cms-wrapper">
              <div className="options-content">
                <Link
                  className="options-btn"
                  to="/auth/my-account"
                  onClick={options.onMyAccountClick}
                >
                  My Account
                </Link>
                <Link className="options-btn" onClick={onLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderRightCms;
