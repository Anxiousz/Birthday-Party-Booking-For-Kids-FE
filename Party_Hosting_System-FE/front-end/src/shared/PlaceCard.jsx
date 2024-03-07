import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./place-card.css";

const TourCard = ({ tour }) => {
  const {
    roomId,
    roomName,
    capacity,
    timeStart,
    timeEnd,
    location,
    price,
    image,
    status,
  } = tour;

  const navigate = useNavigate();

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}, ${day}/${month}/${year}`;
  };

  // Function to handle onClick event
  const handleLinkClick = () => {
    fetch(
      `https://partyhostingsystem.azurewebsites.net/api/v1/Room/GetRoomPartyHost/${roomId}`
    )
      .then((response) => response.json())
      .then((roomData) => {
        // Navigate to TourDetails with room data
        navigate.push({
          pathname: `/room/${roomId}`,
          state: { roomData }, // Pass room data as state
        });
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={image} alt="tour-img" />
          {status === 1 ? <span>Available</span> : <span>Not Available</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {location}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/room/${roomId}`} onClick={handleLinkClick}>
              {roomName}
            </Link>
          </h5>
          <h5 className="tour__title">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-team-line"></i>
              {capacity}
            </span>
          </h5>
          <h5 className="tour__title">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-time-line"></i>
              Time Start: {formatTime(timeStart)}
            </span>
          </h5>
          <h5 className="tour__title">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-time-line"></i>
              Time End: {formatTime(timeEnd)}
            </span>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {price} VND
              <span> /per day</span>
            </h5>
            {status === 1 && (
              <button className="btn booking__btn">
<Link to={`/room/${roomId}`}>Book Now</Link>
              </button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;