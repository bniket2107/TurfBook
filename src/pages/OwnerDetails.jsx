import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Adjust path as needed

const OwnerDetails = () => {
  const [owner, setOwner] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch and load owner profile data, turf list, and bookings here
    // Example: fetchOwner(), fetchTurfs(), fetchBookings()
    // Replace with your actual fetching logic
    async function fetchData() {
      // Dummy example
      const ownerData = { name: "John Doe", email: "owner@example.com" };
      const turfData = [
        { id: 1, name: "Turf 1", location: "Mumbai", image: "/assets/img/turff.jpg" },
        { id: 2, name: "Turf 2", location: "Pune", image: '/assets/img/myTurf.jpg' }
      ];
      const bookingData = [
        {
          id: 101,
          customer: "Alice",
          turf: "Turf 1",
          date: "2025-11-13",
          amount: 1200,
          status: "Confirmed"
        }
      ];
      setOwner(ownerData);
      setTurfs(turfData);
      setBookings(bookingData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container py-4">
        <h1 className="h4 mb-3">Owner Profile</h1>

        <div className="card mb-3">
          <div className="card-body">
            {owner ? (
              <>
              <p></p>
                <p><strong>Name:</strong> {owner.name}</p>
                <p><strong>Email:</strong> {owner.email}</p>
              </>
            ) : (
              "Loading…"
            )}
          </div>
        </div>

        <h2 className="h5">Turfs</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {turfs.length > 0 ? (
            turfs.map((turf) => (
              <div key={turf.id} className="col">
                <div className="card p-3 shadow-sm">{turf.name} - {turf.location}</div>
              </div>
            ))
          ) : (
            <p>No turfs available.</p>
          )}
        </div>

        <h2 className="h5 mt-4">Bookings</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Turf</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.turf}</td>
                    <td>{booking.date}</td>
                    <td>₹{booking.amount}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default OwnerDetails;
