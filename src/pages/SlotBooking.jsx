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

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getToken } from "../utils/Auth.js";

// Demo frozen data
const demoFrozenData = {
  "2025-10-01": ["8:00 AM–9:00 AM"],
  frozenDays: {
    "2025-10-03": true
  }
};

// Demo turfs
const TURFS = [
  { id: "1", name: "Green Field Arena", pricePerHour: 800 }, // Regular Price
];

const getTodayLocal = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const SlotBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const tid = search.get("tid") || "1";
  const turf = useMemo(() => TURFS.find((t) => t.id === tid) || TURFS[0], [tid]);

  const [slotDate, setSlotDate] = useState(getTodayLocal());
  const [selectedTime, setSelectedTime] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mode, setMode] = useState("regular"); // "regular" or "tournament"

  const timeSlots = [
    "6:00 AM–7:00 AM","7:00 AM–8:00 AM","8:00 AM–9:00 AM","9:00 AM–10:00 AM",
    "10:00 AM–11:00 AM","11:00 AM–12:00 PM","12:00 PM–1:00 PM","1:00 PM–2:00 PM",
    "2:00 PM–3:00 PM","3:00 PM–4:00 PM","4:00 PM–5:00 PM","5:00 PM–6:00 PM",
    "6:00 PM–7:00 PM","7:00 PM–8:00 PM","8:00 PM–9:00 PM","9:00 PM–10:00 PM"
  ];

  useEffect(() => {
    if (!getToken()) {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      navigate("/login");
    }
  }, [navigate]);

  const bookedSlots = useMemo(() => {
    if (slotDate === "2025-10-01") {
      return [{ time: "9:00 AM–10:00 AM", type: "regular" }];
    }
    return [];
  }, [slotDate]);

  const frozenSlots = demoFrozenData[slotDate] || [];
  const isDayFrozen = demoFrozenData.frozenDays?.[slotDate] || false;

  const isSlotBooked = (time) => bookedSlots.some((b) => b.time === time);

  const toggleSlot = (time) => {
    if (isDayFrozen || frozenSlots.includes(time) || isSlotBooked(time)) return;
    setSelectedTime((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSelectAll = (e) => {
    if (isDayFrozen) return;
    if (e.target.checked) {
      const slotsToSelect = timeSlots.filter(
        (slot) => !isSlotBooked(slot) && !frozenSlots.includes(slot)
      );
      setSelectedTime(slotsToSelect);
    } else {
      setSelectedTime([]);
    }
  };

  // 💰 Calculate total amount dynamically
  useEffect(() => {
    const perHour = mode === "tournament" ? 1500 : turf?.pricePerHour || 0;
    setTotalAmount(selectedTime.length * perHour);
  }, [mode, selectedTime, turf]);

  const handleProceedToPay = () => {
    const label = mode === "tournament" ? "TOURNAMENT" : "REGULAR";
    alert(`Proceeding to pay ₹${totalAmount} for ${selectedTime.length} slots (${label})`);
  };

  const today = useMemo(() => getTodayLocal(), []);

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <div className="row g-4">
          {/* Left Booking Card */}
          <div className="col-12 col-lg-7">
            <div className="card">
              <div className="card-body">
                {/* Date Selection */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      id="slotDate"
                      className="form-control"
                      min={today}
                      value={slotDate}
                      onChange={(e) => setSlotDate(e.target.value)}
                    />
                  </div>

                  {/* 🏆 Booking Type Radio Buttons */}
                  <div className="col-12 col-md-6">
                    <label className="form-label d-block">Booking Type</label>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bookingType"
                        id="regularMode"
                        value="regular"
                        checked={mode === "regular"}
                        onChange={(e) => setMode(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="regularMode">
                        Regular (₹800/hr)
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="bookingType"
                        id="tournamentMode"
                        value="tournament"
                        checked={mode === "tournament"}
                        onChange={(e) => setMode(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="tournamentMode">
                        Tournament (₹1500/hr)
                      </label>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Slot Selection */}
                <label className="form-label d-flex align-items-center gap-2">
                  <span>Available Time Slots</span>
                  <div className="form-check m-0 ms-auto">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="selectAllSlots"
                      disabled={isDayFrozen}
                      checked={
                        selectedTime.length > 0 &&
                        selectedTime.length ===
                          timeSlots.filter(
                            (s) => !isSlotBooked(s) && !frozenSlots.includes(s)
                          ).length
                      }
                      onChange={handleSelectAll}
                    />
                    <label className="form-check-label" htmlFor="selectAllSlots">
                      Select all (6:00 AM–10:00 PM)
                    </label>
                  </div>
                </label>

                <div id="slots" className="d-flex flex-wrap gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = isSlotBooked(time);
                    const isFrozen = frozenSlots.includes(time) || isDayFrozen;
                    const active = selectedTime.includes(time);

                   return (
                      <button
                        key={time}
                        type="button"
                        className={`btn btn-outline-primary ${active ? "active" : ""}`}
                        disabled={isBooked || isFrozen || !slotDate}
                        onClick={() => toggleSlot(time)}
                        title={
                          isBooked
                            ? "Already booked"
                            : isFrozen
                            ? "Frozen (not bookable)"
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
              <div className=" card-body">
                <h2 className="h6 text-muted">Summary</h2>
                <ul className="list-unstyled small mb-3">
                  <li><strong>Turf:</strong> <span>{turf?.name || "—"}</span></li>
                  <li><strong>Date:</strong> <span>{slotDate || "—"}</span></li>
                  <li><strong>Type:</strong> <span className="text-capitalize">{mode}</span></li>
                  <li>
                    <strong>Time:</strong>{" "}
                    <span>{selectedTime.length > 0 ? selectedTime.join(", ") : "—"}</span>
                  </li>
                  <li>
                    <strong>Rate (/slot):</strong>{" "}
                    <span>
                      ₹{mode === "tournament" ? 1500 : turf?.pricePerHour || 0}
                    </span>
                  </li>
                </ul>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total</span>
                  <span className="fs-5">₹{totalAmount}</span>
                </div>

                <div className="d-grid mt-3">
                  <button
                    id="btnProceed"
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
