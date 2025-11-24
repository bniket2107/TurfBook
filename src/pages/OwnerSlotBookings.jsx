// import React, { useState, useEffect, useContext } from "react";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// const allSlots = [
//   "6:00 AM–7:00 AM", "7:00 AM–8:00 AM", "8:00 AM–9:00 AM", "9:00 AM–10:00 AM",
//   "10:00 AM–11:00 AM", "11:00 AM–12:00 PM", "12:00 PM–1:00 PM", "1:00 PM–2:00 PM",
//   "2:00 PM–3:00 PM", "3:00 PM–4:00 PM", "4:00 PM–5:00 PM", "5:00 PM–6:00 PM",
//   "6:00 PM–7:00 PM", "7:00 PM–8:00 PM", "8:00 PM–9:00 PM", "9:00 PM–10:00 PM"
// ];

// const OwnerSlotBooking = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || user.role !== "owner") navigate("/login");
//   }, [user, navigate]);

//   const [selectedDate, setSelectedDate] = useState(() =>
//     new Date().toISOString().split("T")[0]
//   );

//   const [duration, setDuration] = useState("60");
//   const [bookedSlots, setBookedSlots] = useState([]);

//   // Freeze states
//   const [frozenSlots, setFrozenSlots] = useState({});
//   const [frozenDays, setFrozenDays] = useState({});

//   // Selected slots for freeze/unfreeze batch operation
//   const [selectedSlotsForFreeze, setSelectedSlotsForFreeze] = useState([]);

//   // Load booked slots (demo)
//   const loadSlotsForDate = (date) => {
//     const demoBooked =
//       date === new Date().toISOString().split("T")[0]
//         ? ["8:00 AM–9:00 AM", "5:00 PM–6:00 PM", "9:00 PM–10:00 PM"]
//         : [];
//     setBookedSlots(demoBooked);
//   };

//   useEffect(() => {
//     loadSlotsForDate(selectedDate);
//     setSelectedSlotsForFreeze([]);
//   }, [selectedDate]);

//   const toggleSelectSlot = (slot) => {
//     setSelectedSlotsForFreeze((prev) =>
//       prev.includes(slot)
//         ? prev.filter((s) => s !== slot)
//         : [...prev, slot]
//     );
//   };

//   const toggleDayFreeze = () => {
//     setFrozenDays((prev) => ({
//       ...prev,
//       [selectedDate]: !prev[selectedDate],
//     }));

//     setFrozenSlots((prev) => {
//       const copy = { ...prev };
//       if (copy[selectedDate]) {
//         delete copy[selectedDate];
//       }
//       return copy;
//     });

//     setSelectedSlotsForFreeze([]);
//   };

//   const frozenForDate = frozenSlots[selectedDate] || [];
//   const isDayFrozen = !!frozenDays[selectedDate];

//   const freezeSelectedSlots = () => {
//     setFrozenSlots((prev) => {
//       const frozenForDate = new Set(prev[selectedDate] || []);
//       selectedSlotsForFreeze.forEach((s) => frozenForDate.add(s));
//       return { ...prev, [selectedDate]: Array.from(frozenForDate) };
//     });
//     setSelectedSlotsForFreeze([]);
//   };

//   const unfreezeSelectedSlots = () => {
//     setFrozenSlots((prev) => {
//       const frozenForDate = new Set(prev[selectedDate] || []);
//       selectedSlotsForFreeze.forEach((s) => frozenForDate.delete(s));
//       return { ...prev, [selectedDate]: Array.from(frozenForDate) };
//     });
//     setSelectedSlotsForFreeze([]);
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ marginTop: "-2%" }}>
//         <h1 className="h4 mb-3">Slot Availability Calendar</h1>
//         <div className="row g-4">
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row g-3 mb-3">
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="slotDate" className="form-label">
//                       Select Date
//                     </label>
//                     <input
//                       type="date"
//                       id="slotDate"
//                       className="form-control"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label htmlFor="duration" className="form-label">
//                       Duration
//                     </label>
//                     <select
//                       id="duration"
//                       className="form-select"
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                     >
//                       <option value="60">1 Hour</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mb-2">
//                   <button
//                     className={`btn btn-sm ${
//                       isDayFrozen ? "btn-danger" : "btn-outline-danger"
//                     }`}
//                     type="button"
//                     onClick={toggleDayFreeze}
//                     title={isDayFrozen ? "Unfreeze Entire Day" : "Freeze Entire Day"}
//                   >
//                     {isDayFrozen ? "Unfreeze Entire Day" : "Freeze Entire Day"}
//                   </button>
//                 </div>

