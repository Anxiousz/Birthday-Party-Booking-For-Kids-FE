import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Places from "../pages/Places";
import Posts from "../pages/Post";
import TourDetails from "./../pages/TourDetails";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Reset from "../pages/Reset";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/places" element={<Places />} />
      <Route path="/places/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tour/search" element={<SearchResultList />} />
      <Route path="/login/roll-selection" /* chờ roll-selection bên Page xong sẽ thêm element */ /> 
    </Routes>
  );
};

export default Routers;
