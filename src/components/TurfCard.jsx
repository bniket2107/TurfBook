import React from "react";
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => (
  <div className="col">
    <div className="card h-100 card-hover position-relative">
      <Link to={`/turf-details/${turf.id}`} className="ratio ratio-16x9">
        <img className="w-100 h-100 rounded-top" style={{ objectFit: "cover" }} src={turf.photo} alt={turf.name} />
      </Link>
      <div className="card-body">
        <h5 className="card-title mb-1">{turf.name}</h5>
        <p className="text-muted small mb-2">{turf.area}, {turf.city}</p>
        <div className="d-flex justify-content-between mb-2">
          <span className="badge text-bg-secondary">₹{turf.price}/hr</span>
          <span className="badge text-bg-success">{turf.rating} ★</span>
        </div>
        <Link className="btn btn-sm btn-primary w-100" to={`/turf-details/${turf.id}`}>View Details</Link>
      </div>
    </div>
  </div>
);

export default TurfCard;
