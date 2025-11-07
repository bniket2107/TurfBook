import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const OwnerEditTurf = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || user.role !== "owner") navigate("/login");
  }, [user, navigate]);

  const searchParams = new URLSearchParams(location.search);
  const turfId = searchParams.get("tid");
  const turfNameQuery = searchParams.get("tname") || "";
  const turfPriceQuery = searchParams.get("price") || "";

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [turfSize, setTurfSize] = useState("");
  const [facilities, setFacilities] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  // NEW fields to match your HTML exactly
  const [discount, setDiscount] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [morningPrice, setMorningPrice] = useState("");
  const [afternoonPrice, setAfternoonPrice] = useState("");
  const [eveningPrice, setEveningPrice] = useState("");

  useEffect(() => {
    if (turfId) {
      setName(turfNameQuery);
      setPrice(turfPriceQuery);
      // Could fetch more if needed
    }
  }, [turfId, turfNameQuery, turfPriceQuery]);

  const handlePhotosChange = (e) => setPhotos([...e.target.files]);
  const handleVideosChange = (e) => setVideos([...e.target.files]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !turfSize) {
      alert("Please fill required fields.");
      return;
    }
    // Add further validation if desired
    alert("Turf details saved successfully!");
    navigate("/owner-dashboard");
  };

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ maxWidth: "820px", marginTop: "-2%" }}>
        <h1 className="h4 mb-3">Turf Details</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Turf Name */}
                <div className="col-12 col-md-8">
                  <label className="form-label">Turf Name</label>
                  <input
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Base Price */}
                <div className="col-6 col-md-4">
                  <label className="form-label">Base Price / hour (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* Turf Size */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Turf Size</label>
                  <select
                    className="form-select"
                    required
                    value={turfSize}
                    onChange={(e) => setTurfSize(e.target.value)}
                  >
                    <option value="">Select size</option>
                    <option value="Small">Small (5000–10000 sq.ft)</option>
                    <option value="Medium">Medium (10000–15000 sq.ft)</option>
                    <option value="Large">Large (15000–20000 sq.ft)</option>
                  </select>
                </div>

                {/* Discount (NEW) */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="100"
                    placeholder="e.g. 10"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <div className="form-text">Enter discount percentage (0–100%).</div>
                </div>

                {/* Slot Timings (NEW) */}
                <div className="col-12">
                  <label className="form-label">Available Slot Timings</label>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-6">
                      <label className="form-label">Start Time</label>
                      <input
                        type="time"
                        className="form-control"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        className="form-control"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-text">
                    Example: Open from <strong>06:00 AM</strong> to <strong>10:00 PM</strong>.
                  </div>
                </div>

                {/* Time-Based Slot Prices (NEW) */}
                <div className="col-12">
                  <label className="form-label">Set Time-Based Slot Prices</label>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Morning (6 AM – 12 PM)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g. 800"
                        value={morningPrice}
                        onChange={(e) => setMorningPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Afternoon (12 PM – 4 PM)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g. 600"
                        value={afternoonPrice}
                        onChange={(e) => setAfternoonPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Evening (4 PM – 10 PM)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="e.g. 1000"
                        value={eveningPrice}
                        onChange={(e) => setEveningPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-text">Leave blank to use base price for all slots.</div>
                </div>

                {/* Facilities */}
                <div className="col-12">
                  <label className="form-label">Facilities (comma-separated)</label>
                  <input
                    className="form-control"
                    placeholder="Parking, Floodlights, Washroom"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                  />
                </div>

                {/* Google Map URL */}
                <div className="col-12">
                  <label className="form-label">Google Map URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                  />
                </div>

                {/* Photos */}
                <div className="col-12">
                  <label className="form-label">Photos</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handlePhotosChange}
                  />
                </div>

                {/* Videos */}
                <div className="col-12">
                  <label className="form-label">Promo Videos (optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="video/*"
                    onChange={handleVideosChange}
                  />
                  <div className="form-text">
                    Upload up to <strong>3</strong> clips (each <strong>10–30s</strong>, total ≤ <strong>100 MB</strong>).
                  </div>
                </div>
              </div>

              <div className="d-grid mt-3">
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default OwnerEditTurf;
