import React, { useEffect } from "react";
import { useState, Fragment } from "react";
import { useParams } from "react-router";

import HeaderCms from "../../../../../components/header/HeaderCms";
import PageTitle from "../../../../../components/global/PageTitle";

import ShippingFields from "../../../../../pages/checkout/ShippingFields";
import { Form } from "antd";
import { jsonAxios } from "../../../../../api/axiosDefaults";

function OrderDetails({ options }) {
  const [form] = Form.useForm();

  const setFormValues = (values) => {
    form.setFieldsValue(values);
  };

  const [item, setItem] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: order } = await jsonAxios.get(`/order/${id}/`);
        setItem(order);
        setFormValues(order);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]); // handleMount - will trigger only when order ID is changed.

  // this will include the nested array (items)
  const items = item && item.items ? item.items : [];

  const getSubmitText = (item) => {
    const order_status = {
      "Order Created": "Submit Order For Processing",
      "Order Processing": "Set Order Ready",
      "Order Ready": "Set Delivered",
      "Order Delivered": "Done",
    };
    return order_status[item.order_status];
  };

  // URLS
  const changeStatus = (item) => {
    const order_status = {
      "Order Created": `/order/order-processing`,
      "Order Processing": `/order/order-ready`,
      "Order Ready": `/order/order-delivered`,
    };
    const url = order_status[item.order_status];
    const email = form.getFieldValue("email");

    jsonAxios.post(url, { id: item.id }).then((response) => {
      // alert('Order status changed to Order Processing'),
      console.log(response);
    });
  };

  return (
    <Fragment>
      <HeaderCms options={options} />

      <PageTitle name="Order Details" />

      {/* start OrderDetails-section */}
      <section className="checkout-section section-padding">
        <div className="container-1410">
          <div className="row">
            <div className="col col-xs-12">
              <form
                name="checkout"
                method="post"
                className="checkout ecom-checkout"
              >
                <div className="col2-set" id="customer_details">
                  <ShippingFields shippingData={form} />
                </div>
                <p id="order_review_heading">
                  <strong>Order ID:</strong> {item.order_id}
                  <strong>Order Status:</strong> {item.order_status}
                  <br />
                  <strong>Order Date:</strong> {item.created_at}
                </p>
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
                    {/* ===========================================================wip====================================================== */}
                    <tbody>
                      {items.map((i, item_id) => (
                        <tr key={item_id} className="cart_item">
                          <td className="product-name" data-title="Product">
                            {i.title}
                          </td>
                          <td className="product-price" data-title="Price">
                            <span className="ecom-Price-amount amount">
                              <span className="ecom-Price-currencySymbol">
                                €
                              </span>
                              {i.price}
                            </span>
                          </td>
                          <td
                            className="product-quantity"
                            data-title="Quantity"
                          >
                            <div className="quantity">{i.qty}</div>
                          </td>
                          <td className="product-subtotal" data-title="Total">
                            <span className="ecom-Price-amount amount">
                              <span className="ecom-Price-currencySymbol">
                                €
                              </span>
                              {i.total}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* ================================================================================================================= */}

                    <tfoot>
                      <tr className="cart-subtotal">
                        <th>Subtotal</th>
                        <td>
                          <span className="ecom-Price-amount amount">
                            <span className="ecom-Price-currencySymbol">€</span>
                            {item.total}
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
                        <th>Grand Total</th>
                        <td>
                          <strong>
                            <span className="ecom-Price-amount amount">
                              <span className="ecom-Price-currencySymbol">
                                €
                              </span>
                              {item.total}
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div id="payment" className="ecom-checkout-payment">
                    <ul className="wc_payment_methods payment_methods methods">
                      <li className="wc_payment_method payment_method_cheque">
                        <input
                          id="payment_method_cheque"
                          type="radio"
                          className="input-radio"
                          name="payment_method"
                          defaultValue="cheque"
                          defaultChecked="checked"
                          data-order_button_text
                        />
                        {/*grop add span for radio button style*/}
                        <span className="grop-woo-radio-style" />
                        {/*custom change*/}
                        <label htmlFor="payment_method_cheque">
                          Cash On Delivery{" "}
                        </label>
                      </li>
                    </ul>
                    <div className="form-row place-order">
                      <button
                        type="button"
                        // onClick={handleOrderSubmit}
                        className="ecom-Button ecom-button button ecom-form-register__submit"
                        name="update"
                        defaultValue="Update"
                        onClick={(e) => changeStatus(item)}
                      >
                        {getSubmitText(item)}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="form-row form-row notes" id="order_comments_field">
                <label htmlFor="order_comments">Order Notes</label>
                <textarea
                  name="comment"
                  className="input-text "
                  id="order_comments"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  rows={2}
                  cols={5}
                  defaultValue={item.comment}
                />
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* end OrderDetails-section */}
    </Fragment>
  );
}

export default OrderDetails;
