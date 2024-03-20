import React, { useState } from "react";
import "./booking.css";

import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import Payment from "../../pages/Payment";

const Booking = ({ room, avgRating }) => {
  const { price, reviews } = room;
  const isLoggedIn = !!sessionStorage.getItem("authToken");

  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [credentials, setCredentials] = useState({
    userId: sessionStorage.getItem("userId"), //later it will be dynamic
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  const today = new Date().toISOString().split("T")[0];

  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [bookAt, setBookAt] = useState("");
  const parseDate = (dateStr) => {
    // Split the date and time parts
    const [datePart, timePart] = dateStr.split(', ');
  
    // Split the date into day, month, and year
    const [day, month, year] = datePart.split('/');
  
    // Combine the year, month, day, and time into the desired format
    const result = `${year}-${month}-${day}T${timePart}`;
  
    return result;
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
    // Recalculate total amount whenever guest size changes
    // if (id === "guestSize") {
    //   calculateTotalAmount();
    // }
    calculateTotalAmount();
  };

  const serviceFee = 10000;

  const calculateTotalAmount = () => {
    const calculatedTotalAmount = Number(price) + Number(serviceFee);
    setTotalAmount(calculatedTotalAmount);
  };
  const handleChangeTime = (e) => {
    setShowTimeInputs(true);
  };

  // send data to the server
  const handleClick = (e) => {
    e.preventDefault();
    if (!bookAt || !timeStart || !timeEnd) {
      alert("Please select both start and end times.");
      return;
    }

    const start = new Date(`${bookAt}T${timeStart}`);
    const end = new Date(`${bookAt}T${timeEnd}`);
    // const start = new Date(timeStart);
    // const end = new Date(timeEnd);

    if (isNaN(start) || isNaN(end)) {
      alert("Invalid date or time. Please try again.");
      return;
    }

    if (
      start.getHours() < 8 ||
      start.getHours() > 22 ||
      end.getHours() < 8 ||
      end.getHours() > 22
    ) {
      alert("Please select a time between 8 AM and 10 PM.");
      return;
    }
    const timeStartStr = start.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const timeEndStr = end.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  
    const startDate = parseDate(timeStartStr);
    const endDate = parseDate(timeEndStr);

    console.log(start, end);
    const timeBooking = {
      timeStart: startDate,
      timeEnd: endDate,
    };

    if (start.getTime() > end.getTime()) {
      alert("Start time cannot be later than end time.");
      return;
    }

    setShowTimeInputs(true);
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/food", { state: { credentials: credentials, room: room ,timeBooking: timeBooking} });
    console.log(credentials);
    console.log(room);
    console.log(timeBooking)
  };
  const [showTimeInputs, setShowTimeInputs] = useState(false);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          {price} VND
          <span>/ per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ======== booking form ========= */}
      <div className="booking__form">
        <h5>Booking Date</h5>
        {/* <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            
          </FormGroup>
        </Form> */}
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              min={today}
              id="bookAt"
              onChange={(e) => {
                setBookAt(e.target.value);
                handleChangeTime();
              }}
              required
            />
          </FormGroup>
          <FormGroup>
            {showTimeInputs && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <h5>Time Start:</h5>
                  <input
                    type="time"
                    onChange={(e) => setTimeStart(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <h5>Time End:</h5>
                  <input
                    type="time"
                    onChange={(e) => setTimeEnd(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <br />
            <p>
              * If the number of people booking exceeds {room.capacity} people,
              the receptionist will charge an additional fee
            </p>
          </FormGroup>
        </Form>
      </div>
      {/* ======== booking end  ========= */}

      {/* ======== booking bottom  ========= */}
      <div className="booking__bottom">
        <ListGroup>
          {/* <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              {price} <i class="ri-close-line"></i> 1 person
            </h5>
            <span>{price}</span>
          </ListGroupItem> */}
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>{totalAmount} VND</span>
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
