import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { setUser } from "../utils/auth.js";

const RegisterCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Mimic registration success
    setUser({ name, email, role: "customer" });
    alert("Registration Successful!");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <main className="container py-5" style={{ maxWidth: "560px", position: "absolute", bottom: "2%", left: "30%" }}>
        <h1 className="h4 mb-4 mt-5 text-center">Create your account</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" value={name} onChange={e=>setName(e.target.value)} required/>
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
                </div>
                <div className="col-12">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" value={phone} onChange={e=>setPhone(e.target.value)} required/>
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required/>
                  
                </div>
                <div className="col-12">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required/>
                </div>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-primary" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center small mt-3">Already have an account? <a href="/login">Login</a></p>
      </main>
      </>
  );
};

export default RegisterCustomer;
