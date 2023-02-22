import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";

// hooks
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";



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

  // ################################################################################################

  const { user } = useAuth();

  let timeOfDay; /* Greeting to be displayed according the time of the day */
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "afternoon";
  } else if (hours >= 12 && hours < 23) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  let showGreeting = <span></span>;
  if (user.is_staff) {
    /* Display greeting if user is logged in, display first name to enhance personalization */
    showGreeting = (
      <span>
        Good {timeOfDay}, {user.first_name}!
      </span>
    );
  }

  // ################################################################################################

  return (
    <Fragment>
      <div className="header-right cms">
        <div className="greeting-loggedin-user">
          {/* display the greeting message */}
          <h4> {showGreeting}</h4>
        </div>

        {/* ################################################################################################*/}

        <div className="my-account-link">
          <button className="toggle-btn" onClick={options.onUsrAccountClick}>
            <Tooltip title="My Admin Profile">
              <img
                id="king-icon"
                style={{ maxWidth: "28px" }}
                src={
                  process.env.PUBLIC_URL + "/assets/icons/king-icon-64px.png"
                }
                alt="admin account"
              />
            </Tooltip>
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
