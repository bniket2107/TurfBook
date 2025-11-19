// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar"; // Adjust path as needed

// const OwnerDetails = () => {
//   const [owner, setOwner] = useState(null);
//   const [turfs, setTurfs] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch and load owner profile data, turf list, and bookings here
//     // Example: fetchOwner(), fetchTurfs(), fetchBookings()
//     // Replace with your actual fetching logic
//     async function fetchData() {
//       // Dummy example
//       const ownerData = { name: "John Doe", email: "owner@example.com" };
//       const turfData = [
//         { id: 1, name: "Turf 1", location: "Mumbai", image: "/assets/img/turff.jpg" },
//         { id: 2, name: "Turf 2", location: "Pune", image: '/assets/img/myTurf.jpg' }
//       ];
//       const bookingData = [
//         {
//           id: 101,
//           customer: "Alice",
//           turf: "Turf 1",
//           date: "2025-11-13",
//           amount: 1200,
//           status: "Confirmed"
//         }
//       ];
//       setOwner(ownerData);
//       setTurfs(turfData);
//       setBookings(bookingData);
//     }
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <h1 className="h4 mb-3">Owner Profile</h1>

//         <div className="card mb-3">
//           <div className="card-body">
//             {owner ? (
//               <>
//               <p></p>
//                 <p><strong>Name:</strong> {owner.name}</p>
//                 <p><strong>Email:</strong> {owner.email}</p>
//               </>
//             ) : (
//               "Loading…"
//             )}
//           </div>
//         </div>

//         <h2 className="h5">Turfs</h2>
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
//           {turfs.length > 0 ? (
//             turfs.map((turf) => (
//               <div key={turf.id} className="col">
//                 <div className="card p-3 shadow-sm">{turf.name} - {turf.location}</div>
//               </div>
//             ))
//           ) : (
//             <p>No turfs available.</p>
//           )}
//         </div>

//         <h2 className="h5 mt-4">Bookings</h2>
//         <div className="table-responsive">
//           <table className="table table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Booking</th>
//                 <th>Customer</th>
//                 <th>Turf</th>
//                 <th>Date</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.length > 0 ? (
//                 bookings.map((booking) => (
//                   <tr key={booking.id}>
//                     <td>{booking.id}</td>
//                     <td>{booking.customer}</td>
//                     <td>{booking.turf}</td>
//                     <td>{booking.date}</td>
//                     <td>₹{booking.amount}</td>
//                     <td>{booking.status}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center text-muted">
//                     No data
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const OwnerDetails = () => {
//   const { id } = useParams();
//   const [owner, setOwner] = useState(null);

//   useEffect(() => {
//     fetchOwner();
//   }, [id]);

//   const fetchOwner = async () => {
//     try {
//       const response = await fetch(`http://localhost:8088/api/admin/owner/${id}`);
//       const data = await response.json();
//       setOwner(data);
//     } catch (error) {
//       console.error("Error loading owner details:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ paddingTop: "80px" }}>
//         <h1 className="h4 mb-3">Owner Details</h1>

//         {!owner ? (
//           <p>Loading…</p>
//         ) : (
//           <div className="card p-3 shadow-sm">
//             {owner.imageBase64 && (
//               <img
//                 src={owner.imageBase64}
//                 alt={owner.ownerName}
//                 style={{ width: "200px", borderRadius: "8px", marginBottom: "15px" }}
//               />
//             )}
//             <p><strong>Name:</strong> {owner.ownerName}</p>
//             <p><strong>Email:</strong> {owner.email}</p>
//             <p><strong>Phone:</strong> {owner.contactNo}</p>
//             <p><strong>Turf Name:</strong> {owner.turfName}</p>
//             <p><strong>Turf Size:</strong> {owner.turfSize}</p>
//             <p><strong>Location URL:</strong> <a href={owner.locationUrl} target="_blank" rel="noreferrer">{owner.locationUrl}</a></p>
//             <p><strong>State:</strong> {owner.state}</p>
//             <p><strong>City:</strong> {owner.city}</p>
//             <p><strong>Area:</strong> {owner.area}</p>
//             <p><strong>Address:</strong> {owner.address}</p>
//             <p><strong>Price Per Hour:</strong> {owner.pricePerHour}</p>
//             <p><strong>Discount:</strong> {owner.discount}%</p>
//             <p><strong>Tournament Slot Price:</strong> {owner.tournamentSlotPrice}</p>
//             <p><strong>Approved:</strong> {owner.isApproved ? "Yes" : "No"}</p>
//             <p><strong>Created Date:</strong> {new Date(owner.createdDate).toLocaleString()}</p>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

// export default OwnerDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const OwnerDetails = () => {
//   const { id } = useParams();
//   const [owner, setOwner] = useState(null);

//   useEffect(() => {
//     if (id) fetchOwner();
//   }, [id]);

//   const fetchOwner = async () => {
//     try {
//       const response = await fetch(`http://localhost:8088/api/admin/owner/${id}`);
//       const data = await response.json();
//       setOwner(data);
//     } catch (error) {
//       console.error("Error loading owner details:", error);
//     }
//   };

//   if (!owner) return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ paddingTop: "80px" }}>
//         <p>Loading owner details…</p>
//       </main>
//     </>
//   );

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ paddingTop: "80px" }}>
//         <h1 className="h4 mb-3">Owner Details</h1>

