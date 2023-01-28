import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

// PageTitle Component

function PageTitle({ name }) {
  return (
    <Fragment>
      {/* start page-title */}
      <section className="page-title">
        <div className="page-title-container">
          <div className="page-title-wrapper">
            <div className="container">
              <div className="row">
                <div className="col col-xs-12">
                  <h2>{name}</h2>
                  {/* display breadcrumb */}
                  <ol className="breadcrumb">
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>{name}</li>
                  </ol>
                </div>
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </div>
        </div>
      </section>
      {/* end page-title */}
    </Fragment>
  );
}

export default PageTitle;
