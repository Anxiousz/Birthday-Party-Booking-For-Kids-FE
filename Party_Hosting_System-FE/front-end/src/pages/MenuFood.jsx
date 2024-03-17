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
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  Modal,
  FormGroup,
  ButtonGroup,
  FormFeedback,
  FormText,
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MenuFood = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const [unmountOnClose, setUnmountOnClose] = useState(false);
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [backdrop] = useState("static");
  const [keyboard, setKeyboard] = useState(true);
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  // config to fetch api
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  const foodUrl = `https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/PartyHostId?partyHostid=${userId}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(foodUrl, config);
        if (!response.ok) {
          throw new Error("Failed to fetch food details");
        }
        const data = await response.json();
        setFoodData(data);
        // console.log(foodData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [authToken, userId]);

  const changeKeyboard = (e) => {
    setKeyboard(e.currentTarget.checked);
  };
  const deleteFood = async (foodOrderId) => {
    try {
      const response = await axios.delete(
        `https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/Delete/${foodOrderId}`,
        config
      );
      if (response.status === 200) {
        const newFoodData = foodData.filter(
          (food) => food.foodOrderId !== foodOrderId
        );
        setFoodData(newFoodData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div>
        <h1
          className="title"
          style={{ textAlign: "center", margin: "20px 0 80px " }}
        >
          Your Food list
        </h1>
      </div>
      <br />
      <br /> <br />
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <Button color="success" onClick={toggle}>
            Add new food
          </Button>
        </Form>
        <Modal
          isOpen={modal}
          toggle={toggle}
          className={className}
          backdrop={backdrop}
          unmountOnClose={unmountOnClose}
        >
          <ModalHeader toggle={toggle}>Add food data</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Food name</Label>
              <Input  />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}

            </FormGroup>

            <Input
              type="text"
              placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
              rows={5}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Row>
        {foodData.map((food) => {
          return (
            <Col key={food.foodOrderId} sm="6" md="4" lg="3">
              <Card>
                <CardImg
                  top
                  height="250px"
                  width="310px"
                  src={food.image}
                  alt={food.foodName}
                />
                <CardBody style={{ height: "230px" }}>
                  <CardTitle tag="h5">{food.foodName}</CardTitle>
                  <CardText>{food.description}</CardText>
                  <CardText>Price: {food.price}</CardText>
                  <div>
                    <ButtonGroup>
                      <Button color="warning">Edit</Button>
                      <Button
                        color="danger"
                        onClick={() => deleteFood(food.foodOrderId)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MenuFood;