//         <div className="card p-3 shadow-sm">
//           {owner.imageData && (
//             <img
//               src={`data:${owner.imageContentType};base64,${btoa(
//                 String.fromCharCode(...new Uint8Array(owner.imageData))
//               )}`}
//               alt={owner.imageFileName}
//               style={{ maxWidth: "200px", marginBottom: "20px" }}
//             />
//           )}
//           <p><strong>Name:</strong> {owner.ownerName}</p>
//           <p><strong>Email:</strong> {owner.email}</p>
//           <p><strong>Phone:</strong> {owner.contactNo}</p>
//           <p><strong>Turf Name:</strong> {owner.turfName}</p>
//           <p><strong>Turf Size:</strong> {owner.turfSize}</p>
//           <p><strong>Location URL:</strong> <a href={owner.locationUrl} target="_blank">{owner.locationUrl}</a></p>
//           <p><strong>Address:</strong> {owner.address}, {owner.area}, {owner.city}, {owner.state}</p>
//           <p><strong>Price Per Hour:</strong> ${owner.pricePerHour}</p>
//           <p><strong>Discount:</strong> {owner.discount}%</p>
//           <p><strong>Tournament Slot Price:</strong> ${owner.tournamentSlotPrice}</p>
//           <p><strong>Approved:</strong> {owner.isApproved ? "Yes" : "No"}</p>
//           <p><strong>Created At:</strong> {new Date(owner.createdDate).toLocaleString()}</p>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerDetails;


// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";

// const AdminOwners = () => {
//   const [owners, setOwners] = useState([]);

//   useEffect(() => {
//     fetchOwners();
//   }, []);

//   const fetchOwners = async () => {
//     try {
//       const response = await fetch("http://localhost:8088/api/admin/owners");
//       const data = await response.json();
//       setOwners(data);
//     } catch (error) {
//       console.error("Error loading owners:", error);
//     }
//   };

//   const approveOwner = async (ownerId) => {
//     try {
//       const response = await fetch(`http://localhost:8088/api/admin/owner/approve/${ownerId}`, {
//         method: "PUT",
//       });
//       if (response.ok) {
//         // Update the owner status locally
//         setOwners((prev) =>
//           prev.map((o) => (o.id === ownerId ? { ...o, isApproved: true } : o))
//         );
//       }
//     } catch (error) {
//       console.error("Error approving owner:", error);
//     }
//   };

//   const statusBadge = (isApproved) =>
//     isApproved ? (
//       <span className="badge bg-success">APPROVED</span>
//     ) : (
//       <span className="badge bg-warning text-dark">PENDING</span>
//     );

