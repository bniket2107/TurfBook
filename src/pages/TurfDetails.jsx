// src/components/TurfDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // adjust the import as needed

const dummyTurfs = [
  {
    id: "1",
    name: "My Turf",
    location: "Andheri, Mumbai",
    price: 800,
    rating: 4.5,
    images: [
      "/assets/img/myturf.jpg",
      "/assets/img/myturf2.jpg",
      "/assets/img/myturf3.jpg",
    ],
    facilities: ["Parking", "Floodlights", "Changing Rooms"],
    reviews: [
      "Great turf! Well maintained.",
      "Friendly staff and good lighting for night games.",
    ],
    mapUrl: "https://www.google.com/maps?q=Andheri+Mumbai"
  },
  // Add more turfs as needed
];

const TurfDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // Get turf id from URL (assuming ?tid=1 style)
  const params = new URLSearchParams(location.search);
  const turfId = params.get("tid") || "1";

  const [turf, setTurf] = useState(dummyTurfs[0]);

  useEffect(() => {
    const found = dummyTurfs.find(t => t.id === turfId);
    setTurf(found || dummyTurfs[0]);
  }, [turfId]);

  // Booking redirect handler
  const handleBookSlot = () => {
    if (!user || !user.token) {
      navigate(`/login?redirect=/book-slot?tid=${turf.id}`);
    } else {
      navigate(`/book-slot?tid=${turf.id}`);
    }
  };

  return (
    <main className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Browse</a></li>
          <li className="breadcrumb-item active" aria-current="page">Turf Details</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          {/* Carousel */}
          <div id="turfCarousel" className="carousel slide mb-3">
            <div className="carousel-inner">
              {turf.images.map((img, idx) => (
                <div key={idx} className={`carousel-item${idx === 0 ? " active" : ""}`}>
                  <img src={img} className="d-block w-100" alt={`Turf photo ${idx + 1}`} />
                </div>
              ))}
            </div>
            {turf.images.length > 1 && (
              <>
                <button className="carousel-control-prev" type="button" data-bs-target="#turfCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#turfCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>
              </>
            )}
          </div>

          <h2 className="h3">{turf.name}</h2>
          <p className="text-muted mb-2">{turf.location}</p>
          <div className="mb-3">
            <span className="badge text-bg-success me-2">{turf.rating} ★</span>
            <span className="badge text-bg-secondary">₹{turf.price}/hour</span>
          </div>

          <h3 className="h5">Facilities</h3>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {turf.facilities.map((f, idx) => (
              <span key={idx} className="badge text-bg-light border">{f}</span>
            ))}
          </div>

          <h3 className="h5">Reviews</h3>
          <div className="vstack gap-3">
            {turf.reviews.length === 0
              ? <p className="text-muted small">No reviews yet.</p>
              : turf.reviews.map((rev, idx) => (
                  <div key={idx} className="card p-2 shadow-sm">{rev}</div>
                ))
            }
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card">
            <div className="card-body">
              <h4 className="h6 text-muted mb-3">Book a Slot</h4>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleBookSlot}>
                  Select Date & Time
                </button>
                <a className="btn btn-outline-secondary" target="_blank" rel="noreferrer" href={turf.mapUrl}>
                  View on Map
                </a>
              </div>
            </div>
          </div>
          <div className="alert alert-info mt-3 small">
            You can cancel or reschedule before the slot start, as per policy.
          </div>
        </div>
      </div>
    </main>
  );
};

export default TurfDetails;
