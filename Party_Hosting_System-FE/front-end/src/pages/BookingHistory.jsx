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
  Input,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);
  const toggle3 = () => setModal3(!modal3);
  const [bookingData, setBookingData] = useState([]);
  const [backdrop] = useState("static");
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const urlBooking = `https://partyhostingsystems.azurewebsites.net/api/v1/Transaction/ViewTransaction?id=${userId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBooking, config);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        console.log(response);
        setBookingData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(bookingData);
  }, [urlBooking]);

  return (
    <Container>
      <Row>
        {bookingData.map((booking) => (
          <Col key={booking.bookingId} sm="12" md="6" lg="4" xl="3"></Col>
        ))}
      </Row>
      <Table className="table-form">
        <thead>
          <tr>
            <th>No.</th>
            <th>Room</th>
            <th>Menu Order</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking, index) => (
            <React.Fragment key={booking.bookingId}>
              <tr
                className="table-secondary"
                key={booking.bookingId}
                sm="12"
                md="6"
                lg="4"
                xl="3"
              >
                <td>{index + 1}</td>
                <td><Button color="link" onClick={toggle2}>
    {booking.room.roomName}
  </Button></td>
                <td>
                  {" "}
                  <Button color="info" onClick={toggle}>
                    {" "}
                    List Food{" "}
                  </Button>{" "}
                </td>
                <td>
                  {booking.transaction.payment.paymentStatus === 0
                    ? "Fail"
                    : "Success"}
                </td>
                <td><Button color="link" onClick={toggle3}>
    {booking.transaction.payment.paymentStatus === 0 ? 'Fail' : 'Success'}
  </Button></td>
              </tr>
              {/* table for List Food  */}
              <div>
                <Modal isOpen={modal} toggle={toggle} backdrop={backdrop}>
                  <ModalHeader toggle={toggle}>
                    List of Food had order
                  </ModalHeader>
                  <ModalBody>
                    Food name: {booking.menuOrder.foodName} <br />
                    Quantity: {booking.menuOrder.quantity} <br />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                      Back
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              {/* table for Room  */}

              <div>
                <Modal isOpen={modal2} toggle={toggle2} backdrop={backdrop}>
                  <ModalHeader toggle={toggle2}>Room Details</ModalHeader>
                  <ModalBody>
                    <div className="room_img_table">
                        <img src={booking.room.image} alt={booking.room.roomName} style={{ width: '400px', height: '250px' }}/>
                       <br />
                    </div>
                    Room name: {booking.room.roomName} <br />
                    Room Type: {booking.room.roomType} <br />
                    Capacity: {booking.room.capacity} <br />
                    Price: {booking.room.price} <br />
                    Location: {booking.room.location} <br />                
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle2}>
                      Back
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              {/* table for Payment  */}
              <div>
                <Modal isOpen={modal3} toggle={toggle3} backdrop={backdrop}>
                  <ModalHeader toggle={toggle3}>
                    List of Food had order
                  </ModalHeader>
                  <ModalBody>
                    Payment Method: {booking.transaction.payment.paymentMethod}{" "}
                    <br />
                    Amount: {booking.transaction.payment.amount} <br />
                    Payment Status:{" "}
                    {booking.transaction.payment.paymentStatus === 0
                      ? "Payment Cancel"
                      : "Payment Success"}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggle3}>
                      Back
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingHistory;
