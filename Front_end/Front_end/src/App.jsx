import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/protectedRoute";

import Home from "./pages/home";
import Login from "./pages/login.jsx";
import Register from "./pages/register";

import DonorDashboard from "./pages/donor/donorDashboard";
import BookDonation from "./pages/donor/bookDonation";
import DonationHistory from "./pages/donor/donationHistory";

import HospitalDashboard from "./pages/hospital/hospitalDashboard";
import BloodRequest from "./pages/hospital/bloodRequest";

import BloodBankDashboard from "./pages/bloodbank/bloodbankDashboard";
import Inventory from "./pages/bloodbank/inventory";

import AdminDashboard from "./pages/admin/adminDashboard";

export default function App() {
  const location = useLocation();
const hideLayout = [
  "/login",
  "/register",
  "/donor/dashboard",
].includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
{!hideLayout && <Navbar />}
       <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Donor */}
          <Route
            path="/donor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor/book"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <BookDonation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor/history"
            element={
              <ProtectedRoute allowedRoles={["donor"]}>
                <DonationHistory />
              </ProtectedRoute>
            }
          />

          {/* Hospital */}
          <Route
            path="/hospital/dashboard"
            element={
              <ProtectedRoute allowedRoles={["hospital"]}>
                <HospitalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/request"
            element={
              <ProtectedRoute allowedRoles={["hospital"]}>
                <BloodRequest />
              </ProtectedRoute>
            }
          />

          {/* Blood bank */}
          <Route
            path="/bloodbank/dashboard"
            element={
              <ProtectedRoute allowedRoles={["bloodbank"]}>
                <BloodBankDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bloodbank/inventory"
            element={
              <ProtectedRoute allowedRoles={["bloodbank"]}>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}
