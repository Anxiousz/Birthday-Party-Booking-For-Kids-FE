import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  FormGroup,
  Label,
  FormFeedback,
  FormText,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../shared/card";
import "../styles/payment.css"

const PaymentPage = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   // Format card information
  //   if (name === "number") {
  //     value = formatCreditCardNumber(value);
  //   } else if (name === "expiry") {
  //     value = formatExpirationDate(value);
  //   } else if (name === "cvc") {
  //     value = formatCVC(value);
  //   }

  const navigate = useNavigate();

  // ... rest of your component code
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have finished payment!");
    navigate("/payment");
  };

  return (
    <div className="container mt-5">
      <Card className="credit_card_card">
        <CardBody>
          <CardTitle tag="h5">Payment Information</CardTitle>
          <CardText>
            Please enter your customer and card details to complete the payment.
          </CardText>

          {/* Customer Information */}
          <div className="mb-3">
            <FormGroup>
              <Label for="fullname">Full name:</Label> <br />
              <Input
                id="fullname"
                name="fullname"
                placeholder="with a placeholder"
                type="text"
              />{" "}
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                id="email"
                name="email"
                placeholder="with a placeholder"
                type="email"
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
          </div>
          <div key="Payment">
            <div className="App-payment">
              <h4>please input your Credit card information</h4>
              <Card
                number={cardInfo.number}
                name={cardInfo.name}
                expiry={cardInfo.expiry}
                cvc={cardInfo.cvc}
              />
              <form onSubmit={handleSubmit}>
                <Input type="hidden" name="issuer" value={cardInfo.issuer} />
                <FormGroup></FormGroup>
                <FormGroup className="payment-radio">
                  <input name="gateway" type="radio" value="test_gateway" />
                  <label htmlFor="test_gateway">Test Gateway</label> 
                  <input name="gateway" type="radio" value="stripe" />
                  <label htmlFor="stripe">Credit Card</label>
                  <input name="gateway" type="radio" value="paypal" />
                  <label htmlFor="paypal">PayPal</label>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="number"
                    type="number"
                    label="Credit Card Number"
                    placeholder="0000111100001111"
                  />
                  <Input
                    className="card_name"
                    type="number"
                    max="99999"
                    label="Credit Card Name"
                    placeholder="Card Name"
                  />
                </FormGroup>
                <FormGroup className="card_info">
                  <Row>
                    <Col xs="3" className="col_MY">
                      <Input
                        name="month"
                        type="month"
                        label="month"
                        placeholder="MM"
                      />
                    </Col>
                    <Col xs="3" className="col_CVC">
                      <Input
                        width={3}
                        name="cvc"
                        type="number"
                        label="CVC"
                        placeholder="123"
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </div>
          </div>

          <Button color="primary" onClick={handleSubmit}>
            Submit Payment
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentPage;
