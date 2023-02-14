import React, { useEffect, useState, Fragment } from "react";
import { Button, Modal, Form } from "antd";

// import components
import HeaderShop from "../../../components/global/navbar/HeaderShop";
import PageTitle from ".././../../components/global/pageTitle/PageTitle";
import Footer from "../../../components/shop/footer/Footer";

// import contexts
import { CartState } from "../../../contexts/CartContext";
import { jsonAxios } from "../../../api/axiosDefaults";
import useAuth from "../../../hooks/useAuth";

// import ShippingFields for Addresses
import ShippingFields from "../../../components/global/forms/ShippingFields";

// import RegisterAndLoginForm for Registration on the fly
import RegisterAndLoginForm from "../../../components/global/forms/RegisterAndLoginForm";

// Checkout Page
function Checkout({ options }) {
  // states  ==================================================================
  const [myState, setMyState] = useState({});
  useEffect(() => {
    setMyState(); // setMyState is called to update the state if a user has registered on the fly during checkout process
  }, []);

  const [form] = Form.useForm();

  // saving input values inside of state
  const [newUser, setNewUser] = useState(false);

  const [commentData, setCommentData] = useState({});

  const address_type = "S"; // S for Shipping

  // state of the cart from CartState function
  const {
    state: { cart },
  } = CartState();

  // saving input values inside of state and set total price according to the calculation
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((total, item) => parseFloat(total + item.price * item.qty), 0)
    );
  }, [cart]);

  // =========================================================================

  // Modal ===================================================================
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true); // open Modal when ShowModal function is called
  };

  const getUserFromSuccessregister = (payload) => {
    setOpen(false); // When user submit the RegisterAndLoginForm ; close the modal , set new user and update state
    setNewUser(payload.user);
    setMyState("Registered-OTF"); // Registered On The Fly (during the checkout process)
  };

  const handleCancel = () => {
    // If a user clicks Cancel button in the Modal; Modal will close
    setOpen(false);
  };

  // =========================================================================

  const { user } = useAuth(); // useAuth function to get the user

  const handleInputChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const [cartData, setCartData] = useState({
    item_id: "",
    qty: "",
    price: "",
    order_status: "Order Created",
  });

  useEffect(() => {
    setCartData(
      cart.map((item) => ({
        item_id: item.id,
        qty: item.qty,
        price: item.price,
        order_status: "Order Created",
      }))
    );
  }, [cart]);

  useEffect(() => {
    async function getCheckOutState() {
      if (user.is_active) {
        setMyState("Registered"); // setMyState according if the user.is_active
      } else {
        setMyState("Guest"); // if not user_active - Guest
      }
    }
    getCheckOutState(); // call this function asynchronous
  }, []);

  const handleOrderSubmit = async () => {
    console.log(form);
    const items = cartData;
    const first_name = form.getFieldValue("first_name"); // getFieldValue - Built in function of antD
    const last_name = form.getFieldValue("last_name");
    const email = form.getFieldValue("email");
    const phone_number = form.getFieldValue("phone_number");
    const apartment_address = form.getFieldValue("apartment_address");
    const street_address = form.getFieldValue("street_address");
    const city = form.getFieldValue("city");
    const comment = commentData.comment;
    const checkout_type = myState;

    console.log(checkout_type, "<<<<<<  this is checkout_type >>> FINAL ");

    try {
      const order = await jsonAxios.post(
        "/order/", // API
        JSON.stringify({
          // converts to a JSON string
          items: items,
          total,
          comment,
          first_name,
          last_name,
          email,
          phone_number,
          apartment_address,
          street_address,
          city,
          address_type: "S",
          checkout_type,
        })
      );
      console.log(order.data);

      if (user.is_active || newUser.id) {
        // If user is logged-in or user just registered now (using registration on the fly during the checkout process); save shipping address
        const id = user.is_active ? user.id : newUser.id;
        const userInfo = await jsonAxios.post(
          "/auth/user/profile/addresses/", // API
          JSON.stringify({
            user: id,
            first_name,
            last_name,
            email,
            phone_number,
            apartment_address,
            street_address,
            city,
            address_type,
          })
        );
        setMyState(); // This function will ensure that if a user has registered on the fly during checkout process - the state will be updated accordingly
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <HeaderShop options={options} />

      <PageTitle name="Checkout" />

      {/* start checkout-section */}
      <section className="checkout-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-sm-10">
              <div className="ecom">
                <form
                  name="checkout"
                  method="post"
                  className="checkout ecom-checkout"
                  action="/?page_id=6"
                  encType="multipart/form-data"
                >
                  <div className="col2-set" id="customer_details">
                    {/* Get shippingData from ShippingFields */}
                    <ShippingFields shippingData={form} />
                    <div>
                      <textarea
                        name="comment"
                        className="input-text"
                        id="order_comments"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        rows={2}
                        cols={5}
                        defaultValue={commentData.comment}
                        onChange={handleInputChange} // saving an input value inside of state
                      />
                    </div>
                  </div>
                  <h3 id="order_review_heading">Your order</h3>
                  <div id="order_review" className="ecom-checkout-review-order">
                    <table className="shop_table ecom-checkout-review-order-table">
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          <th className="product-price">Price</th>
                          <th className="product-quantity">Qty</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr className="cart_item">
                            <td className="product-name" data-title="Product">
                              {item.title}
                            </td>
                            <td className="product-price" data-title="Price">
                              <span className="ecom-Price-amount amount">
                                <span className="ecom-Price-currencySymbol">
                                  €
                                </span>
                                {item.price}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity">{item.qty}</div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="ecom-Price-amount amount">
                                <span className="ecom-Price-currencySymbol">
                                  €
                                </span>
                                {(item.qty * item.price).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td>
                            <span className="ecom-Price-amount amount">
                              <span className="ecom-Price-currencySymbol">
                                €
                              </span>
                              {total.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                        <tr className="shipping">
                          <th>Shipping</th>
                          <td data-title="Shipping">
                            FREE!
                            <input
                              type="hidden"
                              name="shipping_method[0]"
                              data-index={0}
                              id="shipping_method_0"
                              defaultValue="free_shipping:1"
                              className="shipping_method"
                            />
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="ecom-Price-amount amount">
                                <span className="ecom-Price-currencySymbol">
                                  €
                                </span>
                                {total}
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </form>
                {user.is_active || newUser ? null : (
                  <div className="registration-otf">
                    <span>
                      Would you like to save your shipping details and order
                      history for next time?
                    </span>
                    <Button className="label-sm" onClick={showModal}>
                      Register
                    </Button>
                  </div>
                )}
                {newUser ? (
                  <div>
                    You have successfully registered and logged in as{" "}
                    {newUser.email}
                  </div>
                ) : null}
                <Modal
                  bodyStyle={{
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 200px)",
                  }}
                  title="Register"
                  open={open}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <div>
                    <RegisterAndLoginForm
                      onSuccess={getUserFromSuccessregister} // this function will close the modal , set new user and update state
                    />
                  </div>
                </Modal>
              </div>

              <div id="payment" className="ecom-checkout-payment">
                <ul className="wc_payment_methods payment_methods methods">
                  <li className="wc_payment_method payment_cod">
                    <input
                      id="payment_cod"
                      type="radio"
                      className="input-radio"
                      name="payment_method"
                      defaultValue="cheque"
                      defaultChecked="checked"
                      data-order_button_text
                    />

                    <span className="grop-woo-radio-style" />
                    <label htmlFor="payment_cod">Cash On Delivery </label>
                    <div className="payment_box payment_cod">
                      <p>
                        When you place an order with us, you will receive an
                        instant email with your order summary.
                        <br/>
                        We delivery same day for orders submitted before noon.
                        Kindly expect a call from our team to coordinate
                        delivery.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="form-row place-order">
                  <button
                    type="button"
                    onClick={handleOrderSubmit} // This will handle order submit function -> 2 API Calls with conditional rendering
                    className="ecom-button"
                    name="update"
                    defaultValue="Update"
                  >
                    Submit Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end checkout-section */}

      <Footer />
    </Fragment>
  );
}

export default Checkout;
