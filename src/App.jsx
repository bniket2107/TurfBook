import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";  // Import AuthProvider
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import RegisterCustomer from "./pages/RegisterCustomer.jsx";
import TurfDetails from "./components/TurfDetails.jsx";
import RegisterOwner from "./pages/RegisterOwner.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import SlotBooking from "./pages/SlotBooking.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import OwnerSlotBooking from "./pages/OwnerSlotBookings.jsx";

import OwnerAddTurf from "./pages/OwnerAddTurf.jsx";
import OwnerEditTurf from "./pages/OwnerEditTurf.jsx";
import CustomerHistory from "./components/CustomerHistory.jsx";
import AdminOwners from "./pages/AdminOwners.jsx";
import OwnerPaymentDetails from "./pages/OwnerPaymentDetails.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/turf-details" element={<TurfDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/book-slot" element={<SlotBooking />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-slot-booking" element={<OwnerSlotBooking />} />
          <Route path="/owner-add-turf" element={<OwnerAddTurf />} />
          <Route path="/owner-edit-turf" element={<OwnerEditTurf />} />
                    <Route path="/customer-history" element={<CustomerHistory />} />
          <Route path="/admin-owner" element={<AdminOwners />}></Route>
                    <Route path="/owner-details" element={<OwnerPaymentDetails />}></Route>



        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
