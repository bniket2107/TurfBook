import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/custom.css"; // Ensure this file exists

// Demo Data
const DEMO_TURFS = [
  { id: 1, name: "Green Field Arena", price: 800, location: "Andheri, Mumbai" },
  { id: 2, name: "City Sports Turf", price: 900, location: "Goregaon, Mumbai" },
  { id: 3, name: "Sunrise Arena", price: 850, location: "Borivali, Mumbai" },
];

const DEMO_BOOKINGS = [
  { id: "BK1A2B3", turfId: 1, date: "2025-10-01", time: "18:00-19:00", amount: 800, status: "CONFIRMED" },
  { id: "BK1A2B4", turfId: 2, date: "2025-10-02", time: "19:00-20:00", amount: 900, status: "CONFIRMED" },
  { id: "BK9Z8Y7", turfId: 3, date: "2025-09-20", time: "10:00-11:00", amount: 850, status: "COMPLETED" },
];

// Helper functions
const getTotalRevenue = (bookings) =>
  bookings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

const getCurrentMonthRevenue = (bookings) => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  return bookings
    .filter((b) => b.date && b.date.startsWith(`${year}-${month}`))
    .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
};

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedTurfId, setSelectedTurfId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "owner") navigate("/login");
  }, [user, navigate]);

  const bookingsForSelectedTurf = DEMO_BOOKINGS.filter(
    (b) => Number(b.turfId) === Number(selectedTurfId)
  );

  // KPI Data
  const totalRevenue = getTotalRevenue(DEMO_BOOKINGS);
  const currentMonthRevenue = getCurrentMonthRevenue(DEMO_BOOKINGS);
  const activeTurfs = DEMO_TURFS.length;
  const totalBookings = DEMO_BOOKINGS.length;

  const isTurfSelected = !!selectedTurfId;

  // Button handlers
  const handleEditTurf = () => {
    if (!selectedTurfId) return;
    const turf = DEMO_TURFS.find((t) => t.id === selectedTurfId);
    if (!turf) return;
    navigate(`/owner-edit-turf?tid=${turf.id}&tname=${encodeURIComponent(turf.name)}&price=${turf.price}`);
  };

  const handleSlotBooking = () => {
    if (!selectedTurfId) return;
    navigate(`/owner-slot-booking?tid=${selectedTurfId}`);
  };

  return (
    <>
      <Navbar />

      {/* Horizontal Turf Selection Bar */}
      <div className="turf-bar d-flex align-items-center px-3 py-2 border-bottom bg-white flex-wrap">
        <h5 className="me-3 mb-0">Select Turf:</h5>
        <div className="d-flex flex-row flex-wrap gap-2" id="ownerTurfList">
          {DEMO_TURFS.map((t) => (
            <div className="form-check form-check-inline" key={t.id}>
              <input
                className="form-check-input d-none"
                type="radio"
                name="turfSelect"
                id={`turf${t.id}`}
                value={t.id}
                checked={Number(selectedTurfId) === Number(t.id)}
                onChange={() => setSelectedTurfId(t.id)}
              />
              <label
                className={`form-check-label px-3 py-1 rounded-pill border ${
                  Number(selectedTurfId) === Number(t.id)
                    ? "bg-primary text-white border-primary"
                    : "bg-light text-dark border-secondary"
                }`}
                htmlFor={`turf${t.id}`}
                style={{ cursor: "pointer", fontWeight: 500 }}
              >
                {t.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container-fluid">
        <main className="px-md-4 py-4">
          <h1 className="h4 mt-3">Dashboard</h1>

          {/* KPI Cards */}
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="text-muted small">Total Revenue</div>
                  <div className="fs-5">₹{totalRevenue}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="text-muted small">Bookings</div>
                  <div className="fs-5">{totalBookings}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="text-muted small">Active Turfs</div>
                  <div className="fs-5">{activeTurfs}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="text-muted small">This Month</div>
                  <div className="fs-5">₹{currentMonthRevenue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Turf Action Buttons */}
          <div className="d-flex justify-content-start align-items-center mt-4 gap-2 flex-wrap">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleEditTurf}
              disabled={!isTurfSelected}
              title={isTurfSelected ? "Edit selected turf" : "Select a turf first"}
            >
              Edit Turf
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/owner-add-turf")}
            >
              Add Turf
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={handleSlotBooking}
              disabled={!isTurfSelected}
              title={isTurfSelected ? "Book slots for selected turf" : "Select a turf first"}
            >
              Slot Booking
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate("/owner-details")}
              title="Configure Payment Options"
            >
              Payment Details
            </button>
          </div>

          {/* Bookings Table */}
          <h2 className="h5 mt-4">Recent Bookings</h2>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Booking</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {!isTurfSelected ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      Select a turf to view bookings
                    </td>
                  </tr>
                ) : bookingsForSelectedTurf.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No bookings for this turf
                    </td>
                  </tr>
                ) : (
                  bookingsForSelectedTurf.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>₹{b.amount}</td>
                      <td>
                        <span
                          className={`badge ${
                            b.status === "CONFIRMED"
                              ? "text-bg-success"
                              : "text-bg-secondary"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default OwnerDashboard;