import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const RegisterCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent double-click spam
    if (isLoading) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      fullName: name,
      email: email,
      password: password,
      phoneNumber: phone,
    };

    setIsLoading(true);

    // optional: timeout after 10s so it doesn't hang forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds

    try {
      const response = await fetch("/api/users/register/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        alert("Registration Successful!");
        window.location.href = "/login";
        return;
      }

      // handle error body (could be plain text or JSON)
      let message = "Registration failed.";

      const text = await response.text();
      if (text) {
        try {
          const json = JSON.parse(text);
          // our GlobalExceptionHandler returns { status, error, message, timestamp }
          if (json.message) {
            message = json.message;
          } else {
            message = text;
          }
        } catch {
          message = text;
        }
      }

      alert(message);
    } catch (error) {
      if (error.name === "AbortError") {
        alert("Server is taking too long. Please try again.");
      } else {
        alert("Network / server error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="container py-5"
        style={{ maxWidth: "560px", position: "absolute", bottom: "2%", left: "30%" }}
      >
        <h1 className="h4 mb-4 mt-5 text-center">Create your account</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center small mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </main>
      {/* <Footer />  // uncomment if you actually want the footer here */}
    </>
  );
};

export default RegisterCustomer;
