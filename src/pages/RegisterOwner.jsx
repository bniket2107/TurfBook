import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterOwner = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [tournamentPrice, setTournamentPrice] = useState(""); // optional
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [turfName, setTurfName] = useState("");
  const [turfImages, setTurfImages] = useState(null);
  const [turfSize, setTurfSize] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState("");

  const [cityOptions, setCityOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const stateCityMap = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Solapur", "Kolhapur", "Jalgaon", "Dhule", "Palghar", "Thane", "Ahamednagar", "Amravati", "Latur", "Satara", "Sangli", "Beed", "Chandrapur", "Yavatmal", "Jalna", "Nanded", "Parbhani", "Dharashiv"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
    Delhi: ["Delhi"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Bikaner"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Punjab: ["Chandigarh", "Amritsar", "Jalandhar", "Ludhiana", "Patiala"],
    Haryana: ["Gurugram", "Faridabad", "Ambala", "Karnal"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  };

  useEffect(() => {
    const stateSelect = document.getElementById("state");
    const listener = (e) => {
      const selectedState = e.target.value;
      setState(selectedState);
      setCityOptions(stateCityMap[selectedState] || []);
      setCity("");
    };
    stateSelect.addEventListener("change", listener);
    return () => stateSelect.removeEventListener("change", listener);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (turfImages && turfImages.length > 1) {
      alert("You can upload only 1 image.");
      return;
    }
    if (turfImages && turfImages.length === 1) {
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (turfImages[0].size > maxSize) {
        alert("Image size must be less than 5 MB.");
        return;
      }
    }

    const formData = new FormData();
    const dto = {
      ownerName: name,
      contactNo: phone,
      email,
      password,
      turfName,
      turfSize,
      locationUrl: mapUrl,
      state,
      city,
      area,
      address,
      pricePerHour: pricePerHour ? Number(pricePerHour) : null,
      discount: null,
      tournamentSlotPrice: tournamentPrice === "" ? null : Number(tournamentPrice),
    };
    formData.append("data", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (turfImages && turfImages.length === 1) {
      formData.append("image", turfImages[0]);
    }

    try {
      const res = await fetch("/api/owners/register", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Registration failed.");
      }
      setShowModal(true);
      // reset
      setName(""); setPhone(""); setEmail(""); setPricePerHour("");
      setTournamentPrice("");
      setPassword(""); setConfirmPassword("");
      setTurfName(""); setTurfImages(null); setTurfSize("");
      setState(""); setCity(""); setArea(""); setAddress(""); setMapUrl("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOkClick = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white border-0 pt-4 pb-0">
                <h1 className="h4 text-center mb-4">Register as Turf Owner</h1>
              </div>

              <div className="card-body pt-0">
                <form onSubmit={handleSubmit}>
                  {/* Owner Information */}
                  <h6 className="text-uppercase text-muted mb-3">Owner Information</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <div className="input-group">
                        <span className="input-group-text">+91</span>
                        <input id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Password</label>
                      <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Confirm Password</label>
                      <input id="confirmPassword" type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                  </div>

                  {/* Turf Details */}
                  <h6 className="text-uppercase text-muted mb-3">Turf Details</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Turf Name</label>
                      <input id="turfName" className="form-control" value={turfName} onChange={(e) => setTurfName(e.target.value)} required />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Turf Size</label>
                      <select id="turfSize" className="form-select" value={turfSize} onChange={(e) => setTurfSize(e.target.value)} required>
                        <option value="">Select size</option>
                        <option value="Small">Small (5000–10000 sq.ft)</option>
                        <option value="Medium">Medium (10000–15000 sq.ft)</option>
                        <option value="Large">Large (15000–20000 sq.ft)</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Upload Turf Image</label>
                      <input
                        id="turfImages"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setTurfImages(e.target.files)}
                        required
                      />
                      <div className="form-text">Upload 1 image up to 5MB.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Google Map URL</label>
                      <input id="mapUrl" type="url" className="form-control" value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} />
                    </div>
                  </div>

                  {/* Location */}
                  <h6 className="text-uppercase text-muted mb-3">Location</h6>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <select id="state" className="form-select" value={state} onChange={(e) => setState(e.target.value)} required>
                        <option value="">Select State</option>
                        {Object.keys(stateCityMap).map((stateKey) => (
                          <option key={stateKey} value={stateKey}>{stateKey}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">City</label>
                      <select id="city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option value="">Select City</option>
                        {cityOptions.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Area</label>
                      <input id="area" className="form-control" value={area} onChange={(e) => setArea(e.target.value)} required />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Exact Location / Address</label>
                      <textarea id="address" className="form-control" rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                  </div>

                  {/* Pricing */}
                  <h6 className="text-uppercase text-muted mb-3">Pricing</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Price per hour</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          id="pricePerHour"
                          type="number"
                          className="form-control"
                          value={pricePerHour}
                          onChange={(e) => setPricePerHour(e.target.value)}
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Tournament Price / hour (optional)</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          id="tournamentPrice"
                          type="number"
                          className="form-control"
                          value={tournamentPrice}
                          onChange={(e) => setTournamentPrice(e.target.value)}
                          min="0"
                          step="0.01"
                          placeholder="e.g. 1500"
                        />
                      </div>
                      <div className="form-text">Leave blank to disable tournament slot booking.</div>
                    </div>
                  </div>

                  <div className="alert alert-info mt-4 small">
                    Your profile will be verified by Admin before access.
                  </div>

                  <div className="d-grid mt-2">
                    <button className="btn btn-primary" type="submit">Register</button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center small mt-3 mb-0">
              Already registered? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal id="confirmationModal" show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title><h5>Registration Submitted</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your profile will be verified by Admin before access.</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" id="okButton" onClick={handleOkClick}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterOwner;