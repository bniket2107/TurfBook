// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "../assets/css/custom.css"; // Ensure this file exists

// // Demo Data
// const DEMO_TURFS = [
//   { id: 1, name: "Green Field Arena", price: 800, location: "Andheri, Mumbai" },
//   { id: 2, name: "City Sports Turf", price: 900, location: "Goregaon, Mumbai" },
//   { id: 3, name: "Sunrise Arena", price: 850, location: "Borivali, Mumbai" },
// ];

// const DEMO_BOOKINGS = [
//   { id: "BK1A2B3", turfId: 1, date: "2025-10-01", time: "18:00-19:00", amount: 800, status: "CONFIRMED" },
//   { id: "BK1A2B4", turfId: 2, date: "2025-10-02", time: "19:00-20:00", amount: 900, status: "CONFIRMED" },
//   { id: "BK9Z8Y7", turfId: 3, date: "2025-09-20", time: "10:00-11:00", amount: 850, status: "COMPLETED" },
// ];

// // Helper functions
// const getTotalRevenue = (bookings) =>
//   bookings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

// const getCurrentMonthRevenue = (bookings) => {
//   const now = new Date();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const year = String(now.getFullYear());
//   return bookings
//     .filter((b) => b.date && b.date.startsWith(`${year}-${month}`))
//     .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
// };

// const OwnerDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [selectedTurfId, setSelectedTurfId] = useState(null);

//   useEffect(() => {
//     if (!user || user.role !== "owner") navigate("/login");
//   }, [user, navigate]);

//   const bookingsForSelectedTurf = DEMO_BOOKINGS.filter(
//     (b) => Number(b.turfId) === Number(selectedTurfId)
//   );

//   // KPI Data
//   const totalRevenue = getTotalRevenue(DEMO_BOOKINGS);
//   const currentMonthRevenue = getCurrentMonthRevenue(DEMO_BOOKINGS);
//   const activeTurfs = DEMO_TURFS.length;
//   const totalBookings = DEMO_BOOKINGS.length;

//   const isTurfSelected = !!selectedTurfId;

//   // Button handlers
//   const handleEditTurf = () => {
//     if (!selectedTurfId) return;
//     const turf = DEMO_TURFS.find((t) => t.id === selectedTurfId);
//     if (!turf) return;
//     navigate(`/owner-edit-turf?tid=${turf.id}&tname=${encodeURIComponent(turf.name)}&price=${turf.price}`);
//   };

//   const handleSlotBooking = () => {
//     if (!selectedTurfId) return;
//     navigate(`/owner-slot-booking?tid=${selectedTurfId}`);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Horizontal Turf Selection Bar */}
//       <div className="turf-bar d-flex align-items-center px-3 py-2 border-bottom bg-white flex-wrap">
//         <h5 className="me-3 mb-0">Select Turf:</h5>
//         <div className="d-flex flex-row flex-wrap gap-2" id="ownerTurfList">
//           {DEMO_TURFS.map((t) => (
//             <div className="form-check form-check-inline" key={t.id}>
//               <input
//                 className="form-check-input d-none"
//                 type="radio"
//                 name="turfSelect"
//                 id={`turf${t.id}`}
//                 value={t.id}
//                 checked={Number(selectedTurfId) === Number(t.id)}
//                 onChange={() => setSelectedTurfId(t.id)}
//               />
//               <label
//                 className={`form-check-label px-3 py-1 rounded-pill border ${
//                   Number(selectedTurfId) === Number(t.id)
//                     ? "bg-primary text-white border-primary"
//                     : "bg-light text-dark border-secondary"
//                 }`}
//                 htmlFor={`turf${t.id}`}
//                 style={{ cursor: "pointer", fontWeight: 500 }}
//               >
//                 {t.name}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Dashboard Content */}
//       <div className="container-fluid">
//         <main className="px-md-4 py-4">
//           <h1 className="h4 mt-3">Dashboard</h1>

//           {/* KPI Cards */}
//           <div className="row g-3">
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Total Revenue</div>
//                   <div className="fs-5">₹{totalRevenue}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Bookings</div>
//                   <div className="fs-5">{totalBookings}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Active Turfs</div>
//                   <div className="fs-5">{activeTurfs}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">This Month</div>
//                   <div className="fs-5">₹{currentMonthRevenue}</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Turf Action Buttons */}
//           <div className="d-flex justify-content-start align-items-center mt-4 gap-2 flex-wrap">
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={handleEditTurf}
//               disabled={!isTurfSelected}
//               title={isTurfSelected ? "Edit selected turf" : "Select a turf first"}
//             >
//               Edit Turf
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={() => navigate("/owner-add-turf")}
//             >
//               Add Turf
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={handleSlotBooking}
//               disabled={!isTurfSelected}
//               title={isTurfSelected ? "Book slots for selected turf" : "Select a turf first"}
//             >
//               Slot Booking
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={() => navigate("/owner-details")}
//               title="Configure Payment Options"
//             >
//               Payment Details
//             </button>
//           </div>