//   return (
//     <div>
//       <Navbar />
//       <main className="container" style={{ minHeight: "32vh", paddingTop: "80px" }}>
//         <h1 className="h4 mb-3">Owners</h1>

//         <div className="table-responsive">
//           <table className="table table-hover align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {owners.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center text-muted">
//                     No owners found
//                   </td>
//                 </tr>
//               ) : (
//                 owners.map((owner) => (
//                   <tr key={owner.id}>
//                     <td>{owner.ownerName}</td>
//                     <td>{owner.email}</td>
//                     <td>{owner.contactNo}</td>
//                     <td>{statusBadge(owner.isApproved)}</td>
//                     <td>
//                       {!owner.isApproved && (
//                         <button
//                           className="btn btn-success btn-sm me-2"
//                           onClick={() => approveOwner(owner.id)}
//                         >
//                           Approve
//                         </button>
//                       )}
//                       <Link
//                         to={`/owner-details/${owner.id}`}
//                         className="btn btn-primary btn-sm me-2"
//                       >
//                         View
//                       </Link>
//                       <button className="btn btn-outline-danger btn-sm">Suspend</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminOwners;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const OwnerDetails = () => {
//   const { id } = useParams();
//   const [owner, setOwner] = useState(null);

//   useEffect(() => {
//     if (id) fetchOwner();
//   }, [id]);

//   const fetchOwner = async () => {
//     try {
//       const response = await fetch(`http://localhost:8088/api/admin/owner/${id}`);
//       const data = await response.json();
//       setOwner(data);
//     } catch (error) {
//       console.error("Error loading owner details:", error);
//     }
//   };

//   if (!owner) {
//     return (
//       <>
//         <Navbar />
//         <main className="container py-4" style={{ paddingTop: "80px" }}>
//           <p>Loading owner details…</p>
//         </main>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ paddingTop: "80px" }}>
//         <h1 className="h4 mb-3">Owner Details</h1>

//         <div className="card p-3 shadow-sm">
//           {owner.imageBase64 && (
//             <img
//               src={owner.imageBase64}
//               alt={owner.ownerName}
//               style={{ maxWidth: "200px", marginBottom: "20px", borderRadius: "8px" }}
//             />
//           )}
//           <p><strong>Name:</strong> {owner.ownerName}</p>
//           <p><strong>Email:</strong> {owner.email}</p>
//           <p><strong>Phone:</strong> {owner.contactNo}</p>
//           <p><strong>Turf Name:</strong> {owner.turfName}</p>
//           <p><strong>Turf Size:</strong> {owner.turfSize}</p>
//           <p>
//             <strong>Location URL:</strong>{" "}
//             <a href={owner.locationUrl} target="_blank" rel="noreferrer">
//               {owner.locationUrl}
//             </a>
//           </p>
//           <p><strong>Address:</strong> {owner.address}, {owner.area}, {owner.city}, {owner.state}</p>
//           <p><strong>Price Per Hour:</strong> ${owner.pricePerHour}</p>
//           <p><strong>Discount:</strong> {owner.discount}%</p>
//           <p><strong>Tournament Slot Price:</strong> ${owner.tournamentSlotPrice}</p>
//           <p><strong>Approved:</strong> {owner.isApproved ? "Yes" : "No"}</p>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";

// const OwnerDetails = () => {
//   const { id } = useParams();
//   const [owner, setOwner] = useState(null);

//   useEffect(() => {
//     if (id) fetchOwner();
//   }, [id]);

//   const fetchOwner = async () => {
//     try {
//       const response = await fetch(`http://localhost:8088/api/admin/owner/${id}`);
//       const data = await response.json();
//       setOwner(data);
//     } catch (error) {
//       console.error("Error loading owner details:", error);
//     }
//   };

//   if (!owner) {
//     return (
//       <>
//         <Navbar />
//         <main className="container py-4" style={{ paddingTop: "80px" }}>
//           <p>Loading owner details…</p>
//         </main>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ paddingTop: "80px" }}>
//         <h1 className="h4 mb-3">Owner Details</h1>

