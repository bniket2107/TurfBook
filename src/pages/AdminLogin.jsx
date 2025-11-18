import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AUTH_KEY = "tb_user";

// Save logged-in user to localStorage
function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  // -----------------------------------------------------------
  // LOGIN
  // -----------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8088/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Try JSON → fallback to text
      let result;
      try {
        result = await response.json();
      } catch {
        result = await response.text();
      }

      if (!response.ok) {
        alert(result || "Invalid credentials");
        return;
      }

      // Store user + token
      setUser({ email: result.email, role: result.role });
      localStorage.setItem("token", result.token);

      // Redirect
      window.location.href = "/admin-owner";

    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  // -----------------------------------------------------------
  // SEND OTP
  // -----------------------------------------------------------
  const handleForgotPassword = async () => {
    if (!email) return alert("Enter your email first");
    if (otpSent) return alert("OTP already sent. Check your email.");

    try {
      const response = await fetch("http://localhost:8088/api/admin/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.text();
      alert(result);

      if (response.ok) {
        setOtpSent(true);
        setShowResetForm(true);
      }

    } catch (err) {
      console.error(err);
      alert("Error sending OTP.");
    }
  };

  // -----------------------------------------------------------
  // RESET PASSWORD
  // -----------------------------------------------------------
  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      return alert("Please enter OTP and new password");
    }

    try {
      const response = await fetch("http://localhost:8088/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const result = await response.text();

      if (!response.ok) {
        alert(result || "Failed to reset password");
        return;
      }

      alert("Password reset successful! Please login.");
      setOtp("");
      setNewPassword("");
      setOtpSent(false);
      setShowResetForm(false);

    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    }
  };

  // -----------------------------------------------------------
  // UI
  // -----------------------------------------------------------
  return (
    <>
      <Navbar />

      <div
        className="container py-5"
        style={{
          maxWidth: "520px",
          position: "absolute",
          top: "1%",
          left: "35%",
        }}
      >
        <h1 className="h4 mt-5 mb-4 text-center">Admin Login</h1>

        <div className="card shadow-sm">
          <div className="card-body">

            {/* ================= LOGIN FORM ================= */}
            {!showResetForm && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="adminEmail" className="form-label">Email</label>
                  <input
                    id="adminEmail"
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="adminPassword" className="form-label">Password</label>
                  <input
                    id="adminPassword"
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </div>

                <div className="text-end mb-3">
                  <button
                    type="button"
                    className="btn btn-link p-0 small"
                    onClick={handleForgotPassword}
                    disabled={otpSent}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary btn-sm px-4" type="submit">
                    Login
                  </button>
                </div>
              </form>
            )}

            {/* ================= RESET PASSWORD FORM ================= */}
            {showResetForm && (
              <div>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">OTP</label>
                  <input
                    id="otp"
                    type="text"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="text-end">
                  <button className="btn btn-success btn-sm px-4" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