//                 <hr />
//                 <label className="form-label d-flex justify-content-between align-items-center mb-2">
//                   <span>Select slots to Freeze or Unfreeze</span>
//                   <span className="small text-muted">
//                     Red = Booked, Blue = Frozen, Green = Available
//                   </span>
//                 </label>
//                 <div className="d-flex flex-wrap gap-2 mt-2" id="slots">
//                   {allSlots.map((slot) => {
//                     const isBooked = bookedSlots.includes(slot);
//                     const isSlotFrozen = isDayFrozen || frozenForDate.includes(slot);
//                     return (
//                       <div
//                         key={slot}
//                         className="d-flex align-items-center"
//                         style={{
//                           border: isBooked
//                             ? "1px solid #db0318"
//                             : isSlotFrozen
//                             ? "1px solid #0d6efd"
//                             : "1px solid #198754",
//                           background: isBooked
//                             ? "#d81633"
//                             : isSlotFrozen
//                             ? "#0d6efd"
//                             : "#15c160",
//                           color: "#fff",
//                           borderRadius: "6px",
//                           cursor: isBooked || isDayFrozen ? "not-allowed" : "pointer",
//                           padding: "5px 10px",
//                           marginRight: "8px",
//                           marginBottom: "8px",
//                           opacity: isBooked ? 0.7 : 1,
//                         }}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isSlotFrozen
//                             ? "Frozen (not bookable)"
//                             : "Available for booking"
//                         }
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedSlotsForFreeze.includes(slot)}
//                           disabled={isBooked || isDayFrozen}
//                           onChange={() => toggleSelectSlot(slot)}
//                           className="me-2"
//                         />
//                         <span>{slot}</span>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="mt-3 d-flex gap-2">
//                   <button
//                     className="btn btn-primary"
//                     onClick={freezeSelectedSlots}
//                     disabled={selectedSlotsForFreeze.length === 0}
//                     title="Freeze selected slots"
//                   >
//                     Freeze Selected Slots
//                   </button>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={unfreezeSelectedSlots}
//                     disabled={selectedSlotsForFreeze.length === 0}
//                     title="Unfreeze selected slots"
//                   >
//                     Unfreeze Selected Slots
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong>{" "}
//                     <span id="sumTurf">Green Field Arena</span>
//                   </li>
//                   <li>
//                     <strong>Date:</strong> <span id="sumDate">{selectedDate}</span>
//                   </li>
//                   <li>
//                     <strong>Booked Slots:</strong>{" "}
//                     <span id="sumBooked">{bookedSlots.length}</span>
//                   </li>
//                   <li>
//                     <strong>Available Slots:</strong>{" "}
//                     <span id="sumAvailable">{allSlots.length - bookedSlots.length}</span>
//                   </li>
//                   <li>
//                     <strong>Frozen Slots:</strong>{" "}
//                     <span id="sumFrozen">{frozenForDate.join(", ") || "None"}</span>
//                   </li>
//                 </ul>
//                 <div className="text-muted small">
//                   Note: Red slots are already booked; Blue slots are frozen by
//                   owner; Green slots are available.
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerSlotBooking;
 
// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";

// const OwnerSlotBooking = () => {
//   const { user } = useContext(AuthContext);
//   const { turfId } = useParams();

//   const [selectedDate, setSelectedDate] = useState(() =>
//     new Date().toISOString().split("T")[0]
//   );
//   const [allSlots, setAllSlots] = useState([]);

