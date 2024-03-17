import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import TourDetails from "./../pages/TourDetails";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import About from "./../pages/About";
import Room from "./../pages/Room";
import Food from "./../pages/Food";
import MenuFood from "./../pages/MenuFood";
import Post from "./../pages/Post";
import BookingHistory from "../pages/BookingHistory";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Profile from "../pages/Profile";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/room/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/food" element={<Food />} />
      <Route path="/menufood" element={<MenuFood />} />
      <Route path="/bookinghistory" element={<BookingHistory />} />
      <Route path="/allroom" element={<Room />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tour/search" element={<SearchResultList />} />
      <Route path="/login/roll-selection" />
    </Routes>
  );
};

export default Routers;