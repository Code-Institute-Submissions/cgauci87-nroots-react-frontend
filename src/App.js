import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import components
import PersistLogin from "./components/global/PersistLogin";
// import api
import "./api/axiosDefaults";
// import hooks
import useAuth from "../src/hooks/useAuth";

// import global pages

import Login from "./pages/global/auth/";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EmailVerification from "./pages/Auth/EmailVerification";
import ResetPassword from "./pages/Auth/ResetPassword";
import NotFound from "./pages/404/NotFound";

//import shop pages

import HomeDefault from "./pages/home/Default";
import ContactUs from "./pages/contactUs/ContactUs";
import About from "./pages/about/About";
import MyAccount from "./pages/myAccount/MyAccount";

import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";

import ShopWithLeftSideBar from "./pages/shop/ShopWithLeftSideBar";

import SingleVerticalThumbnail from "./pages/shop/SingleVerticalThumbnail";

import ProductDetails from "./pages/shop/ProductDetails";


// import CMS Pages:

import ProductList from "./views/app-views/apps/e-commerce/product-list";
import AddProduct from "./views/app-views/apps/e-commerce/add-product";
import EditProduct from "./views/app-views/apps/e-commerce/edit-product";
import OrderList from "./views/app-views/apps/e-commerce/orders/OrderList";
import OrderDetails from "./views/app-views/apps/e-commerce/orders/OrderDetails";


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


  
  const { user } = useAuth();

  // const axiosPrivate = useAxiosPrivate();

  // useEffect(() => {
  //   async function getUser() {
  //     const { data } = await axiosPrivate.get("auth/user");
  //     setUser(data);
  //   }

  //   getUser();
  // }, []);

  let adminRoutes = <Route></Route>;
  if (user.is_staff) {
    adminRoutes = (
      <React.Fragment>
        <Route path="cms" element={<ProductList options={options} />} />
        <Route
          path="cms/product-list"
          element={<ProductList options={options} />}
        />
        <Route
          path="cms/add-product"
          element={<AddProduct options={options} />}
        />
        <Route
          path="cms/edit-product/:id"
          element={<EditProduct options={options} />}
        />
        <Route path="cms/orders" element={<OrderList options={options} />} />
        <Route
          path="cms/orders/:id"
          element={<OrderDetails options={options} />}
        />
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <Router>
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
            <Route
              path="/home-style-2"
              element={<Style2 options={options} />}
            />
            <Route
              path="/home-styl3-3"
              element={<Style3 options={options} />}
            />
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
              path="/single-vertical-thumbnail"
              element={<SingleVerticalThumbnail options={options} />}
            />
            <Route
              path="/shop/product-details/:id"
              element={<ProductDetails options={options} />}
            />
            <Route path="*" element={<NotFound options={options} />} />

            {adminRoutes}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