//   // 🔹 Fetch Slots
//   const fetchSlots = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:8088/api/slots/${turfId}/${selectedDate}`,
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );

//       const data = await res.json();
//       setAllSlots(data);
//     } catch (err) {
//       console.error("Error fetching slots:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSlots();
//   }, [selectedDate]);

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <h2 className="h4">Manage Slots – Turf ID: {turfId}</h2>

//         {/* Date Picker */}
//         <div className="mb-3">
//           <label className="form-label">Select Date:</label>
//           <input
//             type="date"
//             className="form-control w-25"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>

//         {/* Slot Boxes */}
//         <div className="d-flex flex-wrap gap-2">
//           {allSlots.length === 0 ? (
//             <p>No slots found.</p>
//           ) : (
//             allSlots.map((slot) => (
//               <div
//                 key={slot.slotId}
//                 className="p-2 rounded text-white"
//                 style={{
//                   background:
//                     slot.status === "BOOKED"
//                       ? "#d81633" // Red
//                       : "#15c160", // Green (Available)
//                   border: "1px solid #333",
//                 }}
//               >
//                 {slot.startTime} - {slot.endTime}  
//                 <span className="ms-2 badge bg-dark">{slot.status}</span>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerSlotBooking;
// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";  // 🔥 FIXED PATH

// const OwnerSlotBooking = () => {
//   const { turfId } = useParams();
//   const { user } = useContext(AuthContext);

//   const [selectedDate, setSelectedDate] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Auto fetch slots when date changes
//   useEffect(() => {
//     if (selectedDate) {
//       fetchSlots();
//     }
//   }, [selectedDate]);

//   const fetchSlots = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `http://localhost:8088/api/slots/owner/${turfId}/${selectedDate}`,
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       const data = await res.json();
//       setSlots(data);
//     } catch (error) {
//       console.error("Failed to fetch slots", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleStatus = async (slotId, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";

//       await fetch(`http://localhost:8088/api/slots/${slotId}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       fetchSlots(); // Refresh slots
//     } catch (error) {
//       console.error("Status update failed", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="fw-bold">Manage Slots for Turf ID: {turfId}</h3>

//       <div className="mb-3">
//         <input
//           type="date"
//           className="form-control w-25"
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p>Loading slots...</p>
//       ) : slots.length > 0 ? (
//         <div className="row">
//           {slots.map((slot) => (
//             <div key={slot.slotId} className="col-md-3 mb-3">
//               <div className="card p-3 shadow text-center">
//                 <h6>{slot.startTime} - {slot.endTime}</h6>
//                 <p>Status: <strong>{slot.status}</strong></p>

//                 <button
//                   className={`btn ${
//                     slot.status === "AVAILABLE" ? "btn-success" : "btn-danger"
//                   }`}
//                   onClick={() => toggleStatus(slot.slotId, slot.status)}
//                 >
//                   {slot.status === "AVAILABLE" ? "Freeze Slot" : "Unfreeze Slot"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No slots found</p>
//       )}
//     </div>
//   );
// };

// export default OwnerSlotBooking;

// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../contexts/AuthContext";

// const OwnerSlotBooking = () => {
//   const { turfId } = useParams(); // Get the turfId from the URL
//   const { user } = useContext(AuthContext); // Access the logged-in user from context

//   // Set current date as default and ensure it's always in 'YYYY-MM-DD' format
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // Automatically select today's date in the correct format
//   });

//   const [slots, setSlots] = useState([]); // Store the list of slots
//   const [selectedSlots, setSelectedSlots] = useState([]); // Store the selected slots

//   // Fetch slots from the backend whenever the selectedDate changes
//   useEffect(() => {
//     fetchSlots(); // Fetch slots every time the selectedDate changes
//   }, [selectedDate]);

//   const fetchSlots = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:8088/api/slots/owner/${turfId}/${selectedDate}`,
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       const data = await res.json();

//       // Map the slots and add status for better UI management
//       const mappedSlots = data.map((slot) => {
//         let status;
//         if (slot.isBooked === true) status = "BOOKED";
//         else if (slot.isBooked === false) status = "AVAILABLE";
//         else status = "FROZEN"; // Null means frozen
//         return { ...slot, status };
//       });