//           {/* Bookings Table */}
//           <h2 className="h5 mt-4">Recent Bookings</h2>
//           <div className="table-responsive">
//             <table className="table table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>Booking</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {!isTurfSelected ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-muted">
//                       Select a turf to view bookings
//                     </td>
//                   </tr>
//                 ) : bookingsForSelectedTurf.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-muted">
//                       No bookings for this turf
//                     </td>
//                   </tr>
//                 ) : (
//                   bookingsForSelectedTurf.map((b) => (
//                     <tr key={b.id}>
//                       <td>{b.id}</td>
//                       <td>{b.date}</td>
//                       <td>{b.time}</td>
//                       <td>₹{b.amount}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             b.status === "CONFIRMED"
//                               ? "text-bg-success"
//                               : "text-bg-secondary"
//                           }`}
//                         >
//                           {b.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default OwnerDashboard;

// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "../assets/css/custom.css"; // Ensure this file exists

// // Demo Data
// const DEMO_TURFS = [
//   { id: 1, name: "Green Field Arena", price: 800, location: "Andheri, Mumbai" },
//   { id: 2, name: "City Sports Turf", price: 900, location: "Goregaon, Mumbai" },
//   { id: 3, name: "Sunrise Arena", price: 850, location: "Borivali, Mumbai" },
// ];

// const DEMO_BOOKINGS = [
//   { id: "BK1A2B3", turfId: 1, date: "2025-10-01", time: "18:00-19:00", amount: 800, status: "CONFIRMED" },
//   { id: "BK1A2B4", turfId: 2, date: "2025-10-02", time: "19:00-20:00", amount: 900, status: "CONFIRMED" },
//   { id: "BK9Z8Y7", turfId: 3, date: "2025-09-20", time: "10:00-11:00", amount: 850, status: "COMPLETED" },
// ];

// // Helper functions
// const getTotalRevenue = (bookings) =>
//   bookings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

// const getCurrentMonthRevenue = (bookings) => {
//   const now = new Date();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const year = String(now.getFullYear());
//   return bookings
//     .filter((b) => b.date && b.date.startsWith(`${year}-${month}`))
//     .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
// };

// const OwnerDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [selectedTurfId, setSelectedTurfId] = useState(null);

//   useEffect(() => {
//     if (!user || user.role !== "owner") navigate("/login");
//   }, [user, navigate]);

//   const bookingsForSelectedTurf = DEMO_BOOKINGS.filter(
//     (b) => Number(b.turfId) === Number(selectedTurfId)
//   );

//   // KPI Data
//   const totalRevenue = getTotalRevenue(DEMO_BOOKINGS);
//   const currentMonthRevenue = getCurrentMonthRevenue(DEMO_BOOKINGS);
//   const activeTurfs = DEMO_TURFS.length;
//   const totalBookings = DEMO_BOOKINGS.length;

//   const isTurfSelected = !!selectedTurfId;

//   // Button handlers
//   const handleEditTurf = () => {
//     if (!selectedTurfId) return;
//     const turf = DEMO_TURFS.find((t) => t.id === selectedTurfId);
//     if (!turf) return;
//     navigate(`/owner-edit-turf?tid=${turf.id}&tname=${encodeURIComponent(turf.name)}&price=${turf.price}`);
//   };

//   const handleSlotBooking = () => {
//     if (!selectedTurfId) return;
//     navigate(`/owner-slot-booking?tid=${selectedTurfId}`);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Horizontal Turf Selection Bar */}
//       <div className="turf-bar d-flex align-items-center px-3 py-2 border-bottom bg-white flex-wrap">
//         <h5 className="me-3 mb-0">Select Turf:</h5>
//         <div className="d-flex flex-row flex-wrap gap-2" id="ownerTurfList">
//           {DEMO_TURFS.map((t) => (
//             <div className="form-check form-check-inline" key={t.id}>
//               <input
//                 className="form-check-input d-none"
//                 type="radio"
//                 name="turfSelect"
//                 id={`turf${t.id}`}
//                 value={t.id}
//                 checked={Number(selectedTurfId) === Number(t.id)}
//                 onChange={() => setSelectedTurfId(t.id)}
//               />
//               <label
//                 className={`form-check-label px-3 py-1 rounded-pill border ${
//                   Number(selectedTurfId) === Number(t.id)
//                     ? "bg-primary text-white border-primary"
//                     : "bg-light text-dark border-secondary"
//                 }`}
//                 htmlFor={`turf${t.id}`}
//                 style={{ cursor: "pointer", fontWeight: 500 }}
//               >
//                 {t.name}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Dashboard Content */}
//       <div className="container-fluid">
//         <main className="px-md-4 py-4">
//           <h1 className="h4 mt-3">Dashboard</h1>

