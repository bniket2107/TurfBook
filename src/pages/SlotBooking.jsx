// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth.js";
// // import { getToken } from "../utils/Auth";

// // Placeholders for frozen data, ideally fetched from backend for selected turf + date
// const demoFrozenData = {
//   "2025-10-01": ["8:00 AM–9:00 AM"],   // frozen slots on date
//   "2025-10-02": [],                    // no frozen slots on this date
//   frozenDays: {
//     "2025-10-03": true                 // entire day is frozen
//   }
// };

// const TURFS = [
//   { id: "1", name: "Green Field Arena", pricePerHour: 800 },
//   { id: "2", name: "Pro Arena", pricePerHour: 1200 }
// ];

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid") || "1";
//   const turf = useMemo(() => TURFS.find((t) => t.id === tid) || TURFS[0], [tid]);

//   const [slotDate, setSlotDate] = useState("");
//   const [duration, setDuration] = useState("60");
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   const timeSlots = [
//     "6:00 AM–7:00 AM", "7:00 AM–8:00 AM", "8:00 AM–9:00 AM", "9:00 AM–10:00 AM",
//     "10:00 AM–11:00 AM", "11:00 AM–12:00 PM", "12:00 PM–1:00 PM", "1:00 PM–2:00 PM",
//     "2:00 PM–3:00 PM", "3:00 PM–4:00 PM", "4:00 PM–5:00 PM", "5:00 PM–6:00 PM",
//     "6:00 PM–7:00 PM", "7:00 PM–8:00 PM", "8:00 PM–9:00 PM", "9:00 PM–10:00 PM"
//   ];

//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setTotalAmount(selectedTime.length * (turf?.pricePerHour || 0));
//   }, [selectedTime, turf]);

//   // Simulated booked slots demo for selected date
//   const bookedSlots = useMemo(() => {
//     // should fetch real booked slots from backend filtered by turf and slotDate
//     if (slotDate === "2025-10-01") {
//       return ["9:00 AM–10:00 AM", "5:00 PM–6:00 PM"];
//     }
//     return [];
//   }, [slotDate]);

//   // Frozen slots and day freeze for selected date (simulate fetch)
//   const frozenSlots = demoFrozenData[slotDate] || [];
//   const isDayFrozen = demoFrozenData.frozenDays?.[slotDate] || false;

//   // prevent selecting frozen slots or booked slots
//   const toggleSlot = (time) => {
//     if (bookedSlots.includes(time) || frozenSlots.includes(time) || isDayFrozen) return;
//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (isDayFrozen) return;
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter(
//         (slot) => !bookedSlots.includes(slot) && !frozenSlots.includes(slot)
//       );
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   const handleProceedToPay = () => {
//     alert(`Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots`);
//   };

//   const today = new Date().toISOString().split("T")[0];
//   const durationLabel = duration === "60" ? "1 Hour" : `${Number(duration) / 60} Hours`;

//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date/Duration */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       id="slotDate"
//                       className="form-control"
//                       min={today}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Duration</label>
//                     <select
//                       id="duration"
//                       className="form-select"
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                     >
//                       <option value="60">1 Hour</option>
//                       <option value="120">2 Hours</option>
//                     </select>
//                   </div>
//                 </div>
//                 <hr />
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       disabled={isDayFrozen}
//                       checked={
//                         selectedTime.length ===
//                         timeSlots.filter(
//                           (s) => !bookedSlots.includes(s) && !frozenSlots.includes(s)
//                         ).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all (6:00 AM–10:00 PM)
//                     </label>
//                   </div>
//                 </label>
//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const isBooked = bookedSlots.includes(time);
//                     const isFrozen = frozenSlots.includes(time) || isDayFrozen;
//                     const active = selectedTime.includes(time);
//                     return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isBooked || isFrozen || !slotDate}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isFrozen
//                             ? "Frozen (not bookable)"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong> <span>{turf?.name || "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Date:</strong> <span>{slotDate || "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     <span>{selectedTime.length > 0 ? selectedTime.join(", ") : "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Duration:</strong> <span>{durationLabel}</span>
//                   </li>
//                 </ul>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>
//                 <div className="d-grid mt-3">
//                   <button
//                     id="btnProceed"
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//                 <div className="text-muted small mt-2">No promo codes (for now).</div>
//               </div>
//             </div>
//           </aside>
//         </div>
//         {/* Optional footer */}
//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth.js";

// // Demo frozen data
// const demoFrozenData = {
//   "2025-10-01": ["8:00 AM–9:00 AM"],
//   frozenDays: {
//     "2025-10-03": true
//   }
// };

// // Demo turfs
// const TURFS = [
//   { id: "1", name: "Green Field Arena", pricePerHour: 800 }, // Regular Price
// ];

// const getTodayLocal = () => {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid") || "1";
//   const turf = useMemo(() => TURFS.find((t) => t.id === tid) || TURFS[0], [tid]);

//   const [slotDate, setSlotDate] = useState(getTodayLocal());
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [mode, setMode] = useState("regular"); // "regular" or "tournament"

//   const timeSlots = [
//     "6:00 AM–7:00 AM","7:00 AM–8:00 AM","8:00 AM–9:00 AM","9:00 AM–10:00 AM",
//     "10:00 AM–11:00 AM","11:00 AM–12:00 PM","12:00 PM–1:00 PM","1:00 PM–2:00 PM",
//     "2:00 PM–3:00 PM","3:00 PM–4:00 PM","4:00 PM–5:00 PM","5:00 PM–6:00 PM",
//     "6:00 PM–7:00 PM","7:00 PM–8:00 PM","8:00 PM–9:00 PM","9:00 PM–10:00 PM"
//   ];

//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   const bookedSlots = useMemo(() => {
//     if (slotDate === "2025-10-01") {
//       return [{ time: "9:00 AM–10:00 AM", type: "regular" }];
//     }
//     return [];
//   }, [slotDate]);

//   const frozenSlots = demoFrozenData[slotDate] || [];
//   const isDayFrozen = demoFrozenData.frozenDays?.[slotDate] || false;

//   const isSlotBooked = (time) => bookedSlots.some((b) => b.time === time);

//   const toggleSlot = (time) => {
//     if (isDayFrozen || frozenSlots.includes(time) || isSlotBooked(time)) return;
//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (isDayFrozen) return;
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter(
//         (slot) => !isSlotBooked(slot) && !frozenSlots.includes(slot)
//       );
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   // 💰 Calculate total amount dynamically
//   useEffect(() => {
//     const perHour = mode === "tournament" ? 1500 : turf?.pricePerHour || 0;
//     setTotalAmount(selectedTime.length * perHour);
//   }, [mode, selectedTime, turf]);

//   const handleProceedToPay = () => {
//     const label = mode === "tournament" ? "TOURNAMENT" : "REGULAR";
//     alert(`Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${label})`);
//   };

//   const today = useMemo(() => getTodayLocal(), []);

//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date Selection */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       id="slotDate"
//                       className="form-control"
//                       min={today}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>

//                   {/* 🏆 Booking Type Radio Buttons */}
//                   <div className="col-12 col-md-6">
//                     <label className="form-label d-block">Booking Type</label>

//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="regularMode"
//                         value="regular"
//                         checked={mode === "regular"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label" htmlFor="regularMode">
//                         Regular (₹800/hr)
//                       </label>
//                     </div>

//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="tournamentMode"
//                         value="tournament"
//                         checked={mode === "tournament"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label" htmlFor="tournamentMode">
//                         Tournament (₹1500/hr)
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <hr />

//                 {/* Slot Selection */}
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       disabled={isDayFrozen}
//                       checked={
//                         selectedTime.length > 0 &&
//                         selectedTime.length ===
//                           timeSlots.filter(
//                             (s) => !isSlotBooked(s) && !frozenSlots.includes(s)
//                           ).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all (6:00 AM–10:00 PM)
//                     </label>
//                   </div>
//                 </label>

//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const isBooked = isSlotBooked(time);
//                     const isFrozen = frozenSlots.includes(time) || isDayFrozen;
//                     const active = selectedTime.includes(time);

//                    return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isBooked || isFrozen || !slotDate}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isFrozen
//                             ? "Frozen (not bookable)"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className=" card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li><strong>Turf:</strong> <span>{turf?.name || "—"}</span></li>
//                   <li><strong>Date:</strong> <span>{slotDate || "—"}</span></li>
//                   <li><strong>Type:</strong> <span className="text-capitalize">{mode}</span></li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     <span>{selectedTime.length > 0 ? selectedTime.join(", ") : "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Rate (/slot):</strong>{" "}
//                     <span>
//                       ₹{mode === "tournament" ? 1500 : turf?.pricePerHour || 0}
//                     </span>
//                   </li>
//                 </ul>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     id="btnProceed"
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;

//-----------------------------------------------------------------------------------------------------
// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth.js";

// const TURFS = [
//   { id: "1", name: "Green Field Arena" },
// ];

// // Helper: get today's date in YYYY-MM-DD format
// const getTodayLocal = () => {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid") || "1";
//   const turf = useMemo(() => TURFS.find((t) => t.id === tid) || TURFS[0], [tid]);

//   const [slotDate, setSlotDate] = useState(getTodayLocal());
//   const [slots, setSlots] = useState([]); // fetched slots array from backend
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [mode, setMode] = useState("regular"); // "regular" or "tournament"

//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   // Fetch slots whenever turf or date changes
//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const response = await fetch(`/api/slots/${tid}/${slotDate}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch slots");
//         const data = await response.json();
//         setSlots(data);
//         setSelectedTime([]); // reset selected on new fetch
//       } catch (error) {
//         console.error(error);
//         setSlots([]);
//       }
//     };

//     if (tid && slotDate) {
//       fetchSlots();
//     }
//   }, [tid, slotDate]);

//   // Helper: get slot info by time string
//   const getSlotByTime = (time) => slots.find((s) => {
//     // Match times, both formatted as "HH:MM AM–HH:MM AM" style string
//     const slotTime = `${s.startTime}–${s.endTime}`;
//     return slotTime === time;
//   });

//   // The time slots come from backend slots (or fallback to fixed list)
//   // To keep same order, use backend slots mapped to formatted time strings
//   const timeSlots = useMemo(() => {
//     if (slots.length > 0) {
//       return slots.map(
//         (s) => `${s.startTime}–${s.endTime}`
//       );
//     }
//     // fallback static list (if backend fails)
//     return [
//       "6:00 AM–7:00 AM","7:00 AM–8:00 AM","8:00 AM–9:00 AM","9:00 AM–10:00 AM",
//       "10:00 AM–11:00 AM","11:00 AM–12:00 PM","12:00 PM–1:00 PM","1:00 PM–2:00 PM",
//       "2:00 PM–3:00 PM","3:00 PM–4:00 PM","4:00 PM–5:00 PM","5:00 PM–6:00 PM",
//       "6:00 PM–7:00 PM","7:00 PM–8:00 PM","8:00 PM–9:00 PM","9:00 PM–10:00 PM"
//     ];
//   }, [slots]);

//   // Booking mode prices from backend (use first available slot as baseline)
//   const regularPrice = slots.length > 0 ? slots[0].basePrice : 800;
//   const tournamentPrice = slots.length > 0 ? slots[0].tournamentPrice || 0 : 1500;

//   // Check if a slot is booked or disabled
//   const isSlotBooked = (time) => {
//     const slot = getSlotByTime(time);
//     return slot ? slot.isBooked : false;
//   };

//   // Check if tournament slot is valid (has price > 0)
//   const isTournamentSlotAvailable = (time) => {
//     if (mode !== "tournament") return true;
//     const slot = getSlotByTime(time);
//     return slot ? slot.tournamentPrice && slot.tournamentPrice > 0 : false;
//   };

//   const toggleSlot = (time) => {
//     // Prevent selection of booked or unavailable tournament slots
//     if (isSlotBooked(time)) return;
//     if (mode === "tournament" && !isTournamentSlotAvailable(time)) return;

//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter((slot) => {
//         if (isSlotBooked(slot)) return false;
//         if (mode === "tournament" && !isTournamentSlotAvailable(slot)) return false;
//         return true;
//       });
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   // Calculate total amount dynamically from selected slots
//   useEffect(() => {
//     const pricePerSlot = mode === "tournament" ? tournamentPrice : regularPrice;
//     setTotalAmount(selectedTime.length * pricePerSlot);
//   }, [mode, selectedTime, regularPrice, tournamentPrice]);

//   const handleProceedToPay = () => {
//     const label = mode === "tournament" ? "TOURNAMENT" : "REGULAR";
//     alert(`Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${label})`);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date Selection */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       id="slotDate"
//                       className="form-control"
//                       min={getTodayLocal()}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>

//                   {/* Booking Type Radio Buttons */}
//                   <div className="col-12 col-md-6">
//                     <label className="form-label d-block">Booking Type</label>

//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="regularMode"
//                         value="regular"
//                         checked={mode === "regular"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label" htmlFor="regularMode">
//                         Regular (₹{regularPrice}/hr)
//                       </label>
//                     </div>

//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         id="tournamentMode"
//                         value="tournament"
//                         checked={mode === "tournament"}
//                         onChange={(e) => setMode(e.target.value)}
//                         disabled={tournamentPrice === 0}
//                       />
//                       <label
//                         className={`form-check-label ${
//                           tournamentPrice === 0 ? "text-muted" : ""
//                         }`}
//                         htmlFor="tournamentMode"
//                       >
//                         Tournament (₹{tournamentPrice}/hr)
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <hr />

//                 {/* Slot Selection */}
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       checked={
//                         selectedTime.length > 0 &&
//                         selectedTime.length ===
//                           timeSlots.filter((s) => {
//                             if (isSlotBooked(s)) return false;
//                             if (mode === "tournament" && !isTournamentSlotAvailable(s)) return false;
//                             return true;
//                           }).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all ({timeSlots[0]}–{timeSlots[timeSlots.length - 1]})
//                     </label>
//                   </div>
//                 </label>

//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const slot = getSlotByTime(time);
//                     const isBooked = isSlotBooked(time);
//                     const isDisabled =
//                       isBooked ||
//                       (mode === "tournament" && !isTournamentSlotAvailable(time));

//                     const active = selectedTime.includes(time);

//                     return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isDisabled}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isDisabled
//                             ? "Not available in selected mode"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className=" card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong> <span>{turf?.name || "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Date:</strong> <span>{slotDate || "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Type:</strong>{" "}
//                     <span className="text-capitalize">{mode}</span>
//                   </li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     <span>{selectedTime.length > 0 ? selectedTime.join(", ") : "—"}</span>
//                   </li>
//                   <li>
//                     <strong>Rate (/slot):</strong>{" "}
//                     <span>₹{mode === "tournament" ? tournamentPrice : regularPrice}</span>
//                   </li>
//                 </ul>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     id="btnProceed"
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;


// //------------------------------------------------------------------------------

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth";

// const getTodayLocal = () => {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid");

//   const [turf, setTurf] = useState(null);
//   const [slotDate, setSlotDate] = useState(getTodayLocal());
//   const [slots, setSlots] = useState([]);
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [mode, setMode] = useState("regular");
//   const [loadingTurf, setLoadingTurf] = useState(true);
//   const [loadingSlots, setLoadingSlots] = useState(true);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // ---------------- AUTH CHECK ----------------
//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   // ---------------- FETCH TURF DETAILS ----------------
//   useEffect(() => {
//     if (!tid) return;

//     const fetchTurf = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8088/api/turfs/${tid}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setTurf({
//           id: res.data.turfId,
//           name: res.data.turfName,
//           price: res.data.pricePerHour,
//           tournamentPrice: res.data.tournamentSlotPrice,
//         });
//       } catch (err) {
//         console.error("Error fetching turf details:", err);
//       } finally {
//         setLoadingTurf(false);
//       }
//     };
//     fetchTurf();
//   }, [tid]);

//   // ---------------- FETCH SLOTS ----------------
//   useEffect(() => {
//     if (!tid || !slotDate) return;

//     const fetchSlots = async () => {
//       setLoadingSlots(true);
//       try {
//         const res = await axios.get(`http://localhost:8088/api/slots/${tid}/${slotDate}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setSlots(res.data);
//         setSelectedTime([]);
//       } catch (err) {
//         console.error("Error fetching slots:", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };
//     fetchSlots();
//   }, [tid, slotDate]);

//   // ---------------- HELPER FUNCTIONS ----------------
//   const getSlotByTime = (time) =>
//     slots.find((s) => `${s.startTime}–${s.endTime}` === time);

//   const timeSlots = useMemo(() => {
//     if (slots.length > 0) {
//       return slots.map((s) => `${s.startTime}–${s.endTime}`);
//     }
//     // fallback static times if backend fails
//     return Array.from({ length: 16 }, (_, i) => {
//       const hour = 6 + i;
//       const nextHour = hour + 1;
//       const formatTime = (h) =>
//         h < 12 ? `${h}:00 AM` : h === 12 ? `12:00 PM` : `${h - 12}:00 PM`;
//       return `${formatTime(hour)}–${formatTime(nextHour)}`;
//     });
//   }, [slots]);

//   const isSlotBooked = (time) => {
//     const slot = getSlotByTime(time);
//     return slot ? slot.isBooked : false;
//   };

//   // ---------------- FIXED: Tournament slots now selectable if not booked ----------------
//   const isTournamentSlotAvailable = (time) => {
//     if (mode !== "tournament") return true;
//     const slot = getSlotByTime(time);
//     return slot ? !slot.isBooked : true;
//   };

//   const toggleSlot = (time) => {
//     if (isSlotBooked(time)) return;
//     if (mode === "tournament" && !isTournamentSlotAvailable(time)) return;

//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter((slot) => {
//         if (isSlotBooked(slot)) return false;
//         if (mode === "tournament" && !isTournamentSlotAvailable(slot)) return false;
//         return true;
//       });
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   // ---------------- TOTAL CALC ----------------
//   useEffect(() => {
//     const pricePerSlot =
//       mode === "tournament"
//         ? turf?.tournamentPrice || 0
//         : turf?.price || 0;
//     setTotalAmount(selectedTime.length * pricePerSlot);
//   }, [mode, selectedTime, turf]);

//   const handleProceedToPay = () => {
//     alert(
//       `Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${mode.toUpperCase()})`
//     );
//   };

//   // ---------------- LOADING STATE ----------------
//   if (loadingTurf || loadingSlots) {
//     return (
//       <main className="container py-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading...</p>
//       </main>
//     );
//   }

//   if (!turf) {
//     return (
//       <main className="container py-5">
//         <div className="alert alert-danger text-center">Turf not found!</div>
//       </main>
//     );
//   }

//   // ---------------- UI ----------------
//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date Selection & Booking Type */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       min={getTodayLocal()}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <label className="form-label d-block">Booking Type</label>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         value="regular"
//                         checked={mode === "regular"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label">
//                         Regular (₹{turf.price}/hr)
//                       </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         value="tournament"
//                         checked={mode === "tournament"}
//                         onChange={(e) => setMode(e.target.value)}
//                         disabled={!turf.tournamentPrice}
//                       />
//                       <label
//                         className={`form-check-label ${
//                           !turf.tournamentPrice ? "text-muted" : ""
//                         }`}
//                       >
//                         Tournament (₹{turf.tournamentPrice || 0}/hr)
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <hr />

//                 {/* Slots */}
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       checked={
//                         selectedTime.length > 0 &&
//                         selectedTime.length ===
//                           timeSlots.filter((s) => {
//                             if (isSlotBooked(s)) return false;
//                             if (
//                               mode === "tournament" &&
//                               !isTournamentSlotAvailable(s)
//                             )
//                               return false;
//                             return true;
//                           }).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all ({timeSlots[0]}–{timeSlots[timeSlots.length - 1]})
//                     </label>
//                   </div>
//                 </label>

//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const isBooked = isSlotBooked(time);
//                     const isDisabled =
//                       isBooked ||
//                       (mode === "tournament" && !isTournamentSlotAvailable(time));
//                     const active = selectedTime.includes(time);

//                     return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isDisabled}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isDisabled
//                             ? "Not available in selected mode"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong> {turf.name}
//                   </li>
//                   <li>
//                     <strong>Date:</strong> {slotDate}
//                   </li>
//                   <li>
//                     <strong>Type:</strong> {mode}
//                   </li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     {selectedTime.length > 0 ? selectedTime.join(", ") : "—"}
//                   </li>
//                   <li>
//                     <strong>Rate (/slot):</strong>{" "}
//                     ₹{mode === "tournament" ? turf.tournamentPrice : turf.price}
//                   </li>
//                 </ul>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;

//-----------------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth";

// const getTodayLocal = () => {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid");

//   const [turf, setTurf] = useState(null);
//   const [slotDate, setSlotDate] = useState(getTodayLocal());
//   const [slots, setSlots] = useState([]);
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [mode, setMode] = useState("regular");
//   const [loadingTurf, setLoadingTurf] = useState(true);
//   const [loadingSlots, setLoadingSlots] = useState(true);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // ---------------- AUTH CHECK ----------------
//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   // ---------------- FETCH TURF DETAILS ----------------
//   useEffect(() => {
//     if (!tid) return;

//     const fetchTurf = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8088/api/turfs/${tid}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });

//         setTurf({
//           id: res.data.turfId,
//           name: res.data.turfName,
//           price: res.data.pricePerHour,
//           discountPercent: res.data.discountPercent || 0,
//           finalPrice: res.data.finalPrice || res.data.pricePerHour,
//           tournamentPrice: res.data.tournamentSlotPrice,
//           // store min/max timing for fallback
//           minHour: res.data.minHour || 6,
//           maxHour: res.data.maxHour || 22,
//         });
//       } catch (err) {
//         console.error("Error fetching turf details:", err);
//       } finally {
//         setLoadingTurf(false);
//       }
//     };
//     fetchTurf();
//   }, [tid]);

//   // ---------------- FETCH SLOTS ----------------
//   useEffect(() => {
//     if (!tid || !slotDate) return;

//     const fetchSlots = async () => {
//       setLoadingSlots(true);
//       try {
//         const res = await axios.get(`http://localhost:8088/api/slots/${tid}/${slotDate}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setSlots(res.data);
//         setSelectedTime([]);
//       } catch (err) {
//         console.error("Error fetching slots:", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };
//     fetchSlots();
//   }, [tid, slotDate]);

//   // ---------------- HELPER FUNCTIONS ----------------
//   const getSlotByTime = (time) =>
//     slots.find((s) => `${s.startTime}–${s.endTime}` === time);

//   const timeSlots = useMemo(() => {
//     if (slots.length > 0) {
//       return slots.map((s) => `${s.startTime}–${s.endTime}`);
//     }
//     // fallback if backend returns no slots
//     if (!turf) return [];
//     const { minHour, maxHour } = turf;
//     const arr = [];
//     for (let h = minHour; h < maxHour; h++) {
//       const nextH = h + 1;
//       const fmt = (hour) =>
//         hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
//       arr.push(`${fmt(h)}–${fmt(nextH)}`);
//     }
//     return arr;
//   }, [slots, turf]);

//   const isSlotBooked = (time) => {
//     const slot = getSlotByTime(time);
//     return slot ? slot.isBooked : false;
//   };

//   const isTournamentSlotAvailable = (time) => {
//     if (mode !== "tournament") return true;
//     const slot = getSlotByTime(time);
//     return slot ? !slot.isBooked : true;
//   };

//   const toggleSlot = (time) => {
//     if (isSlotBooked(time)) return;
//     if (mode === "tournament" && !isTournamentSlotAvailable(time)) return;

//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter((slot) => {
//         if (isSlotBooked(slot)) return false;
//         if (mode === "tournament" && !isTournamentSlotAvailable(slot)) return false;
//         return true;
//       });
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   // ---------------- TOTAL CALC ----------------
//   useEffect(() => {
//     let pricePerSlot = 0;
//     if (mode === "tournament") {
//       pricePerSlot = turf?.tournamentPrice || 0;
//     } else {
//       pricePerSlot = turf?.finalPrice || turf?.price || 0;
//     }
//     setTotalAmount(selectedTime.length * pricePerSlot);
//   }, [mode, selectedTime, turf]);

//   const handleProceedToPay = () => {
//     alert(
//       `Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${mode.toUpperCase()})`
//     );
//   };

//   // ---------------- LOADING STATE ----------------
//   if (loadingTurf || loadingSlots) {
//     return (
//       <main className="container py-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading...</p>
//       </main>
//     );
//   }

//   if (!turf) {
//     return (
//       <main className="container py-5">
//         <div className="alert alert-danger text-center">Turf not found!</div>
//       </main>
//     );
//   }

//   // ---------------- UI ----------------
//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date & Booking Type */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       min={getTodayLocal()}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <label className="form-label d-block">Booking Type</label>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         value="regular"
//                         checked={mode === "regular"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label">
//                         Regular (
//                         {turf.discountPercent > 0 ? (
//                           <>
//                             <span className="text-danger fw-bold">
//                               {turf.discountPercent}% OFF
//                             </span>{" "}
//                             <del>₹{turf.price}</del> ₹{turf.finalPrice}/hr
//                           </>
//                         ) : (
//                           <>₹{turf.price}/hr</>
//                         )}
//                         )
//                       </label>
//                     </div>

//                     {turf.tournamentPrice > 0 && (
//                       <div className="form-check form-check-inline">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="bookingType"
//                           value="tournament"
//                           checked={mode === "tournament"}
//                           onChange={(e) => setMode(e.target.value)}
//                         />
//                         <label className="form-check-label">
//                           Tournament ₹{turf.tournamentPrice}/hr
//                         </label>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <hr />

//                 {/* Slots */}
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       checked={
//                         selectedTime.length > 0 &&
//                         selectedTime.length ===
//                           timeSlots.filter((s) => {
//                             if (isSlotBooked(s)) return false;
//                             if (
//                               mode === "tournament" &&
//                               !isTournamentSlotAvailable(s)
//                             )
//                               return false;
//                             return true;
//                           }).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all ({timeSlots[0]}–{timeSlots[timeSlots.length - 1]})
//                     </label>
//                   </div>
//                 </label>

//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const isBooked = isSlotBooked(time);
//                     const isDisabled =
//                       isBooked ||
//                       (mode === "tournament" && !isTournamentSlotAvailable(time));
//                     const active = selectedTime.includes(time);

//                     return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isDisabled}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isDisabled
//                             ? "Not available in selected mode"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong> {turf.name}
//                   </li>
//                   <li>
//                     <strong>Date:</strong> {slotDate}
//                   </li>
//                   <li>
//                     <strong>Type:</strong> {mode}
//                   </li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     {selectedTime.length > 0 ? selectedTime.join(", ") : "—"}
//                   </li>
//                   <li>
//                     <strong>Rate (/slot):</strong>{" "}
//                     ₹{mode === "tournament" ? turf.tournamentPrice : turf.finalPrice}
//                   </li>
//                 </ul>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;

///----------------------------------------------------------------------------------------------------


// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { getToken } from "../utils/Auth";

// // Get today's date in yyyy-mm-dd
// const getTodayLocal = () => {
//   const d = new Date();
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// // Get max selectable date = today + 30
// const getMaxBookingDate = () => {
//   const d = new Date();
//   d.setDate(d.getDate() + 30);
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const dd = String(d.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const SlotBooking = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
//   const tid = search.get("tid");

//   const [turf, setTurf] = useState(null);
//   const [slotDate, setSlotDate] = useState(getTodayLocal()); // default today
//   const [slots, setSlots] = useState([]);
//   const [selectedTime, setSelectedTime] = useState([]);
//   const [mode, setMode] = useState("regular");
//   const [loadingTurf, setLoadingTurf] = useState(true);
//   const [loadingSlots, setLoadingSlots] = useState(true);
//   const [totalAmount, setTotalAmount] = useState(0);

//   // ---------------- AUTH CHECK ----------------
//   useEffect(() => {
//     if (!getToken()) {
//       localStorage.setItem("redirectAfterLogin", window.location.href);
//       navigate("/login");
//     }
//   }, [navigate]);

//   // ---------------- FETCH TURF DETAILS ----------------
//   useEffect(() => {
//     if (!tid) return;

//     const fetchTurf = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8088/api/turfs/${tid}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });

//         // Frontend calculates regular finalPrice
//         const pricePerHour = res.data.pricePerHour || 0;
//         const discountPercent = res.data.discountPercent || 0;
//         const finalPrice = pricePerHour - Math.round((pricePerHour * discountPercent) / 100);

//         setTurf({
//           id: res.data.turfId,
//           name: res.data.turfName,
//           price: pricePerHour,
//           discountPercent,
//           finalPrice,
//           tournamentPrice: res.data.tournamentSlotPrice,
//           minHour: res.data.minHour || 6,
//           maxHour: res.data.maxHour || 22,
//         });
//       } catch (err) {
//         console.error("Error fetching turf details:", err);
//       } finally {
//         setLoadingTurf(false);
//       }
//     };

//     fetchTurf();
//   }, [tid]);

//   // ---------------- FETCH SLOTS ----------------
//   useEffect(() => {
//     if (!tid || !slotDate) return;

//     const fetchSlots = async () => {
//       setLoadingSlots(true);
//       try {
//         const res = await axios.get(`http://localhost:8088/api/slots/${tid}/${slotDate}`, {
//           headers: { Authorization: `Bearer ${getToken()}` },
//         });
//         setSlots(res.data);
//         setSelectedTime([]);
//       } catch (err) {
//         console.error("Error fetching slots:", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchSlots();
//   }, [tid, slotDate]);

//   // ---------------- HELPER FUNCTIONS ----------------
//   const getSlotByTime = (time) =>
//     slots.find((s) => `${s.startTime}–${s.endTime}` === time);

//   const timeSlots = useMemo(() => {
//     if (slots.length > 0) {
//       return slots.map((s) => `${s.startTime}–${s.endTime}`);
//     }
//     if (!turf) return [];
//     const { minHour, maxHour } = turf;
//     const arr = [];
//     for (let h = minHour; h < maxHour; h++) {
//       const nextH = h + 1;
//       const fmt = (hour) =>
//         hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
//       arr.push(`${fmt(h)}–${fmt(nextH)}`);
//     }
//     return arr;
//   }, [slots, turf]);

//   const isSlotBooked = (time) => {
//     const slot = getSlotByTime(time);
//     return slot ? slot.isBooked : false;
//   };

//   const isTournamentSlotAvailable = (time) => {
//     if (mode !== "tournament") return true;
//     const slot = getSlotByTime(time);
//     return slot ? !slot.isBooked : true;
//   };

//   const toggleSlot = (time) => {
//     if (isSlotBooked(time)) return;
//     if (mode === "tournament" && !isTournamentSlotAvailable(time)) return;

//     setSelectedTime((prev) =>
//       prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const slotsToSelect = timeSlots.filter((slot) => {
//         if (isSlotBooked(slot)) return false;
//         if (mode === "tournament" && !isTournamentSlotAvailable(slot)) return false;
//         return true;
//       });
//       setSelectedTime(slotsToSelect);
//     } else {
//       setSelectedTime([]);
//     }
//   };

//   // ---------------- TOTAL CALC ----------------
//   useEffect(() => {
//     let pricePerSlot = 0;
//     if (mode === "tournament") {
//       pricePerSlot = turf?.tournamentPrice || 0;
//     } else {
//       pricePerSlot = turf?.finalPrice || turf?.price || 0;
//     }
//     setTotalAmount(selectedTime.length * pricePerSlot);
//   }, [mode, selectedTime, turf]);

//   const handleProceedToPay = () => {
//     alert(
//       `Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${mode.toUpperCase()})`
//     );
//   };

//   // ---------------- LOADING STATE ----------------
//   if (loadingTurf || loadingSlots) {
//     return (
//       <main className="container py-5 text-center">
//         <div className="spinner-border text-primary"></div>
//         <p className="mt-3">Loading...</p>
//       </main>
//     );
//   }

//   if (!turf) {
//     return (
//       <main className="container py-5">
//         <div className="alert alert-danger text-center">Turf not found!</div>
//       </main>
//     );
//   }

//   // ---------------- UI ----------------
//   return (
//     <>
//       <Navbar />
//       <div className="container py-4">
//         <div className="row g-4">
//           {/* Left Booking Card */}
//           <div className="col-12 col-lg-7">
//             <div className="card">
//               <div className="card-body">
//                 {/* Date & Booking Type */}
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <label className="form-label">Date</label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       min={getTodayLocal()}
//                       max={getMaxBookingDate()}
//                       value={slotDate}
//                       onChange={(e) => setSlotDate(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <label className="form-label d-block">Booking Type</label>
//                     <div className="form-check form-check-inline">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="bookingType"
//                         value="regular"
//                         checked={mode === "regular"}
//                         onChange={(e) => setMode(e.target.value)}
//                       />
//                       <label className="form-check-label">
//                         Regular (
//                         {turf.discountPercent > 0 ? (
//                           <>
//                             <span className="text-danger fw-bold">
//                               {turf.discountPercent}% OFF
//                             </span>{" "}
//                             <del>₹{turf.price}</del> ₹{turf.finalPrice}/hr
//                           </>
//                         ) : (
//                           <>₹{turf.price}/hr</>
//                         )}
//                         )
//                       </label>
//                     </div>

//                     {turf.tournamentPrice > 0 && (
//                       <div className="form-check form-check-inline">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="bookingType"
//                           value="tournament"
//                           checked={mode === "tournament"}
//                           onChange={(e) => setMode(e.target.value)}
//                         />
//                         <label className="form-check-label">
//                           Tournament ₹{turf.tournamentPrice}/hr
//                         </label>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <hr />

//                 {/* Slots */}
//                 <label className="form-label d-flex align-items-center gap-2">
//                   <span>Available Time Slots</span>
//                   <div className="form-check m-0 ms-auto">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="selectAllSlots"
//                       checked={
//                         selectedTime.length > 0 &&
//                         selectedTime.length ===
//                           timeSlots.filter((s) => {
//                             if (isSlotBooked(s)) return false;
//                             if (
//                               mode === "tournament" &&
//                               !isTournamentSlotAvailable(s)
//                             )
//                               return false;
//                             return true;
//                           }).length
//                       }
//                       onChange={handleSelectAll}
//                     />
//                     <label className="form-check-label" htmlFor="selectAllSlots">
//                       Select all ({timeSlots[0]}–{timeSlots[timeSlots.length - 1]})
//                     </label>
//                   </div>
//                 </label>

//                 <div id="slots" className="d-flex flex-wrap gap-2">
//                   {timeSlots.map((time) => {
//                     const isBooked = isSlotBooked(time);
//                     const isDisabled =
//                       isBooked ||
//                       (mode === "tournament" && !isTournamentSlotAvailable(time));
//                     const active = selectedTime.includes(time);

//                     return (
//                       <button
//                         key={time}
//                         type="button"
//                         className={`btn btn-outline-primary ${active ? "active" : ""}`}
//                         disabled={isDisabled}
//                         onClick={() => toggleSlot(time)}
//                         title={
//                           isBooked
//                             ? "Already booked"
//                             : isDisabled
//                             ? "Not available in selected mode"
//                             : "Available for booking"
//                         }
//                       >
//                         {time}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Summary Card */}
//           <aside className="col-12 col-lg-5">
//             <div className="card">
//               <div className="card-body">
//                 <h2 className="h6 text-muted">Summary</h2>
//                 <ul className="list-unstyled small mb-3">
//                   <li>
//                     <strong>Turf:</strong> {turf.name}
//                   </li>
//                   <li>
//                     <strong>Date:</strong> {slotDate}
//                   </li>
//                   <li>
//                     <strong>Type:</strong> {mode}
//                   </li>
//                   <li>
//                     <strong>Time:</strong>{" "}
//                     {selectedTime.length > 0 ? selectedTime.join(", ") : "—"}
//                   </li>
//                   <li>
//                     <strong>Rate (/slot):</strong>{" "}
//                     ₹{mode === "tournament" ? turf.tournamentPrice : turf.finalPrice}
//                   </li>
//                 </ul>

//                 <div className="d-flex justify-content-between align-items-center">
//                   <span className="fw-semibold">Total</span>
//                   <span className="fs-5">₹{totalAmount}</span>
//                 </div>

//                 <div className="d-grid mt-3">
//                   <button
//                     className="btn btn-primary"
//                     disabled={!slotDate || selectedTime.length === 0}
//                     onClick={handleProceedToPay}
//                   >
//                     Proceed to Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         <footer className="text-center mt-5 mb-3 small text-muted">
//           © TurfBook 2025 Terms & Conditions
//         </footer>
//       </div>
//     </>
//   );
// };

// export default SlotBooking;
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/Auth";

// Get today's date in yyyy-mm-dd
const getTodayLocal = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Get max selectable date = today + 29 days
const getMaxBookingDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 29); // today + 29
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const SlotBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tid = search.get("tid");

  const [turf, setTurf] = useState(null);
  const [slotDate, setSlotDate] = useState(getTodayLocal());
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [mode, setMode] = useState("regular");
  const [loadingTurf, setLoadingTurf] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    if (!getToken()) {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      navigate("/login");
    }
  }, [navigate]);

  // ---------------- FETCH TURF DETAILS ----------------
  useEffect(() => {
    if (!tid) return;

    const fetchTurf = async () => {
      try {
        const res = await axios.get(`http://localhost:8088/api/turfs/${tid}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        // FRONTEND calculates regular finalPrice
        const pricePerHour = res.data.pricePerHour || 0;
        const discountPercent = res.data.discountPercent || 0;
        const finalPrice = Math.round(pricePerHour - (pricePerHour * discountPercent) / 100);

        setTurf({
          id: res.data.turfId,
          name: res.data.turfName,
          price: pricePerHour,
          discountPercent,
          finalPrice,
          tournamentPrice: res.data.tournamentSlotPrice,
          minHour: res.data.minHour || 6,
          maxHour: res.data.maxHour || 22,
        });
      } catch (err) {
        console.error("Error fetching turf details:", err);
      } finally {
        setLoadingTurf(false);
      }
    };

    fetchTurf();
  }, [tid]);

  // ---------------- FETCH SLOTS ----------------
  useEffect(() => {
    if (!tid || !slotDate) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const res = await axios.get(`http://localhost:8088/api/slots/${tid}/${slotDate}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setSlots(res.data);
        setSelectedTime([]);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [tid, slotDate]);

  // ---------------- HELPER FUNCTIONS ----------------
  const getSlotByTime = (time) =>
    slots.find((s) => `${s.startTime}–${s.endTime}` === time);

  const timeSlots = useMemo(() => {
    if (slots.length > 0) return slots.map((s) => `${s.startTime}–${s.endTime}`);
    if (!turf) return [];
    const { minHour, maxHour } = turf;
    const arr = [];
    for (let h = minHour; h < maxHour; h++) {
      const nextH = h + 1;
      const fmt = (hour) =>
        hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`;
      arr.push(`${fmt(h)}–${fmt(nextH)}`);
    }
    return arr;
  }, [slots, turf]);

  const isSlotBooked = (time) => {
    const slot = getSlotByTime(time);
    return slot ? slot.isBooked : false;
  };

  const isTournamentSlotAvailable = (time) => {
    if (mode !== "tournament") return true;
    const slot = getSlotByTime(time);
    return slot ? !slot.isBooked : true;
  };

  const toggleSlot = (time) => {
    if (isSlotBooked(time)) return;
    if (mode === "tournament" && !isTournamentSlotAvailable(time)) return;

    setSelectedTime((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const slotsToSelect = timeSlots.filter((slot) => {
        if (isSlotBooked(slot)) return false;
        if (mode === "tournament" && !isTournamentSlotAvailable(slot)) return false;
        return true;
      });
      setSelectedTime(slotsToSelect);
    } else setSelectedTime([]);
  };

  // ---------------- TOTAL CALC ----------------
  useEffect(() => {
    let pricePerSlot = mode === "tournament" ? turf?.tournamentPrice || 0 : turf?.finalPrice || 0;
    setTotalAmount(selectedTime.length * pricePerSlot);
  }, [mode, selectedTime, turf]);

  const handleProceedToPay = () => {
    alert(
      `Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${mode.toUpperCase()})`
    );
  };

  // ---------------- LOADING STATE ----------------
  if (loadingTurf || loadingSlots)
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Loading...</p>
      </main>
    );

  if (!turf)
    return (
      <main className="container py-5">
        <div className="alert alert-danger text-center">Turf not found!</div>
      </main>
    );

  // ---------------- UI ----------------
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row g-4">
          {/* Left Booking Card */}
          <div className="col-12 col-lg-7">
            <div className="card">
              <div className="card-body">
                {/* Date & Booking Type */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      min={getTodayLocal()}
                      max={getMaxBookingDate()}
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label d-block">Booking Type</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bookingType"
                        value="regular"
                        checked={mode === "regular"}
                        onChange={(e) => setMode(e.target.value)}
                      />
                      <label className="form-check-label">
                        Regular (
                        {turf.discountPercent > 0 ? (
                          <>
                            <span className="text-danger fw-bold">{turf.discountPercent}% OFF</span>{" "}
                            <del>₹{turf.price}</del> ₹{turf.finalPrice}/hr
                          </>
                        ) : (
                          <>₹{turf.price}/hr</>
                        )}
                        )
                      </label>
                    </div>

                    {turf.tournamentPrice > 0 && (
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="bookingType"
                          value="tournament"
                          checked={mode === "tournament"}
                          onChange={(e) => setMode(e.target.value)}
                        />
                        <label className="form-check-label">
                          Tournament ₹{turf.tournamentPrice}/hr
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <hr />

                {/* Slots */}
                <label className="form-label d-flex align-items-center gap-2">
                  <span>Available Time Slots</span>
                  <div className="form-check m-0 ms-auto">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAllSlots"
                      checked={
                        selectedTime.length > 0 &&
                        selectedTime.length ===
                          timeSlots.filter((s) => {
                            if (isSlotBooked(s)) return false;
                            if (mode === "tournament" && !isTournamentSlotAvailable(s)) return false;
                            return true;
                          }).length
                      }
                      onChange={handleSelectAll}
                    />
                    <label className="form-check-label" htmlFor="selectAllSlots">
                      Select all ({timeSlots[0]}–{timeSlots[timeSlots.length - 1]})
                    </label>
                  </div>
                </label>

                <div id="slots" className="d-flex flex-wrap gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = isSlotBooked(time);
                    const isDisabled = isBooked || (mode === "tournament" && !isTournamentSlotAvailable(time));
                    const active = selectedTime.includes(time);

                    return (
                      <button
                        key={time}
                        type="button"
                        className={`btn btn-outline-primary ${active ? "active" : ""}`}
                        disabled={isDisabled}
                        onClick={() => toggleSlot(time)}
                        title={
                          isBooked
                            ? "Already booked"
                            : isDisabled
                            ? "Not available in selected mode"
                            : "Available for booking"
                        }
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Card */}
          <aside className="col-12 col-lg-5">
            <div className="card">
              <div className="card-body">
                <h2 className="h6 text-muted">Summary</h2>
                <ul className="list-unstyled small mb-3">
                  <li>
                    <strong>Turf:</strong> {turf.name}
                  </li>
                  <li>
                    <strong>Date:</strong> {slotDate}
                  </li>
                  <li>
                    <strong>Type:</strong> {mode}
                  </li>
                  <li>
                    <strong>Time:</strong> {selectedTime.length > 0 ? selectedTime.join(", ") : "—"}
                  </li>
                  <li>
                    <strong>Rate (/slot):</strong> ₹{mode === "tournament" ? turf.tournamentPrice : turf.finalPrice}
                  </li>
                </ul>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total</span>
                  <span className="fs-5">₹{totalAmount}</span>
                </div>

                <div className="d-grid mt-3">
                  <button
                    className="btn btn-primary"
                    disabled={!slotDate || selectedTime.length === 0}
                    onClick={handleProceedToPay}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <footer className="text-center mt-5 mb-3 small text-muted">
          © TurfBook 2025 Terms & Conditions
        </footer>
      </div>
    </>
  );
};

export default SlotBooking;
