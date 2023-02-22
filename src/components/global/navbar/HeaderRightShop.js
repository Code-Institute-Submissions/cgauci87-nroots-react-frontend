import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbarRight.css";
import { Link } from "react-router-dom";
import { CartState } from "../../../contexts/CartContext";
import { Tooltip } from "antd";

// hooks
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// HeaderRightShop Component
function HeaderRightShop({ options }) {
  const { user, setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function getUser() {
      const { data } = await axiosPrivate.get("auth/user");
      setUser(data);
    }

    getUser(); // Get user to perform conditional rendering
  }, [axiosPrivate, setUser]);

  // ============================================================================================
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
  if (user && user.first_name) {
    /* Display greeting if user is logged in, display first name to enhance personalization */
    showGreeting = (
      <span>
        Good {timeOfDay}, {user.first_name}!
      </span>
    );
  }

  const {
    state: { cart },
  } = CartState(); // Check Cart State

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => parseFloat(total + item.price * item.qty), 0)
    ); // Set cart total according to the state
  }, [cart]);

  // ============================================================================================

  const logout = useLogout();
  const navigate = useNavigate();

  async function onLogout() {
    // call this function when user clicks logout
    await logout();
    navigate("/");
  }

  // ============================================================================================

  // Logged out links defined to display links according if user is logged in or out

  const loggedOutLinks = (
    <>
      <div className="options-wrapper">
        <div className="options-content">
          <Link
            className="options-btn"
            to="/auth/login"
            onClick={options.onLoginClick}
          >
            Login
          </Link>
          <Link
            className="options-btn distinct-btn"
            to="/auth/register"
            onClick={options.onRegisterClick}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
  // ============================================================================================

  // Logged in links defined to display links according if user is logged in or out
  const loggedInLinks = (
    <>
      <div className="options-wrapper">
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
          {user && user.is_staff ? (
            <Link
              className="options-btn distinct-btn"
              to="/cms/products/product-list"
              onClick={options.onCmsClick}
            >
              CMS
            </Link>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );

  // ============================================================================================

  return (
    <Fragment>
      <div className="header-right">
        <div className="greeting-loggedin-user">
          {/* display the greeting message */}
          <h4> {showGreeting}</h4>
        </div>

        <div className="my-account-link">
          {/* USER */}
          <button
            className="toggle-btn"
            // on click display options for user
            onClick={options.onUsrAccountClick}
          >
            {/* display icon of user */}
            <Tooltip title="Profile" placement="left">
              <i className="icon-user" />
            </Tooltip>
          </button>
          <div
            className={
              "usr-account-options-content " +
              (options.usrAccount ? "mini-content-toggle" : "")
            }
          >
            {/* display options for user depends if user is logged in. */}
            {/* If user is logged in, display loggedInLinks - otherwise display loggedOutLinks */}
            {user && user.is_active ? loggedInLinks : loggedOutLinks}
          </div>
        </div>

        {/* ################################################################################################*/}

        <div className="mini-cart">
          {/* MINI CART */}
          <button
            className="toggle-btn"
            // on click - call options.onMiniCartClick() function to display items in cart
            // on click -  if cart is empty -  do not call options.onMiniCartClick() function
            onClick={(e) =>
              cart.length === 0 ? null : options.onMiniCartClick()
            }
          >
            <Tooltip title="Cart" placement="right">
              <i className="icon-large-paper-bag" />
            </Tooltip>
            <span className="cart-count">{cart.length}</span>
          </button>
          <div
            className={
              "mini-content " + (options.miniCart ? "mini-content-toggle" : "")
            }
          >
            <div className="mini-cart-items">
              {/* display an array of items in cart  */}
              {cart.map((item, index) => (
                <div key={index} className="mini-cart-item clearfix">
                  <div className="mini-cart-item-image">
                    <img src={item.uploadedImg} alt="product" />
                  </div>
                  <div className="mini-cart-item-des">
                    {item.title}
                    <span className="mini-cart-item-quantity">
                      Qty: {item.qty}
                    </span>
                    <span className="mini-cart-item-price">€{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mini-cart-action clearfix">
              <span className="mini-checkout-price">
                Subtotal: € {total.toFixed(2)}
              </span>
              <Link
                className="view-btn"
                to="/cart"
                // on click - it will handle overlay status which is defined in options in App.js
                onClick={options.onViewCartClick}
              >
                View Cart
              </Link>
              <Link
                className="checkout-btn"
                to="/checkout" // navigate to checkout page
                // on click - it will handle overlay status which is defined in options in App.js
                onClick={options.onCheckoutClick}
              >
                Checkout
              </Link>
            </div>
            {/* ################################################################################################*/}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderRightShop;
