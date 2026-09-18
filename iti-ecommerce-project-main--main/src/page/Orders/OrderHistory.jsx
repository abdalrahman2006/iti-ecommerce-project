import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../components/context/CartContext";
import PageTransition from "../../components/PageTransition";
import "./orders.css";

function OrderHistory() {
  const { orders } = useContext(CartContext);

  return (
    <PageTransition>
      <div className="orders_page">
        <div className="container">
          <h1>Order History</h1>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="orders_list">
              {orders.map((order) => (
                <Link to={`/orders/${order.id}`} key={order.id} className="order_card">
                  <div className="order_card_images">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img key={item.id} src={item.images?.[index]} alt={item.title} style={{ zIndex: 3 - index }} />
                    ))}
                    {order.items.length > 3 && <span className="more_items">+{order.items.length - 3}</span>}
                  </div>
                  <div className="order_card_info">
                    <div className="order_card_top">
                      <span className="order_number">Order #{order.id}</span>
                      <span className="order_status">{order.status}</span>
                    </div>
                    <p className="order_date">{new Date(order.date).toLocaleString()}</p>
                    <p className="order_items_count">{order.items.length} item(s)</p>
                  </div>
                  <strong className="order_card_total">${order.total.toFixed(2)}</strong>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default OrderHistory;