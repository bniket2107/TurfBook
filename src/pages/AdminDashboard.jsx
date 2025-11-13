import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
// You can import Chart.js and initialize the charts inside useEffect.

const AdminDashboard = () => {
  useEffect(() => {
    // Initialize charts and fetch dashboard data here in JS (similar to assets/js/admin.js)
    // Example: initialize Chart.js chartBookings canvas and fetch data for spans
  }, []);

  return (
    <>
    <Navbar />
    <main className="container py-4">
      <h1 className="h4 mb-3">Overview</h1>
      <div className="row g-3">
        <div className="col-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="text-muted small">Revenue</div>
              <div className="fs-5">₹<span id="revTotal">0</span></div>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="text-muted small">Bookings</div>
              <div className="fs-5"><span id="countBookings">0</span></div>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="text-muted small">Owners</div>
              <div className="fs-5"><span id="countOwners">0</span></div>
            </div>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="text-muted small">Active Users</div>
              <div className="fs-5"><span id="activeUsers">0</span></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="h5 mt-4">Trends</h2>
      <div className="card">
        <div className="card-body">
          <canvas id="chartBookings" height="140"></canvas>
        </div>
      </div>
    </main>
    </>
  );
};

export default AdminDashboard;
