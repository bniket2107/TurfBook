import React from "react";
import { useNavigate } from "react-router-dom";

const turfs = [
  { id: 1, name: "Green Field Arena", location: "Andheri, Mumbai", price: 800 },
  { id: 2, name: "Pro Arena", location: "Kothrud, Pune", price: 1200 },
];

const TurfList = () => {
  const navigate = useNavigate();

  const handleSelectTurf = (turfId) => {
    navigate(`/slot-booking/${turfId}`);
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Available Turfs</h1>
      <div className="row g-4">
        {turfs.map((turf) => (
          <div className="col-12 col-md-6" key={turf.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{turf.name}</h5>
                <p>{turf.location}</p>
                <p>Price: ₹{turf.price}/hr</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelectTurf(turf.id)}
                >
                  Select Date & Time
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfList;
