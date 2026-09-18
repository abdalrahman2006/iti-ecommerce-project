import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../components/Context/CartContext";
import toast from "react-hot-toast";
import "./checkout.css";
import { FaCheck } from "react-icons/fa";

function Checkout() {
  const { cartItems, appliedCoupon, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    cardHolder: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const order = placeOrder({
      address: { name: form.name, address: form.address, city: form.city },
      paymentInfo: { cardHolder: form.cardHolder, cardNumber: form.cardNumber },
    });
    setConfirmedOrder(order);
    toast.success("Order placed successfully!");
  };

  if (confirmedOrder) {
  return (
    <div className="checkout order_confirmation">
      <div className="container">
        <div className="confirmation_icon"><FaCheck /></div>
        <h1>Order Confirmed</h1>
        <p className="order_id">Order #{confirmedOrder.id}</p>
        <p className="order_amount">${confirmedOrder.total.toFixed(2)}</p>
        <div className="confirmation_actions">
          <button className="btn" onClick={() => navigate("/orders")}>
            View Order History
          </button>
          <button className="btn secondary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout_form">
          <div className="section">
            <h3>Shipping Address</h3>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
          </div>

          <div className="section">
            <h3>Payment (Mock)</h3>
            <input name="cardHolder" placeholder="Cardholder Name" value={form.cardHolder} onChange={handleChange} required />
            <input name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} maxLength={16} required />
            <div className="row">
              <input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
              <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} maxLength={3} required />
            </div>
          </div>

          {appliedCoupon && (
            <div className="section">
              <p>Coupon applied: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discount}%)</p>
            </div>
          )}

          <div className="order_total">
            <span>Subtotal:</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          {appliedCoupon && (
            <div className="order_total">
              <span>Discount:</span>
              <strong>-${discountAmount.toFixed(2)}</strong>
            </div>
          )}
          <div className="order_total">
            <span>Total:</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button type="submit" className="btn">Place Order</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;