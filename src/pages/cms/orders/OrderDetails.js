import React, { useEffect } from "react";
import { useState, Fragment } from "react";
import { useParams } from "react-router";
import { Form } from "antd";

// import components
import HeaderCms from "../../../components/global/navbar/HeaderCms";
import PageTitle from "../../../components/global/pageTitle/PageTitle";
import ShippingFields from "../../../components/global/forms/ShippingFields";

// import hooks
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// OrderDetails Page
function OrderDetails({ options }) {
  const axiosPrivate = useAxiosPrivate();
  const [form] = Form.useForm();

  const setFormValues = (values) => {
    form.setFieldsValue(values); // Set field values in the form
  };

  const [item, setItem] = useState(false);

  const { id } = useParams();

  // =====================================================================================

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: order } = await axiosPrivate.get(`/order/${id}/`); // Get order of a specific id
        setItem(order);
        setFormValues(order);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]); // handleMount - will trigger only when order ID is changed.

  // =====================================================================================

  // this will include the nested array (items)
  const items = item && item.items ? item.items : [];

  // =====================================================================================

  return (
    <Fragment>
      <HeaderCms options={options} />

      <PageTitle name="Order Details" />

      {/* start OrderDetails-section */}
      <section className="checkout-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <form
                name="checkout"
                method="post"
                className="checkout ecom-checkout"
              >
                <div className="col2-set" id="customer_details">
                  {/* get shipping data from form */}
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
                    {/* ================================================================================================================= */}
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
                        {/*grop add span for radio button style*/}
                        <span className="grop-woo-radio-style" />
                        {/*custom change*/}
                        <label htmlFor="payment_cod">
                          Cash On Delivery
                        </label>
                      </li>
                    </ul>
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
