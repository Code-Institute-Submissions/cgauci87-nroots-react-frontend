import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbarRight.css";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { CartState } from "../../contexts/CartContext";
import useLogout from "../../hooks/useLogout";

import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function HeaderRight({ options }) {
  const { user, setUser } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function getUser() {
      const { data } = await axiosPrivate.get("auth/user");
      setUser(data);
    }

    getUser();
  }, []);

  let timeOfDay;
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

  const {
    state: { cart },
  } = CartState();

  const [total, setTotal] = useState(null);
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
  }, [cart]);

  const logout = useLogout();
  const navigate = useNavigate()


  async function onLogout() {
    await logout()
    navigate('/')
}

  // const navigate = useNavigate();
  // async function onLogout() {
  //   await logout();
  //   localStorage.clear();
  //   window.location.reload();
  //   navigate("/");
  //   options.onLogoutClick() // <-- check where you can put it
  // }

  const loggedOutLinks = (
    <>
      <Link
        className="view-cart-btn"
        to="/auth/login"
        onClick={options.onLoginClick}
      >
        Login
      </Link>
      <Link
        className="view-cart-btn"
        to="/auth/register"
        onClick={options.onRegisterClick}
      >
        Register
      </Link>
    </>
  );
  const loggedInLinks = (
    <>
      <Link
        className="view-cart-btn"
        to="/auth/my-account"
        onClick={options.onMyAccountClick}
      >
        My Account
      </Link>
      <Link
        className="view-cart-btn"
        onClick= {onLogout}
        // onClick={() => {
        //   onLogout();
        //   options.'onLogoutClick'();
        // }}
      >
        Logout
      </Link>
      {user && user.is_staff ? (
        <Link className="checkout-btn" to="/cms" onClick={options.onCmsClick}>
          CMS
        </Link>
      ) : (
        <span></span>
      )}
    </>
  );
  let goodMorning = <span></span>;
  if (user && user.first_name) {
    goodMorning = (
      <span>
        Good {timeOfDay}, {user.first_name}!
      </span>
    );
  }

  // let cartInUse = "";
  // if ((cartInUse = cart.length === null)) {
  //   onclick = options.onMiniCartClick(false);
  // }

  return (
    <Fragment>
      <div className="header-right">
        <div className="greeting-loggedin-user">
          <h4> {goodMorning}</h4>
        </div>

        {/* ################################################################################################*/}

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
            {user && user.first_name ? loggedInLinks : loggedOutLinks}
          </div>
        </div>

        {/* ############################################################################wip####################*/}

        <div className="mini-cart">
          <button className="cart-toggle-btn" onClick={e => cart.length == 0 ? null : options.onMiniCartClick()}>
            <i className="icon-large-paper-bag" />
            <span className="cart-count">{cart.length}</span>
          </button>
          <div
            className={
              "mini-cart-content " +
              (options.miniCart ? "mini-cart-content-toggle" : "")
            }
          >
            <div className="mini-cart-items">
              {cart.map((item, index) => (
                <div key={index} className="mini-cart-item clearfix">
                  <div className="mini-cart-item-image">
                    {/* <NavLink to={item.link}> */}
                    <img src={item.uploadedImg} alt="" />
                    {/* </NavLink> */}
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
                Subtotal: € {total}
                {/* {miniCartData.subtotal} */}
              </span>
              <Link
                className="view-cart-btn"
                to="/cart"
                onClick={options.onViewCartClick}
              >
                View Cart
              </Link>
              <Link
                className="checkout-btn"
                to="/checkout"
                onClick={options.onCheckoutClick}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HeaderRight;
