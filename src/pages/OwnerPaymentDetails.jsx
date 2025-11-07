import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OwnerPaymentDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [paymentGateway, setPaymentGateway] = useState("Razorpay"); // example options
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "owner") {
    navigate("/login");
  }

  // Example validate inputs
  const validateForm = () => {
    if (!paymentGateway) return "Please select a payment gateway.";
    if (!accountName.trim()) return "Account Name is required.";
    if (!accountNumber.trim()) return "Account Number is required.";
    if (!ifscCode.trim()) return "IFSC Code is required.";
    if (!mobileNumber.trim()) return "Mobile Number is required.";
    if (!upiId.trim()) return "UPI ID is required.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }
    setError("");
    // TODO: send this payment info to backend API
    setSuccess("Payment details saved successfully!");
  };

  return (
    
    <main className="container
    " style={{ maxWidth: 600 }}>
      <h1 className="">Owner Payment Details</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="paymentGateway" className="form-label">Payment Gateway</label>
          <select
            id="paymentGateway"
            className="form-select"
            value={paymentGateway}
            onChange={(e) => setPaymentGateway(e.target.value)}
          >
            <option value="Razorpay">Razorpay</option>
            <option value="Paytm">Paytm</option>
            <option value="GooglePay">Google Pay</option>
            <option value="PhonePe">PhonePe</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="accountName" className="form-label">Account Name</label>
          <input
            id="accountName"
            type="text"
            className="form-control"
            placeholder="Name on bank account"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">Account Number</label>
          <input
            id="accountNumber"
            type="text"
            className="form-control"
            placeholder="Bank account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
          <input
            id="ifscCode"
            type="text"
            className="form-control"
            placeholder="Bank IFSC code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
          <input
            id="mobileNumber"
            type="tel"
            className="form-control"
            placeholder="Mobile number linked to payment"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="upiId" className="form-label">UPI ID</label>
          <input
            id="upiId"
            type="text"
            className="form-control"
            placeholder="e.g., yourname@bank"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Payment Details
        </button>
      </form>
    </main>
 
  );
};

export default OwnerPaymentDetails;
