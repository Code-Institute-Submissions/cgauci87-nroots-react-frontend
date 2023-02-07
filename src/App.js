import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import components
import PersistLogin from "./components/global/persistLogin/PersistLogin";

// import hooks
import useAuth from "./hooks/useAuth";

// import global pages

import Register from "./pages/global/auth/Register";
import Login from "./pages/global/auth/LogIn";
import MyAccount from "./pages/global/auth/MyAccount";

import ForgotPassword from "./pages/global/auth/ForgotPassword";
import EmailVerification from "./pages/global/auth/EmailVerification";
import ResetPassword from "./pages/global/auth/ResetPassword";

import NotFound from "./pages/global/404/NotFound";

//import shop pages

import HomeDefault from "./pages/shop/home/HomeDefault";
import ContactUs from "./pages/shop/contactUs/ContactUs";
import About from "./pages/shop/about/About";

import ShopWithLeftSideBar from "./pages/shop/shopView/ShopWithLeftSideBar";
import ProductDetails from "./pages/shop/shopView/ProductDetails";

import Checkout from "./pages/shop/checkout/Checkout";
import Cart from "./pages/shop/cart/Cart";

// import CMS Pages:

import ProductList from "./pages/cms/products/productList/ProductList";
import AddProduct from "./pages/cms/products/addProduct/AddProduct";
import EditProduct from "./pages/cms/products/editProduct/EditProduct";
import OrderList from "./pages/cms/orders/OrderList";
import OrderDetails from "./pages/cms/orders/OrderDetails";

function App() {
  /**
   * mini cart state
   * left side info state
   * mobile nav state
   * loader state
   */
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showUsrAccount, setShowUsrAccount] = useState(false);
  const [showSideInfo, setShowSideInfo] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  /**
   * change mini cart state
   * @constructor
   */
  const HandleMiniCartStatus = () => {
    setShowMiniCart(!showMiniCart);
    setShowUsrAccount(false);
    setTimeout(() => {
      setShowMiniCart(false);
    }, 10000);
  };

  /**
   * change usr account state
   * @constructor
   */
  const HandleUsrAccountStatus = () => {
    setShowUsrAccount(!showUsrAccount);
    setShowMiniCart(false);
    setTimeout(() => {
      setShowUsrAccount(false);
    }, 6000);
  };

  /**
   * change left side info state
   * @constructor
   */
  const HandleSideInfoStatus = () => {
    setShowSideInfo(!showSideInfo);
  };

  /**
   * change mobile nav state
   * @constructor
   */
  const HandleMobileNavStatus = () => {
    setShowMobileNav(!showMobileNav);
  };

  const HandleOverlayStatus = () => {
    setShowMiniCart(false);
    setShowUsrAccount(false);
    setShowSideInfo(false);
    setShowMobileNav(false);
  };

  const options = {
    sideInfo: showSideInfo,
    mobileNav: showMobileNav,
    miniCart: showMiniCart,
    usrAccount: showUsrAccount,
    onSideInfoClick: HandleSideInfoStatus,
    onMobileNavClick: HandleMobileNavStatus,
    onMiniCartClick: HandleMiniCartStatus,
    onUsrAccountClick: HandleUsrAccountStatus,
    onRegisterClick: HandleOverlayStatus,
    onLoginClick: HandleOverlayStatus,
    onLogoutClick: HandleOverlayStatus,
    onMyAccountClick: HandleOverlayStatus,
    onCmsClick: HandleOverlayStatus,
    onViewCartClick: HandleOverlayStatus,
    onCheckoutClick: HandleOverlayStatus,
  };

  // ====================================================================================
  // get user from useAuth function
  const { user } = useAuth();

  let adminRoutes = <Route></Route>; // restrict admin routes access to admin/is_staff
  if (user.is_staff) {
    adminRoutes = (
      <React.Fragment>
        <BrowserRouter>
          <Route path="/cms">
            {/* products pages */}
            <Route path="products">
              <Route
                path="product-list"
                element={<ProductList options={options} />}
              />
              <Route
                path="add-product"
                element={<AddProduct options={options} />}
              />
              <Route
                path="view-edit/product/:id"
                element={<EditProduct options={options} />}
              />
            </Route>
            {/* orders pages */}
            <Route path="orders">
              <Route
                path="order-list"
                element={<OrderList options={options} />}
              />
              <Route
                path="order:id"
                element={<OrderDetails options={options} />}
              />
            </Route>
          </Route>
        </BrowserRouter>
      </React.Fragment>
    );

    // ====================================================================================
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ========================== SHOP ROUTING ============================= */}
          <Route path="/" element={<PersistLogin />}>
            <Route
              index
              exact
              path="/"
              element={<HomeDefault options={options} />}
            />
            <Route path="/home" element={<HomeDefault options={options} />} />
            <Route path="/contact" element={<ContactUs options={options} />} />
            <Route path="/about" element={<About options={options} />} />
            <Route path="/auth">
              <Route path="login" element={<Login options={options} />} />
              <Route path="register" element={<Register options={options} />} />
              <Route
                path="forgot-password"
                element={<ForgotPassword options={options} />}
              />
              <Route
                path="email-verification"
                element={<EmailVerification options={options} />}
              />
              <Route
                path="reset-password"
                element={<ResetPassword options={options} />}
              />
              <Route
                path="my-account"
                element={<MyAccount options={options} />}
              />
            </Route>
            <Route path="/checkout" element={<Checkout options={options} />} />
            <Route path="/cart" element={<Cart options={options} />} />
            <Route
              path="/shop"
              element={<ShopWithLeftSideBar options={options} />}
            />
            <Route
              path="/shop/product-details/:id"
              element={<ProductDetails options={options} />}
            />
            <Route path="*" element={<NotFound options={options} />} />
            {adminRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
