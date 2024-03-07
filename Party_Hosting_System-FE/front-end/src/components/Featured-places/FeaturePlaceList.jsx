import React, { useState, useEffect } from "react";
import PlaceData from "../../assets/data/tour";
import { Col } from "reactstrap";
import TourCard from "../../shared/PlaceCard";
export const FeatureTourList = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    fetchTourData();
  }, []);

  const fetchTourData = async () => {
    try {
      const response = await fetch(
        "https://partyhostingsystem.azurewebsites.net/api/v1/Room/GetAllRoom"
      );
      const data = await response.json();
      setTourData(data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  return (
    <>
      {tourData.map((room) => (
        <Col lg="4" className="mb-4" key={room.id}>
          <TourCard tour={room} />
        </Col>
      ))}
    </>
  );
};
