import React, { useState, useEffect } from "react";
import PlaceData from "../../assets/data/tour";
import { Col } from "reactstrap";
import RoomCard from "../../shared/PlaceCard";
import { useNavigate } from "react-router-dom";
export const FeatureTourList = () => {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await fetch(
        "https://partyhostingsystem.azurewebsites.net/api/v1/Room/GetAllRoom"
      );
      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  return (
    <>
      {roomData.slice(0, 6).map((room) => (
      <Col lg="4" className="mb-4" key={room.id}>
        <RoomCard room={room} />
      </Col>
    ))}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button className="btn booking__btn" onClick={() => navigate('/allroom')}>View More</button>
    </div>
    </>
  );
};
