import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";  // Import Navbar component
import { setUser } from "../utils/auth";   // Import utility for handling user registration
import { Modal } from "react-bootstrap";   // For Bootstrap modal
import { useNavigate } from "react-router-dom"; // For navigation

const RegisterOwner = () => {
  // Form data state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
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

  // State for city options based on selected state
  const [cityOptions, setCityOptions] = useState([]);
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  // Use navigate from react-router-dom to redirect to home page
  const navigate = useNavigate();

  // State-City mapping
  const stateCityMap = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Solapur", "Kolhapur", "Jalgaon", "Dhule", "Palghar", "Thane", "Ahamednagar", "Amravati", "Latur", "Satara", "Sangli", "Beed", "Chandrapur", "Yavatmal", "Jalna", "Nanded", "Parbhani", "Dharashiv"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli"],
    "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
    "Delhi": ["Delhi"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Bikaner"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Punjab": ["Chandigarh", "Amritsar", "Jalandhar", "Ludhiana", "Patiala"],
    "Haryana": ["Gurugram", "Faridabad", "Ambala", "Karnal"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  };

  // Initialize state dropdown and handle state selection
  useEffect(() => {
    const stateSelect = document.getElementById("state");
    stateSelect.addEventListener("change", (e) => {
      const selectedState = e.target.value;
      setState(selectedState);
      setCityOptions(stateCityMap[selectedState] || []);
      setCity(""); // Reset city selection
    });
  }, []);

  // Handle password visibility toggle
  const togglePasswordVisibility = (inputId, toggleId) => {
    const field = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    toggle.addEventListener("click", () => {
      const type = field.type === "password" ? "text" : "password";
      field.type = type;
      toggle.querySelector("i").classList.toggle("fa-eye-slash");
    });
  };

  // Handle form submission
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

    // Simulate successful registration
    const r = { success: true };

    // Show modal on success
    setShowModal(true); // Show modal

    // Reset the form data after submission (optional)
    setName("");
    setPhone("");
    setEmail("");
    setPricePerHour("");
    setPassword("");
    setConfirmPassword("");
    setTurfName("");
    setTurfImages(null);
    setTurfSize("");
    setState("");
    setCity("");
    setArea("");
    setAddress("");
    setMapUrl("");
  };

  // Initialize password visibility toggles
  useEffect(() => {
    togglePasswordVisibility("password", "togglePassword");
    togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");
  }, []);

  // Handle Modal "OK" button click to redirect to home
  const handleOkClick = () => { 
    setShowModal(false); // Close the modal
    navigate("/"); // Redirect to home page
  };

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "740px", position: "absolute", left: "26%", top: "1%" }}
>
        <h1 className="h4 mt-3 mb-4 text-center">Register as Turf Owner</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Contact Number</label>
                  <input
                    id="phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Price per Hour */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Price per hour (₹)</label>
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

                {/* Password */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      id="togglePassword"
                      className="input-group-text password-toggle"
                    >
                      <i className="fa fa-eye"></i>
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <input
                      id="confirmPassword"
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span
                      id="toggleConfirmPassword"
                      className="input-group-text password-toggle"
                    >
                      <i className="fa fa-eye"></i>
                    </span>
                  </div>
                </div>

                {/* Turf Name */}
                <div className="col-4 col-md-4">
                  <label className="form-label">Turf Name</label>
                  <input
                    id="turfName"
                    className="form-control"
                    value={turfName}
                    onChange={(e) => setTurfName(e.target.value)}
                    required
                  />
                </div>

                {/* Turf Image Upload */}
                <div className="col-4">
                  <label className="form-label">Upload Turf Image</label>
                  <input
                    id="turfImages"
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => setTurfImages(e.target.files)}
                    required
                  />
                  <small className="text-muted">Upload 1 image up to 5MB.</small>
                </div>

                {/* Turf Size */}
                <div className="col-4 col-md-4">
                  <label className="form-label">Turf Size</label>
                  <select
                    id="turfSize"
                    className="form-select"
                    value={turfSize}
                    onChange={(e) => setTurfSize(e.target.value)}
                    required
                  >
                    <option value="">Select size</option>
                    <option value="Small">Small (5000–10000 sq.ft)</option>
                    <option value="Medium">Medium (10000–15000 sq.ft)</option>
                    <option value="Large">Large (15000–20000 sq.ft)</option>
                  </select>
                </div>

                {/* State and City */}
                <div className="col-4">
                  <label className="form-label">State</label>
                  <select
                    id="state"
                    className="form-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option value="">Select State</option>
                    {/* Dynamically populate states */}
                    {Object.keys(stateCityMap).map((stateKey) => (
                      <option key={stateKey} value={stateKey}>
                        {stateKey}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-4">
                  <label className="form-label">City</label>
                  <select
                    id="city"
                    className="form-select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  >
                    <option value="">Select City</option>
                    {cityOptions.map((cityOption, idx) => (
                      <option key={idx} value={cityOption}>
                        {cityOption}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area */}
                <div className="col-4 col-md-4">
                  <label className="form-label">Area</label>
                  <input
                    id="area"
                    className="form-control"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required
                  />
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label">Exact Location / Address</label>
                  <textarea
                    id="address"
                    className="form-control"
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                {/* Google Map URL */}
                <div className="col-12">
                  <label className="form-label">Google Map URL</label>
                  <input
                    id="mapUrl"
                    type="url"
                    className="form-control"
                    value={mapUrl}
                    onChange={(e) => setMapUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="alert alert-info mt-3 small">
                Your profile will be verified by Admin before access.
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center small mt-2">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>

      {/* Confirmation Modal */}
      <Modal
        id="confirmationModal"
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        
          <Modal.Header closeButton>
            <Modal.Title><h5>Registration Submitted</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your profile will be verified by Admin before access.</p></Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary"
              id="okButton"
              onClick={handleOkClick}
            >
              OK
            </button>
          </Modal.Footer>
        
      </Modal>
    </>
  );
};

export default RegisterOwner;
