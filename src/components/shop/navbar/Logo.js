import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Logo component

function Logo() {
  return (
    <Fragment>
      <div className="logo-wrapper">
        <Link className="logo-middle" to="/">
          <span className="hvr-wobble-vertical">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo.png"} // display logo
              alt="logo"
            />
          </span>
        </Link>
      </div>
    </Fragment>
  );
}

export default Logo;
