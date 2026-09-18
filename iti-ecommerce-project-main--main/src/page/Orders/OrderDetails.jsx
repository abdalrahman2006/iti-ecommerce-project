import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
import PageTransition from "../../components/PageTransition";
import "./orders.css";
import { FaArrowLeft } from "react-icons/fa";

function OrderDetails() {
  const { id } = useParams();
  const { orders } = useContext(CartContext);
  const order = orders.find((o) => String(o.id) === id);

  if (!order) {
    return (
      <div className="container">
        <p>Order not found.</p>
<Link to="/orders" className="back_link">
  <FaArrowLeft /> Back to Order History
</Link>      </div>
    );
  }

  return (
    <PageTransition>
      <div className="order_details_page">
        <div className="container">
          <Link to="/orders" className="back_link">← Back to Order History</Link>
          <h1>Order #{order.id}</h1>
          <p>{new Date(order.date).toLocaleString()}</p>
          <span className="order_status">{order.status}</span>

          <h3>Shipping Address</h3>
          <p>{order.address?.name}</p>
          <p>{order.address?.address}, {order.address?.city}</p>

          <h3>Items</h3>
          <div className="order_items">
            {order.items.map((item) => (
              <div className="order_item_row" key={item.id}>
                <img src={item.images[0]} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity} × ${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order_summary_totals">
            <div><span>Subtotal:</span><span>${order.subtotal.toFixed(2)}</span></div>
            {order.coupon && (
              <div><span>Coupon ({order.coupon.code}):</span><span>-${order.discountAmount.toFixed(2)}</span></div>
            )}
            <div className="grand_total"><span>Total:</span><span>${order.total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default OrderDetails;