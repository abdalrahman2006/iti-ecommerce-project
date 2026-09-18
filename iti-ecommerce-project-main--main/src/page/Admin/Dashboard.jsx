import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const stats = [
    { title: "Total Sales", value: "$12,540", icon: "💰" },
    { title: "Orders", value: "320", icon: "🛒" },
    { title: "Products", value: "85", icon: "📦" },
    { title: "Customers", value: "1,240", icon: "👥" },
  ];

  const recentOrders = [
    { id: "#1001", customer: "Ahmed Ali", total: "$450", status: "Delivered" },
    { id: "#1002", customer: "Sara Mohamed", total: "$120", status: "Pending" },
    { id: "#1003", customer: "Omar Hassan", total: "$780", status: "Shipped" },
    { id: "#1004", customer: "Mona Adel", total: "$95", status: "Pending" },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* كروت الإحصائيات */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.title}>
            <span className="stat-icon">{s.icon}</span>
            <div>
              <h3>{s.value}</h3>
              <p>{s.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* آخر الأوردرات */}
      <h2>Recent Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.total}</td>
              <td>
                <span className={`status ${o.status.toLowerCase()}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}