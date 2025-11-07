import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const allSlots = [
  "6:00 AM–7:00 AM", "7:00 AM–8:00 AM", "8:00 AM–9:00 AM", "9:00 AM–10:00 AM",
  "10:00 AM–11:00 AM", "11:00 AM–12:00 PM", "12:00 PM–1:00 PM", "1:00 PM–2:00 PM",
  "2:00 PM–3:00 PM", "3:00 PM–4:00 PM", "4:00 PM–5:00 PM", "5:00 PM–6:00 PM",
  "6:00 PM–7:00 PM", "7:00 PM–8:00 PM", "8:00 PM–9:00 PM", "9:00 PM–10:00 PM"
];

const OwnerSlotBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "owner") navigate("/login");
  }, [user, navigate]);

  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const [duration, setDuration] = useState("60");
  const [bookedSlots, setBookedSlots] = useState([]);

  // Freeze states
  const [frozenSlots, setFrozenSlots] = useState({});
  const [frozenDays, setFrozenDays] = useState({});

  // Selected slots for freeze/unfreeze batch operation
  const [selectedSlotsForFreeze, setSelectedSlotsForFreeze] = useState([]);

  // Load booked slots (demo)
  const loadSlotsForDate = (date) => {
    const demoBooked =
      date === new Date().toISOString().split("T")[0]
        ? ["8:00 AM–9:00 AM", "5:00 PM–6:00 PM", "9:00 PM–10:00 PM"]
        : [];
    setBookedSlots(demoBooked);
  };

  useEffect(() => {
    loadSlotsForDate(selectedDate);
    setSelectedSlotsForFreeze([]);
  }, [selectedDate]);

  const toggleSelectSlot = (slot) => {
    setSelectedSlotsForFreeze((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const toggleDayFreeze = () => {
    setFrozenDays((prev) => ({
      ...prev,
      [selectedDate]: !prev[selectedDate],
    }));

    setFrozenSlots((prev) => {
      const copy = { ...prev };
      if (copy[selectedDate]) {
        delete copy[selectedDate];
      }
      return copy;
    });

    setSelectedSlotsForFreeze([]);
  };

  const frozenForDate = frozenSlots[selectedDate] || [];
  const isDayFrozen = !!frozenDays[selectedDate];

  const freezeSelectedSlots = () => {
    setFrozenSlots((prev) => {
      const frozenForDate = new Set(prev[selectedDate] || []);
      selectedSlotsForFreeze.forEach((s) => frozenForDate.add(s));
      return { ...prev, [selectedDate]: Array.from(frozenForDate) };
    });
    setSelectedSlotsForFreeze([]);
  };

  const unfreezeSelectedSlots = () => {
    setFrozenSlots((prev) => {
      const frozenForDate = new Set(prev[selectedDate] || []);
      selectedSlotsForFreeze.forEach((s) => frozenForDate.delete(s));
      return { ...prev, [selectedDate]: Array.from(frozenForDate) };
    });
    setSelectedSlotsForFreeze([]);
  };

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ marginTop: "-2%" }}>
        <h1 className="h4 mb-3">Slot Availability Calendar</h1>
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div className="card">
              <div className="card-body">
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="slotDate" className="form-label">
                      Select Date
                    </label>
                    <input
                      type="date"
                      id="slotDate"
                      className="form-control"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="duration" className="form-label">
                      Duration
                    </label>
                    <select
                      id="duration"
                      className="form-select"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="60">1 Hour</option>
                    </select>
                  </div>
                </div>

                <div className="mb-2">
                  <button
                    className={`btn btn-sm ${
                      isDayFrozen ? "btn-danger" : "btn-outline-danger"
                    }`}
                    type="button"
                    onClick={toggleDayFreeze}
                    title={isDayFrozen ? "Unfreeze Entire Day" : "Freeze Entire Day"}
                  >
                    {isDayFrozen ? "Unfreeze Entire Day" : "Freeze Entire Day"}
                  </button>
                </div>

                <hr />
                <label className="form-label d-flex justify-content-between align-items-center mb-2">
                  <span>Select slots to Freeze or Unfreeze</span>
                  <span className="small text-muted">
                    Red = Booked, Blue = Frozen, Green = Available
                  </span>
                </label>
                <div className="d-flex flex-wrap gap-2 mt-2" id="slots">
                  {allSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSlotFrozen = isDayFrozen || frozenForDate.includes(slot);
                    return (
                      <div
                        key={slot}
                        className="d-flex align-items-center"
                        style={{
                          border: isBooked
                            ? "1px solid #db0318"
                            : isSlotFrozen
                            ? "1px solid #0d6efd"
                            : "1px solid #198754",
                          background: isBooked
                            ? "#d81633"
                            : isSlotFrozen
                            ? "#0d6efd"
                            : "#15c160",
                          color: "#fff",
                          borderRadius: "6px",
                          cursor: isBooked || isDayFrozen ? "not-allowed" : "pointer",
                          padding: "5px 10px",
                          marginRight: "8px",
                          marginBottom: "8px",
                          opacity: isBooked ? 0.7 : 1,
                        }}
                        title={
                          isBooked
                            ? "Already booked"
                            : isSlotFrozen
                            ? "Frozen (not bookable)"
                            : "Available for booking"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={selectedSlotsForFreeze.includes(slot)}
                          disabled={isBooked || isDayFrozen}
                          onChange={() => toggleSelectSlot(slot)}
                          className="me-2"
                        />
                        <span>{slot}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={freezeSelectedSlots}
                    disabled={selectedSlotsForFreeze.length === 0}
                    title="Freeze selected slots"
                  >
                    Freeze Selected Slots
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={unfreezeSelectedSlots}
                    disabled={selectedSlotsForFreeze.length === 0}
                    title="Unfreeze selected slots"
                  >
                    Unfreeze Selected Slots
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="col-12 col-lg-5">
            <div className="card">
              <div className="card-body">
                <h2 className="h6 text-muted">Summary</h2>
                <ul className="list-unstyled small mb-3">
                  <li>
                    <strong>Turf:</strong>{" "}
                    <span id="sumTurf">Green Field Arena</span>
                  </li>
                  <li>
                    <strong>Date:</strong> <span id="sumDate">{selectedDate}</span>
                  </li>
                  <li>
                    <strong>Booked Slots:</strong>{" "}
                    <span id="sumBooked">{bookedSlots.length}</span>
                  </li>
                  <li>
                    <strong>Available Slots:</strong>{" "}
                    <span id="sumAvailable">{allSlots.length - bookedSlots.length}</span>
                  </li>
                  <li>
                    <strong>Frozen Slots:</strong>{" "}
                    <span id="sumFrozen">{frozenForDate.join(", ") || "None"}</span>
                  </li>
                </ul>
                <div className="text-muted small">
                  Note: Red slots are already booked; Blue slots are frozen by
                  owner; Green slots are available.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default OwnerSlotBooking;
 