import React, { useEffect, useState } from "react";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

// جلب الأوردرات من dummyjson (نفس مصدر الموقع)
useEffect(() => {
  fetch("https://dummyjson.com/carts")
    .then((res) => res.json())
    .then((data) => {
      const ordersWithDetails = data.carts.map((cart) => {
        // منتجات dummyjson جاهزة فيها title و price و thumbnail
        const items = cart.products.map((item) => ({
          productId: item.id,
          title: item.title,
          image: item.thumbnail,
          price: item.price,
          quantity: item.quantity,
        }));
        return {
          id: cart.id,
          userId: cart.userId,
          items,
          total: cart.total.toFixed(2),
          status: ["Delivered", "Pending", "Shipped"][cart.id % 3],
        };
      });
      setOrders(ordersWithDetails);
      setLoading(false);
    });
}, []);

  // تغيير حالة الأوردر
  const changeStatus = (id, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <div className="admin-orders">
      <h1>Orders</h1>

      {/* لو فيه أوردر محدد نعرض تفاصيله */}
      {selectedOrder ? (
        <div className="order-details">
          <button className="back-btn" onClick={() => setSelectedOrder(null)}>
            ← Back To Orders
          </button>
          <h2>Order #{selectedOrder.id}</h2>
          <p className="order-date">Date: {selectedOrder.date}</p>
          <p className="order-date">Customer ID: {selectedOrder.userId}</p>

          <table className="orders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <img src={item.image} alt="" className="order-img" />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="order-total">Total: ${selectedOrder.total}</h3>
        </div>
      ) : (
        /* جدول كل الأوردرات */
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>User {o.userId}</td>
                <td>{o.date}</td>
                <td>{o.items.length} items</td>
                <td>${o.total}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => changeStatus(o.id, e.target.value)}
                    className={`status-select ${o.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedOrder(o)}
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}