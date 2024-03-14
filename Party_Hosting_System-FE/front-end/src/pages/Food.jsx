import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/food.css";
export default function Food() {
  const [id, setId] = useState("");
  const [foodData, setFoodData] = useState([]);
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const location = useLocation();
  const { credentials, room } = location.state || {};
  const [paymentData, setPaymentData] = useState({
    userId: userId,
    roomId: String(room.roomId),
    menuOrderID: undefined,
  });
  const navigate = useNavigate();
  const urlPayment = "https://partyhostingsystem.azurewebsites.net/create-payment-link"
  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const res = await axios
      //   .get(`https://partyhostingsystem.azurewebsites.net/api/v1/MenuPartyHost/PartyHostId?partyHostid=${room.partyHostId}`
      //   , {
      //     headers: {
      //       Authorization: `Bearer ${authToken}`,
      //     },
      //   });
      //   console.log(res.data[0]);
      //   const data = res.data[0]; // Update to access the response data correctly
      //   setFoodData(data);
      // } catch (error) {
      //   console.error(error);
      // }
      try {
        const response = await fetch(
          `https://partyhostingsystem.azurewebsites.net/api/v1/MenuPartyHost/PartyHostId?partyHostid=${room.partyHostId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch room details");
        }
        const data = await response.json();
        // console.log("data before input", data);
        setFoodData(data); // Assuming the API returns an array with a single object
        console.log(foodData);
        // console.log(paymentData[0]);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchData();
  }, []);


  const goToPayment = () => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    axios.post(urlPayment, paymentData, config)
    .then((res) => {
      console.log(res.data);
      // navigate(res.data);
      window.location.href = res.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  };
  const fetchFoodData = async () => {
    try {
      const res = await axios.post(
        urlPayment, paymentData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching food details:", error);
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  return (
    <Container>
      <h1 className="foodList_title">Food Combo List</h1>
      <Row>
        {foodData.map((item, index) => (
          <Col sm="4" key={index} className="custom-col">
            <div className="food__card">
              <Card>
                <div className="food__img">
                  <img src={item.image} alt="food-img" />
                </div>

                <CardBody>
                  <h2 className="food__title">{item.foodName}</h2>
                  <h5 className="food__title">
                    <span className="food__location d-flex align-items-center gap-1">
                      {item.description}
                    </span>
                  </h5>
                  <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                    <h5>{item.price} VND</h5>
                    <button className="btn booking__btn" onClick={() => {
                    setPaymentData(prev => ({
                      ...prev,
                      menuOrderID: String(item.foodOrderId)
                    }));
                  }}>Add</button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <Button className="btn goToPayment" onClick={goToPayment}>
        Go to Payment
      </Button>
    </Container>
  );
}
