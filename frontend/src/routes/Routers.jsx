import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Doctors from "../pages/doctors/Doctors";
import DoctorDetails from "../pages/doctors/DoctorDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Myaccount from "../dasboard/user-account/Myaccount";
import Dashboard from "../dasboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { useLocation } from "react-router-dom";
const Routers = () => {
  const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <Myaccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
