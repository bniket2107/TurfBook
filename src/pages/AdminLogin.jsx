import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AUTH_KEY = "tb_user";

// Utility function to set user data in localStorage
function setUser(u) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(u));
}

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Mimic successful login
    setUser({ email, name: email.split("@")[0], role: "admin" });

    // Store token for login status
    localStorage.setItem("token", "sample-token");

    // Redirect to admin dashboard
    window.location.href = "/admin-owner";
  };

  // Forgot password function
  const handleForgotPassword = (e) => {
    e.preventDefault();
    const emailPrompt = prompt("Please enter your email address to reset the password:");
    if (emailPrompt) {
      alert(`If the email exists, a reset link will be sent to ${emailPrompt}`);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container py-5"
        style={{ maxWidth: "520px", position: "absolute", top: "1%", left: "35%" }}
      >
        <h1 className="h4 mt-5 mb-4 text-center">Admin Login</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email</label>
                <input
                  id="loginEmail"
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input
                  id="loginPassword"
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {/* Forgot password inside the card */}
              <div className="text-end mb-3">
                <button className="btn btn-link p-0 small" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>

              {/* Shorter login button (not full-width, small) */}
              <div className="text-end">
                <button className="btn btn-primary btn-sm px-4" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