//           {/* KPI Cards */}
//           <div className="row g-3">
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Total Revenue</div>
//                   <div className="fs-5">₹{totalRevenue}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Bookings</div>
//                   <div className="fs-5">{totalBookings}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">Active Turfs</div>
//                   <div className="fs-5">{activeTurfs}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-6 col-lg-3">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="text-muted small">This Month</div>
//                   <div className="fs-5">₹{currentMonthRevenue}</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Turf Action Buttons */}
//           <div className="d-flex justify-content-start align-items-center mt-4 gap-2 flex-wrap">
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={handleEditTurf}
//               disabled={!isTurfSelected}
//               title={isTurfSelected ? "Edit selected turf" : "Select a turf first"}
//             >
//               Edit Turf
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={() => navigate("/owner-add-turf")}
//             >
//               Add Turf
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={handleSlotBooking}
//               disabled={!isTurfSelected}
//               title={isTurfSelected ? "Book slots for selected turf" : "Select a turf first"}
//             >
//               Slot Booking
//             </button>
//             <button
//               className="btn btn-sm btn-primary"
//               onClick={() => navigate("/owner-details")}
//               title="Configure Payment Options"
//             >
//               Payment Details
//             </button>
//           </div>

//           {/* Bookings Table */}
//           <h2 className="h5 mt-4">Recent Bookings</h2>
//           <div className="table-responsive">
//             <table className="table table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>Booking</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {!isTurfSelected ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-muted">
//                       Select a turf to view bookings
//                     </td>
//                   </tr>
//                 ) : bookingsForSelectedTurf.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center text-muted">
//                       No bookings for this turf
//                     </td>
//                   </tr>
//                 ) : (
//                   bookingsForSelectedTurf.map((b) => (
//                     <tr key={b.id}>
//                       <td>{b.id}</td>
//                       <td>{b.date}</td>
//                       <td>{b.time}</td>
//                       <td>₹{b.amount}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             b.status === "CONFIRMED"
//                               ? "text-bg-success"
//                               : "text-bg-secondary"
//                           }`}
//                         >
//                           {b.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default OwnerDashboard;

//-------------------------------------------------------------------------------------
// import React, { useEffect, useState, useContext } from "react";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);   // contains token + role + email

//   const [owner, setOwner] = useState(null);
//   const [turfs, setTurfs] = useState([]);
//   const [stats, setStats] = useState({
//     revenue: 0,
//     bookings: 0
//   });

//   useEffect(() => {
//     if (!user || user.role !== "owner") return;

//     const token = user.token;

//     // Fetch owner details
//     const fetchOwner = async () => {
//       const res = await fetch("http://localhost:8088/api/owners/me", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       setOwner(data);
//     };

//     // Fetch owner turfs
//     const fetchTurfs = async () => {
//       const res = await fetch("http://localhost:8088/api/turfs/owner-turfs", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       setTurfs(data);
//     };

//     // Fetch revenue + bookings
//     const fetchStats = async () => {
//       const res = await fetch("http://localhost:8088/api/bookings/owner-stats", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       setStats({
//         revenue: data.totalRevenue,
//         bookings: data.totalBookings
//       });
//     };

//     fetchOwner();
//     fetchTurfs();
//     fetchStats();
//   }, [user]);

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <h1 className="h4 mb-3">Owner Dashboard</h1>

//         {/* Owner Display */}
//         {owner && (
//           <div className="alert alert-info">
//             <strong>Welcome, {owner.name}</strong><br />
//             Email: {owner.email}
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="row g-3">
//           <div className="col-6 col-lg-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="text-muted small">Revenue</div>
//                 <div className="fs-5">₹{stats.revenue}</div>
//               </div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="text-muted small">Bookings</div>
//                 <div className="fs-5">{stats.bookings}</div>
//               </div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="text-muted small">Your Turfs</div>
//                 <div className="fs-5">{turfs.length}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Turf List */}
//         <h2 className="h5 mt-4">Your Turfs</h2>
//         <div className="card">
//           <div className="card-body">
//             {turfs.length === 0 ? (
//               <p>No turfs added yet.</p>
//             ) : (
//               <ul>
//                 {turfs.map((turf) => (
//                   <li key={turf.id}>{turf.name} — {turf.location}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default AdminDashboard;


