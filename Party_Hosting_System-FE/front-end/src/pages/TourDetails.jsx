import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap"; // Import Container, Row, Col from reactstrap
import Newsletter from "../shared/Newsletter"; // Import Newsletter component
import "../styles/tour-details.css";
import Booking from "../components/Booking/Booking";

const TourDetails = () => {
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    fetchRoomData();
    // console.log('checkdataroom', roomData);
  }, []);
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
  const fetchRoomData = async () => {
    try {
      const roomId = location.pathname.split("/").pop(); // Extract roomId from URL
      const response = await fetch(
        `https://partyhostingsystems.azurewebsites.net/roomID?id=${roomId}`
      );
            if (!response.ok) {
        throw new Error("Failed to fetch room details");
      }
      const data = await response.json();
      console.log(data)
      setRoomData(data); // Assuming the API returns an array with a single object
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  if (!roomData) {
    return <div>Loading...</div>;
  }
  return (
    roomData && (
      <>
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={roomData.image} alt="" />
                </div>
                <div className="tour__info">
                  <h2>{roomData.roomName}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span>
                      <i class="ri-map-pin-user-fill"></i>
                      {roomData.location}
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span className="time-details">
                      <i class="ri-map-pin-2-line"></i>
                      <strong>Time Start:</strong>{" "}
                      {formatTime(roomData.timeStart)}
                    </span>
                    <span>
                      {" "}
                      <i class="ri-money-dollar-circle-line"></i>
                      {roomData.price} VND / per day
                    </span>
                    <span>
                      <i class="ri-group-line"></i>
                      {roomData.capacity} people
                    </span>
                  </div>
                  <div className="tour__extra-details">
                    <span className="time-details">
                      <i class="ri-map-pin-2-line"></i>
                      <strong>Time End:</strong> {formatTime(roomData.timeEnd)}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{roomData.note}</p>
                </div>
              </Col>
              <Col lg="4">
                <Booking room={roomData} />
              </Col>
            </Row>
          </Container>
        </section>
        <Newsletter />
      </>
    )
    
  );
};
export default TourDetails;
