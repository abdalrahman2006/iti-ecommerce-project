import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
import { FaTrash } from "react-icons/fa";
import CouponBox from "../../components/Coupon/CouponBox";
import "./cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;

  const total = subtotal - discount;

  return (
    <div className="checkout">
      <div className="ordersummary">
        <h1>Order Summary</h1>

        <div className="items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="item_cart" key={item.id}>
                <div className="image_name">
                  <img src={item.images?.[0]} alt={item.title} />

                  <div className="content">
                    <h4>{item.title}</h4>
                    <p className="price_item">${item.price}</p>

                    <div className="quantity_control">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      <span className="quantity">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="delete_item"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && <CouponBox />}

        <div className="bottom_summary">
          <div className="shop_table">
            <p>Subtotal :</p>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {appliedCoupon && (
            <div className="shop_table discount_row">
              <p>Discount ({appliedCoupon.discount}%) :</p>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="shop_table">
            <p>Total :</p>
            <span className="total_checkout">${total.toFixed(2)}</span>
          </div>

          <div className="button_div">
            <button
              type="button"
              onClick={clearCart}
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;