// // ------


// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";

// const OwnerDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [ownerDetails, setOwnerDetails] = useState(null);
//   const [turfs, setTurfs] = useState([]);
//   const [stats, setStats] = useState({ revenue: 0, bookings: 0 });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user || user.role !== "OWNER") {
//       navigate("/login");
//       return;
//     }

//     const fetchOwnerDetails = async () => {
//       try {
//         const res = await fetch("http://localhost:8088/api/owners/me", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });

//         if (!res.ok) throw new Error("Failed to load owner data");

//         const data = await res.json();
//         setOwnerDetails(data.owner);
//         setTurfs(data.turfs || []);
//         setStats(data.stats || { revenue: 0, bookings: 0 });

//       } catch (err) {
//         console.error(err);
//         setError("Error fetching dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOwnerDetails();
//   }, [user, navigate]);

//   if (loading) return <p className="text-center mt-5">Loading Dashboard...</p>;
//   if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
//   if (!ownerDetails) return <p className="text-center mt-5">No owner data found.</p>;

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <h1 className="h4 mb-3">Owner Dashboard</h1>

//         <div className="alert alert-info">
//           <strong>Welcome, {ownerDetails.ownerName}</strong>
//           <br /> Email: {ownerDetails.email}
//           <br /> Phone: {ownerDetails.contactNo || "N/A"}
//         </div>

//         {/* Stats Cards */}
//         <div className="row g-3 mb-4">
//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Revenue</div>
//               <div className="fs-5">₹{stats.revenue}</div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Bookings</div>
//               <div className="fs-5">{stats.bookings}</div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Total Turfs</div>
//               <div className="fs-5">{turfs.length}</div>
//             </div>
//           </div>
//         </div>

//         {/* Turfs List */}
//         <h2 className="h5 mb-3">Your Turfs</h2>
//         {turfs.length === 0 ? (
//           <p>No turfs added yet.</p>
//         ) : (
//           <ul className="list-group">
//             {turfs.map((turf) => (
//               <li key={turf.turfId} className="list-group-item">
//                 <strong>{turf.turfName}</strong> — {turf.locationUrl} — ₹{turf.pricePerHour}/hr
//                 <br />
//                 <small>
//                   Slots: {turf.slots?.length || 0} | Images: {turf.images?.length || 0}
//                 </small>

//                 {/* Slots */}
//                 {turf.slots?.length > 0 && (
//                   <ul className="mt-2">
//                     {turf.slots.map((slot) => (
//                       <li key={slot.slotId}>
//                         {slot.startTime} - {slot.endTime}
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {/* Images */}
//                 <div className="mt-2 d-flex gap-2 flex-wrap">
//                   {turf.images?.map((img) => (
//                     <img
//                       key={img.id}
//                       src={img.imageUrl}
//                       alt="turf"
//                       width="120"
//                       height="80"
//                       className="rounded border"
//                     />
//                   ))}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </main>
//     </>
//   );
// };

// export default OwnerDashboard;

//---------------------------------------------------------------------
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";

