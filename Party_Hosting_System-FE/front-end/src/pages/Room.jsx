import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import TourCard from "../shared/PlaceCard";

const Room = () => {
  const itemsPerPage = 8;
  const [roomData, setRoomData] = useState([]);
  const [page, setPage] = useState(0);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchRoomData = async () => {
    try {
      const response = await fetch(
        "https://partyhostingsystems.azurewebsites.net/api/v1/Room/GetAllRoomAdmin"
      );
      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [page]);
  const fetchRoomData2 = async () => {
    try {
      const response = await fetch(
        "https://partyhostingsystems.azurewebsites.net/api/v1/Room/GetAllRoomAdmin"
      );
      const data = await response.json();
      setRoomData(data);
    } catch (error) {
      console.error("Error fetching tour data:", error);
    }
  };

  return (
    < >
      <Container style={{marginTop:'30px'}}>
        <Row>
          {roomData.slice(startIndex, endIndex).map((room) => (
            <Col lg="3" className="mb-4" key={room.id}>
              <TourCard room={room} />
            </Col>
          ))}
          <Col lg="12">
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(Math.ceil(roomData.length / itemsPerPage)).keys()].map(
                (number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                )
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Room;