//         <div className="card p-3 shadow-sm">
//           {owner.imageBase64 && (
//             <img
//               src={owner.imageBase64}
//               alt={owner.ownerName}
//               style={{ maxWidth: "200px", marginBottom: "20px", borderRadius: "8px" }}
//             />
//           )}
//           <p><strong>Name:</strong> {owner.ownerName}</p>
//           <p><strong>Email:</strong> {owner.email}</p>
//           <p><strong>Phone:</strong> {owner.contactNo}</p>
//           <p><strong>Turf Name:</strong> {owner.turfName}</p>
//           <p><strong>Turf Size:</strong> {owner.turfSize}</p>
//           <p>
//             <strong>Location URL:</strong>{" "}
//             <a href={owner.locationUrl} target="_blank" rel="noreferrer">
//               {owner.locationUrl}
//             </a>
//           </p>
//           <p><strong>Address:</strong> {owner.address}, {owner.area}, {owner.city}, {owner.state}</p>
//           <p><strong>Price Per Hour:</strong> ${owner.pricePerHour}</p>
//           <p><strong>Discount:</strong> {owner.discount}%</p>
//           <p><strong>Tournament Slot Price:</strong> ${owner.tournamentSlotPrice}</p>

//           {/* ⭐ NEW FIELD ADDED HERE */}
//           <p><strong>Advance Payment Percentage:</strong> {owner.advancePaymentPercentage}%</p>

//           <p><strong>Approved:</strong> {owner.isApproved ? "Yes" : "No"}</p>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const OwnerDetails = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  // ⭐ New State for image modal
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (id) fetchOwner();
  }, [id]);

  const fetchOwner = async () => {
    try {
      const response = await fetch(`http://localhost:8088/api/admin/owner/${id}`);
      const data = await response.json();
      setOwner(data);
    } catch (error) {
      console.error("Error loading owner details:", error);
    }
  };

  if (!owner) {
    return (
      <>
        <Navbar />
        <main className="container py-4" style={{ paddingTop: "80px" }}>
          <p>Loading owner details…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ paddingTop: "80px" }}>
        <h1 className="h4 mb-3">Owner Details</h1>

        <div className="card p-3 shadow-sm">
          {owner.imageBase64 && (
            <img
              src={owner.imageBase64}
              alt={owner.ownerName}
              style={{ maxWidth: "200px", marginBottom: "20px", borderRadius: "8px", cursor: "pointer" }}
              onClick={() => setShowImageModal(true)} // ⭐ Open modal on click
            />
          )}

          <p><strong>Name:</strong> {owner.ownerName}</p>
          <p><strong>Email:</strong> {owner.email}</p>
          <p><strong>Phone:</strong> {owner.contactNo}</p>
          <p><strong>Turf Name:</strong> {owner.turfName}</p>
          <p><strong>Turf Size:</strong> {owner.turfSize}</p>
          <p>
            <strong>Location URL:</strong>{" "}
            <a href={owner.locationUrl} target="_blank" rel="noreferrer">
              {owner.locationUrl}
            </a>
          </p>
          <p><strong>Address:</strong> {owner.address}, {owner.area}, {owner.city}, {owner.state}</p>
          <p><strong>Price Per Hour:</strong> ${owner.pricePerHour}</p>
          <p><strong>Discount:</strong> {owner.discount}%</p>
          <p><strong>Tournament Slot Price:</strong> ${owner.tournamentSlotPrice}</p>
          <p><strong>Advance Payment Percentage:</strong> {owner.advancePaymentPercentage}%</p>
          <p><strong>Approved:</strong> {owner.isApproved ? "Yes" : "No"}</p>
        </div>
      </main>

      {/* ⭐ IMAGE MODAL (FULL SCREEN VIEW) */}
      {showImageModal && (
        
        <div
          className="image-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowImageModal(false)} // Close on background click
        >
          <img
            src={owner.imageBase64}
            alt="Full Turf"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          />
        </div>
      )}
    </>
  );
};

export default OwnerDetails;
