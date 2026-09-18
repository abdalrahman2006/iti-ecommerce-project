import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* السايدبار */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Reda Admin</h2>
        <nav>
          <NavLink to="/admin" end>📊 Dashboard</NavLink>
          <NavLink to="/admin/products">📦 Products</NavLink>
          <NavLink to="/admin/orders">🛒 Orders</NavLink>
          <NavLink to="/">🏠 Back To Store</NavLink>
        </nav>
      </aside>

      {/* المحتوى */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}