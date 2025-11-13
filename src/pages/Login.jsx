import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect URL from query params or fallback to null
  const params = new URLSearchParams(location.search);
  const redirectUrl = params.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Perform actual auth call here in production...

    // Mimic successful login by updating context state
    login({
      token: "sample-token",
      role,
      email
    });

    // Navigate to redirect URL if set, else role-based navigation
    if (redirectUrl) {
      navigate(redirectUrl);
    } else if (role === "customer") {
      navigate("/");
    } else if (role === "owner") {
      navigate("/owner-dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container py-5"
        style={{ maxWidth: "520px", position: "absolute", top: "1%", left: "35%" }}
      >
        <h1 className="h4 mt-5 mb-4 text-center">Login</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              {/* form fields here */}
<div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Email
                </label>
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

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
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

              <div className="mb-3">
                <label htmlFor="loginRole" className="form-label">
                  Login as
                </label>
                <select
                  id="loginRole"
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="customer">Player</option>
                  <option value="owner">Owner</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* rest of your login page as is */}
<div className="d-grid mt-3">
          <button
            className="btn btn-link"
            onClick={() => {
              const emailPrompt = prompt(
                "Please enter your email address to reset the password:"
              );
              if (emailPrompt) {
                alert(`If the email exists, a reset link will be sent to ${emailPrompt}`);
              }
            }}
          >
            Forgot Password?
          </button>
        </div>

        <p className="text-center small mt-3">
          New here?{" "}
          <a href="/register-customer" className="text-primary">
            Register as Customer
          </a>{" "}
          or{" "}
          <a href="/register-owner" className="text-primary">
            Register as Owner
          </a>
        </p>
      </div>
    </>
  );
};
export default Login;
