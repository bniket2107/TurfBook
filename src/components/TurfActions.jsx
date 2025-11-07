import React from "react";
import { useNavigate } from "react-router-dom";

// Props: turfId, turfName, turfPrice
const TurfActions = ({ turfId, turfName, turfPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-start align-items-center mt-2 gap-2">
      <button
        className="btn btn-sm btn-primary"
        onClick={() =>
          navigate(`/owner-edit-turf?tid=${turfId}&tname=${encodeURIComponent(turfName)}&price=${turfPrice}`)
        }
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
        onClick={() => navigate(`/owner-slot-booking?tid=${turfId}`)}
      >
        Slot Booking
      </button>
    </div>
  );
};

export default TurfActions;