//       setSlots(mappedSlots); // Update the slots list with the fetched data
//       setSelectedSlots([]); // Reset the selected slots
//     } catch (error) {
//       console.error("Error fetching slots", error);
//     }
//   };

//   // Toggle the selection of slots
//   const toggleSelect = (slotId) => {
//     setSelectedSlots((prev) =>
//       prev.includes(slotId) ? prev.filter((id) => id !== slotId) : [...prev, slotId]
//     );
//   };

//   // Update the status of the selected slots (freeze/unfreeze)
//   const updateSlotStatus = async (freeze) => {
//     try {
//       await Promise.all(
//         selectedSlots.map((slotId) =>
//           fetch(`http://localhost:8088/api/slots/${slotId}/status`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${user.token}`,
//             },
//             body: JSON.stringify({ status: freeze ? "UNAVAILABLE" : "AVAILABLE" }),
//           })
//         )
//       );
//       fetchSlots(); // Refresh slots after the update
//     } catch (error) {
//       console.error("Failed to update slots", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="container py-4" style={{ marginTop: "-2%" }}>
//         <h1 className="h4 mb-3">Manage Slots for Turf ID: {turfId}</h1>

//         {/* Date Selector */}
//         <div className="mb-3">
//           <input
//             type="date"
//             className="form-control w-25"
//             value={selectedDate} // Set the selectedDate state as the value of the input field
//             onChange={(e) => setSelectedDate(e.target.value)} // Update selectedDate when the user picks a new date
//           />
//         </div>

//         {/* Slot Cards */}
//         <div className="d-flex flex-wrap gap-2 mt-2">
//           {slots.length > 0 ? (
//             slots.map((slot) => {
//               const isBooked = slot.status === "BOOKED";
//               const isFrozen = slot.status === "FROZEN";
//               const isAvailable = slot.status === "AVAILABLE";

//               return (
//                 <div
//                   key={slot.slotId}
//                   className="d-flex align-items-center"
//                   style={{
//                     border: isBooked
//                       ? "1px solid #db0318"
//                       : isFrozen
//                       ? "1px solid #6c757d"
//                       : "1px solid #198754",
//                     background: isBooked
//                       ? "#d81633"
//                       : isFrozen
//                       ? "#6c757d"
//                       : "#15c160",
//                     color: "#fff",
//                     borderRadius: "6px",
//                     cursor: isBooked ? "not-allowed" : "pointer",
//                     padding: "5px 10px",
//                     marginBottom: "8px",
//                   }}
//                   onClick={() => {
//                     if (!isBooked) toggleSelect(slot.slotId);
//                   }}
//                 >
//                   <input
//                     type="checkbox"
//                     disabled={isBooked}
//                     checked={selectedSlots.includes(slot.slotId)}
//                     onChange={() => toggleSelect(slot.slotId)}
//                     className="me-2"
//                     onClick={(e) => e.stopPropagation()} // Prevent div click toggle duplication
//                   />
//                   <span>
//                     {slot.startTime} - {slot.endTime}
//                   </span>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No slots found</p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="mt-3 d-flex gap-2">
//           <button
//             className="btn btn-primary"
//             onClick={() => updateSlotStatus(true)}
//             disabled={selectedSlots.length === 0}
//           >
//             Freeze Selected
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => updateSlotStatus(false)}
//             disabled={selectedSlots.length === 0}
//           >
//             Unfreeze Selected
//           </button>
//         </div>
//       </main>
//     </>
//   );
// };

// export default OwnerSlotBooking;
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

