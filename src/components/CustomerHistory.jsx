import React, { useState } from "react";
import Navbar from "./Navbar";

const CustomerHistory = () => {
  // State for date filters
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // Example: booking data array (replace with real data fetch)
  const [bookings, setBookings] = useState([]);
  // If connected to backend, filter bookings based on `from` and `to` as needed

  // Handler for filter button (implement logic as needed)
  const handleFilter = () => {
    // Add filter logic with setBookings here
  };

  return (
    <div>
    <Navbar />
    <main className="container py-4" style={{marginBottom: '-5%'}}>
      <h1 className="h4">My Bookings</h1>
      <div className="card">
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label">From</label>
              <input
                type="date"
                id="from"
                className="form-control"
                value={from}
                onChange={e => setFrom(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">To</label>
              <input
                type="date"
                id="to"
                className="form-control"
                value={to}
                onChange={e => setTo(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-4 d-grid">
              <button
                id="btnFilter"
                className="btn btn-primary"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Booking</th>
              <th>Turf</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="historyRows">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No data
                </td>
              </tr>
            ) : (
              bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.bookingNumber}</td>
                  <td>{b.turfName}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>{b.amount}</td>
                  <td>{b.status}</td>
                  <td>
                    {/* Add action buttons/links here as required */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
    </div>
  );
};

export default CustomerHistory;
