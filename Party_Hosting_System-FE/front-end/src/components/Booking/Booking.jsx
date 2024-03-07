import React, { useState } from "react";
import "./booking.css";

import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import Payment from "../../pages/Payment";

const Booking = ({ room, avgRating }) => {
  const { price, reviews } = room;

  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [credentials, setCredentials] = useState({
    userId: "01", //later it will be dynamic
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    // Recalculate total amount whenever guest size changes
    if (id === "guestSize") {
      calculateTotalAmount();
    }
  };

  const serviceFee = 10;

  const calculateTotalAmount = () => {
    const calculatedTotalAmount =
      Number(price) * Number(credentials.guestSize) + Number(serviceFee);
    setTotalAmount(calculatedTotalAmount);
  };

  // send data to the server
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ======== booking form ========= */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ======== booking end  ========= */}

      {/* ======== booking bottom  ========= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {price} <i class="ri-close-line"></i> 1 person
            </h5>
            <span>{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
            Booking Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