// const OwnerDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [ownerDetails, setOwnerDetails] = useState(null);
//   const [turfs, setTurfs] = useState([]);
//   const [stats, setStats] = useState({ revenue: 0, bookings: 0 });
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user || user.role !== "OWNER") {
//       navigate("/login");
//       return;
//     }

//     const fetchOwnerDetails = async () => {
//       try {
//         const res = await fetch("http://localhost:8088/api/owners/me", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });

//         if (!res.ok) throw new Error("Failed to load owner data");

//         const data = await res.json();
//         setOwnerDetails(data.owner);
//         setTurfs(data.turfs || []);
//         setStats(data.stats || { revenue: 0, bookings: 0 });
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOwnerDetails();
//   }, [user, navigate]);

//   if (loading) return <p className="text-center mt-5">Loading Dashboard...</p>;
//   if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
//   if (!ownerDetails) return <p className="text-center mt-5">No owner data found.</p>;

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <h1 className="h4 mb-3">Owner Dashboard</h1>

//         <div className="alert alert-info">
//           <strong>Welcome, {ownerDetails.ownerName}</strong>
//           <br /> Email: {ownerDetails.email}
//           <br /> Phone: {ownerDetails.contactNo || "N/A"}
//         </div>

//         <div className="row g-3 mb-4">
//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Revenue</div>
//               <div className="fs-5">₹{stats.revenue}</div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Bookings</div>
//               <div className="fs-5">{stats.bookings}</div>
//             </div>
//           </div>

//           <div className="col-6 col-lg-4">
//             <div className="card p-3 shadow-sm text-center">
//               <div className="text-muted small">Total Turfs</div>
//               <div className="fs-5">{turfs.length}</div>
//             </div>
//           </div>
//         </div>

//         {/* Turf List */}
//         <h2 className="h5 mb-3">Your Turfs</h2>
//         {turfs.length === 0 ? (
//           <p>No turfs added yet.</p>
//         ) : (
//           turfs.map((turf) => (
//             <div key={turf.turfId} className="card mb-4 p-3 shadow-sm">
//               <h4>{turf.turfName}</h4>
//               <p><strong>Location: </strong>{turf.locationUrl}</p>
//               <p><strong>Price / Hour:</strong> ₹{turf.pricePerHour}</p>

//               <div className="d-flex flex-wrap gap-2">
//                 {turf.images?.length > 0 ? (
//                   turf.images.map((url, index) => (
//                     <img
//                       key={index}
//                       src={url}
//                       alt="turf"
//                       className="rounded border"
//                       style={{ width: "150px", height: "100px", objectFit: "cover" }}
//                     />
//                   ))
//                 ) : (
//                   <p className="text-muted">No Images Found</p>
//                 )}
//               </div>

//               <button
//                 className="btn btn-outline-primary mt-3"
//                 onClick={() => navigate(`/owner/slots/${turf.turfId}`)}
//               >
//                 View & Manage Slots
//               </button>
//             </div>
//           ))
//         )}
//       </main>
//     </>
//   );
// };

// export default OwnerDashboard;


//----------------------------------------------------------------------------
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, bookings: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "OWNER") {
      navigate("/login");
      return;
    }

    const fetchOwnerDetails = async () => {
      try {
        const res = await fetch("http://localhost:8088/api/owners/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error("Failed to load owner data");

        const data = await res.json();
        setOwnerDetails(data.owner);
        setTurfs(data.turfs || []);
        setStats(data.stats || { revenue: 0, bookings: 0 });
      } catch (err) {
        console.error(err);
        setError("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [user, navigate]);

  if (loading) return <p className="text-center mt-5">Loading Dashboard...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!ownerDetails) return <p className="text-center mt-5">No owner data found.</p>;

  return (
    <>
      <Navbar />

      <main className="container py-4">
        <h1 className="h4 mb-3">Owner Dashboard</h1>

        {/* Owner Info */}
        <div className="alert alert-info">
          <strong>Welcome, {ownerDetails.ownerName}</strong>
          <br /> Email: {ownerDetails.email}
          <br /> Phone: {ownerDetails.contactNo || "N/A"}
        </div>

        {/* Stats */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-4">
            <div className="card p-3 shadow-sm text-center">
              <div className="text-muted small">Revenue</div>
              <div className="fs-5">₹{stats.revenue}</div>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="card p-3 shadow-sm text-center">
              <div className="text-muted small">Bookings</div>
              <div className="fs-5">{stats.bookings}</div>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <div className="card p-3 shadow-sm text-center">
              <div className="text-muted small">Total Turfs</div>
              <div className="fs-5">{turfs.length}</div>
            </div>
          </div>
        </div>

        {/* Turf List */}
        <h2 className="h5 mb-3">Your Turfs</h2>

        {turfs.length === 0 ? (
          <p>No turfs added yet.</p>
        ) : (
          turfs.map((turf) => (
            <div key={turf.turfId} className="card mb-4 p-3 shadow-sm">
              <h4>{turf.turfName}</h4>
              <p><strong>Location: </strong>{turf.locationUrl}</p>
              <p><strong>Price / Hour:</strong> ₹{turf.pricePerHour}</p>

              {/* Images */}
              <div className="d-flex flex-wrap gap-2">
                {turf.images?.length > 0 ? (
                  turf.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt="turf"
                      className="rounded border"
                      style={{ width: "150px", height: "100px", objectFit: "cover" }}
                    />
                  ))
                ) : (
                  <p className="text-muted">No Images Found</p>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/owner/slots/${turf.turfId}`)}
                >
                  Manage Slots
                </button>

                <button
                  className="btn btn-outline-success"
                  onClick={() =>
                    navigate(`/owner/edit-turf?tid=${turf.turfId}`)
                  }
                >
                  ✏ Edit Turf
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
};

export default OwnerDashboard;
