import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Places from "../pages/Places";
import TourDetails from "./../pages/TourDetails";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import About from "./../pages/About";
import Food from "./../pages/Food";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/places" element={<Places />} />
      <Route path="/room/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/food" element={<Food />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tour/search" element={<SearchResultList />} />
      <Route path="/login/roll-selection" />
    </Routes>
  );
};

export default Routers;