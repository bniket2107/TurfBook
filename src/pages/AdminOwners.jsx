import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';

const ownersData = [
  {
    name: "Ravi Shah",
    email: "ravi@example.com",
    phone: "9876543210",
    status: "PENDING",
  },
  {
    name: "Neha Patil",
    email: "neha@example.com",
    phone: "9123456780",
    status: "APPROVED",
  }
];

const statusBadge = (status) => {
  if (status === "PENDING") {
    return (
      <span className="badge"
        style={{ background: "#FFD600", color: "#333", fontWeight: 500 }}>
        PENDING
      </span>
    );
  }
  if (status === "APPROVED") {
    return (
      <span className="badge"
        style={{ background: "#28A745", color: "#fff", fontWeight: 500 }}>
        APPROVED
      </span>
    );
  }
  return null;
};

const AdminOwners = () => (
  <div>
    <Navbar />

  <main className="container" style={{ minHeight: "32vh" }}>
    <h1 className="h4">Owners</h1>
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ownersData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">No data</td>
            </tr>
          ) : (
            ownersData.map((owner, idx) => (
              <tr key={idx}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phone}</td>
                <td>{statusBadge(owner.status)}</td>
                <td>
                  {/* Approve button */}
                  {owner.status === "PENDING" && (
                    <button className="btn btn-success btn-sm me-2" style={{ minWidth: 82 }}>
                      Approve
                    </button>
                  )}
                  {/* View button */}
                  <Link to="/owner-details" className="btn btn-primary" >View</Link>

                  {/* Suspend button */}
                  <button className="btn btn-outline-danger btn-sm" style={{ minWidth: 70 }}>
                    Suspend
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
   
    <footer className="text-center mt-4" style={{ color: "#6c757d" }}>
      © TurfBook 2025 Terms & Conditions
    </footer>
  </main>
     </div>
);

export default AdminOwners;
