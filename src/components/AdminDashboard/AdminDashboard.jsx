import React from "react";
import "./AdminDashboard.scss";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="admin-links">
        <Link className="admin-link" to="/admin/applications">
          View Applications
        </Link>
        <Link className="admin-link" to="/admin/dogs">
          View Dogs
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;
