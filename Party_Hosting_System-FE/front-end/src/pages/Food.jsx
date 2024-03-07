import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
export default function Food() {
  const [id, setId] = useState("");
  const [foodData, setFoodData] = useState([]);
  const authToken = localStorage.getItem("authToken");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`https://partyhostingsystem.azurewebsites.net/api/v1/MenuPartyHost/GetOneFood/${id}`);
  //       const data = response.data; // Update to access the response data correctly
  //       setData(data[0]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const fetchFoodData = async () => {
    try {
      const res = await axios.get(
        `https://partyhostingsystem.azurewebsites.net/api/v1/MenuPartyHost/GetOneFood/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res.data);
      const data = res.data;

      setFoodData(data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  return (
    <Container>
      <input
        type="number"
        value={id}
        onChange={handleIdChange}
        placeholder="Enter ID"
      />
      <button onClick={fetchFoodData}>Search</button> <br />
      <Row>
        <Col lg="8">
          <div className="tour__content">
            <h1>{foodData.foodOrderId}</h1>
          </div>
          <div className="tour__info">
            <h2>{foodData.foodName}</h2>
            <div className="d-flex align-items-center gap-5">
              <span>
                <i class="ri-map-pin-user-fill"></i>
                {foodData.price}
              </span>
            </div>
            <div className="tour__extra-details">
              <img src={foodData.image} alt="" />
            </div>
            <h5>Description</h5>
            <p>{foodData.description}</p>
          </div>
        </Col>
        <Col lg="4"></Col>
      </Row>
    </Container>
  );
}
