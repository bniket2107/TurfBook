import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const stateCityMap = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Solapur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
};

const OwnerAddTurf = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "owner") navigate("/login");
  }, [user, navigate]);

  const [turfName, setTurfName] = useState("");
  const [turfImage, setTurfImage] = useState(null);
  const [pricePerHour, setPricePerHour] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCityOptions(state ? stateCityMap[state] || [] : []);
    setCity("");
  }, [state]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 1) {
      alert("You can upload only 1 image.");
      return;
    }
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }
    setTurfImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!turfName || !pricePerHour || !state || !city || !area || !address || !turfImage) {
      alert("Please fill all required fields and upload one image.");
      return;
    }
    setShowModal(true); // Simulate success
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/owner-dashboard");
  };

  return (
    <>
      <Navbar />
      <main className="container py-5" style={{ maxWidth: "720px", marginTop:"-4%"}}>
        <h1 className="h4 mt-3 mb-4 text-center">Add Turf</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Turf Name</label>
                  <input className="form-control" required value={turfName} onChange={e=>setTurfName(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="form-label">Upload Turf Image</label>
                  <input type="file" className="form-control" accept="image/*" required onChange={handleImageChange} />
                  <small className="text-muted">You can upload only 1 image up to 5 MB.</small>
                </div>
                <div className="col-6">
                  <label className="form-label">Price per Hour (₹)</label>
                  <input type="number" className="form-control" min="0" required value={pricePerHour} onChange={e=>setPricePerHour(e.target.value)} />
                </div>
                <div className="col-4">
                  <label className="form-label">State</label>
                  <select className="form-select" required value={state} onChange={e=>setState(e.target.value)}>
                    <option value="">Select State</option>
                    {Object.keys(stateCityMap).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">City</label>
                  <select className="form-select" required value={city} onChange={e=>setCity(e.target.value)} disabled={!cityOptions.length}>
                    <option value="">Select City</option>
                    {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">Area</label>
                  <input className="form-control" required value={area} onChange={e=>setArea(e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label">Exact Location / Address</label>
                  <textarea className="form-control" rows="2" required value={address} onChange={e=>setAddress(e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label">Google Map URL</label>
                  <input type="url" className="form-control" value={mapUrl} onChange={e=>setMapUrl(e.target.value)} />
                </div>
              </div>
              <div className="alert alert-info mt-3 small">Your profile will be verified by Admin before access.</div>
              <div className="d-grid mt-3">
                <button className="btn btn-primary" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
        <Modal show={showModal} onHide={handleModalClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your profile will be verified by Admin before access.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleModalClose}>OK</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </>
  );
};

export default OwnerAddTurf;