const OwnerSlotBooking = () => {
  const { turfId } = useParams();
  const { user } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [openTime, setOpenTime] = useState("06:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [message, setMessage] = useState("");

  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
    fetchCurrentTiming();
  }, [selectedDate]);

  // 🔹 Load turf timing from backend
  const fetchCurrentTiming = async () => {
    try {
      const res = await fetch(
        `http://localhost:8088/api/turf/${turfId}/timing`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setOpenTime(data.openTime);
        setCloseTime(data.closeTime);
      }
    } catch (err) {
      console.log("Failed to load turf timing");
    }
  };

  // 🔹 Update timing
  const updateTiming = async () => {
    if (openTime >= closeTime) {
      alert("Open time must be earlier than close time!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8088/api/slots/owner/update-slot-timing`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            turfId: parseInt(turfId),
            startTime: openTime,
            endTime: closeTime,
          }),
        }
      );

      if (res.ok) {
        setMessage("Timing updated & future slots regenerated.");
        fetchSlots();
      } else {
        setMessage("Failed to update timing.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong.");
    }
  };

  // 🔹 Fetch slots
  const fetchSlots = async () => {
    try {
      const res = await fetch(
        `http://localhost:8088/api/slots/owner/${turfId}/${selectedDate}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const data = await res.json();

      const mappedSlots = data.map((slot) => {
        let status;
        if (slot.isBooked === true) status = "BOOKED";
        else if (slot.isBooked === false) status = "AVAILABLE";
        else status = "FROZEN";
        return { ...slot, status };
      });

      setSlots(mappedSlots);
      setSelectedSlots([]);
    } catch (error) {
      console.error("Error fetching slots", error);
    }
  };

  const toggleSelect = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  const updateSlotStatus = async (freeze) => {
    try {
      await Promise.all(
        selectedSlots.map((slotId) =>
          fetch(`http://localhost:8088/api/slots/${slotId}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              status: freeze ? "UNAVAILABLE" : "AVAILABLE",
            }),
          })
        )
      );
      fetchSlots();
    } catch (error) {
      console.error("Failed to update slots", error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container py-4" style={{ marginTop: "-2%" }}>
        <h1 className="h4 mb-3">Manage Slots for Turf ID: {turfId}</h1>

        {/* ⭐ NEW — TIME UPDATE SECTION ⭐ */}
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Update Turf Timing</h5>

          <div className="d-flex gap-3 mt-2">
            <div>
              <label>Open Time</label>
              <input
                type="time"
                className="form-control"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              />
            </div>

            <div>
              <label>Close Time</label>
              <input
                type="time"
                className="form-control"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-success mt-3" onClick={updateTiming}>
            Update Timing
          </button>

          {message && <p className="mt-2 text-info">{message}</p>}
        </div>

        {/* Date Selector */}
        <div className="mb-3">
          <input
            type="date"
            className="form-control w-25"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Slot Cards */}
        <div className="d-flex flex-wrap gap-2 mt-2">
          {slots.length > 0 ? (
            slots.map((slot) => {
              const isBooked = slot.status === "BOOKED";
              const isFrozen = slot.status === "FROZEN";
              const isAvailable = slot.status === "AVAILABLE";

              return (
                <div
                  key={slot.slotId}
                  className="d-flex align-items-center"
                  style={{
                    border: isBooked
                      ? "1px solid #db0318"
                      : isFrozen
                      ? "1px solid #6c757d"
                      : "1px solid #198754",
                    background: isBooked
                      ? "#d81633"
                      : isFrozen
                      ? "#6c757d"
                      : "#15c160",
                    color: "#fff",
                    borderRadius: "6px",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    padding: "5px 10px",
                    marginBottom: "8px",
                  }}
                  onClick={() => {
                    if (!isBooked) toggleSelect(slot.slotId);
                  }}
                >
                  <input
                    type="checkbox"
                    disabled={isBooked}
                    checked={selectedSlots.includes(slot.slotId)}
                    onChange={() => toggleSelect(slot.slotId)}
                    className="me-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No slots found</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-3 d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => updateSlotStatus(true)}
            disabled={selectedSlots.length === 0}
          >
            Freeze Selected
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => updateSlotStatus(false)}
            disabled={selectedSlots.length === 0}
          >
            Unfreeze Selected
          </button>
        </div>
      </main>
    </>
  );
};

export default OwnerSlotBooking;
