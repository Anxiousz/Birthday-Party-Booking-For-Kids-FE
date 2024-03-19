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
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const [editModal, setEditModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [foodForm, setFoodForm] = useState({
    foodName: "",
    description: "",
    price: undefined,
    image: "",
    partyHostId: sessionStorage.getItem("userId")
      ? sessionStorage.getItem("userId")
      : null,
  });
  const [foodForm2, setFoodForm2] = useState({
    foodName: "",
    description: "",
    price: undefined,
    image: "",
    partyHostId: sessionStorage.getItem("userId")
      ? sessionStorage.getItem("userId")
      : null,
    foodOrderId: undefined,
  });
  const toggleEditModal = () => {
    setEditModal(!editModal);
  };
  const [unmountOnClose, setUnmountOnClose] = useState(false);
  const { className } = props;
  const [modal, setModal] = useState(false);
  const [backdrop] = useState("static");
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
  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setFoodForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(foodForm);
  };
  const handleEdit = (e) => {
    const { id, name, value } = e.target;

    setFoodForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(foodForm);
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
        console.log(data);
        // console.log(foodData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [authToken, userId]);
  const addFood = async () => {
    try {
      const response = await axios.post(
        "https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/CreateMenuPartyHost",
        foodForm,
        config
      );
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteFood = async (foodOrderId) => {
    try {
      const response = await axios.delete(
        `https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/DeleteV2/${foodOrderId}`,
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
  const updateFood = async (foodOrderId) => {
    try {
      setFoodForm2((prev) => ({ ...prev, foodOrderId: foodOrderId }));
      const response = await axios.post(
        `https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/UpdateMenuPartyHostV2`,
        foodForm2,
        config
      );
      if (response.status === 200) {
        console.log(response);
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

      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <Button color="success" onClick={toggle}>
            Add new food
          </Button>{" "}
          <br /> <br />
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
              <Label for="foodName">Food name</Label>
              <Input
                placeholder="Food name"
                id="foodName"
                onChange={handleChange}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
            <FormGroup>
              <Label for="description">Descriptions</Label>
              <Input
                placeholder="Details of food"
                id="description"
                onChange={handleChange}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                min={"1"}
                max={400}
                id="price"
                onChange={handleChange}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                placeholder="Input your Url here"
                id="image"
                onChange={handleChange}
              />
              <FormFeedback valid>Sweet! that name is available</FormFeedback>
              {/* <FormText>Example help text that remains unchanged.</FormText> */}
            </FormGroup>

            {/* <Input
              type="text"
              placeholder="Write something (data should remain in modal if unmountOnClose is set to false)"
              rows={5}
            /> */}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggle();
                addFood();
              }}
            >
              Add
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
            <Col
              key={food.foodOrderId}
              sm="6"
              md="4"
              lg="3"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
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
                      <Button color="warning" onClick={toggleEditModal}>
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => deleteFood(food.foodOrderId)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </div>
                  <Modal isOpen={editModal} toggle={toggleEditModal}>
                    <ModalBody>
                      <FormGroup>
                        <Label for="foodName">Food name</Label>
                        <Input
                          placeholder="Food name"
                          id="foodName"
                          value={food.foodName}
                          onChange={handleChange}
                        />
                        <FormFeedback valid>
                          Sweet! that name is available
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="description">Descriptions</Label>
                        <Input
                          placeholder="Details of food"
                          id="description"
                          value={food.description}
                          onChange={handleChange}
                        />
                        <FormFeedback valid>
                          Sweet! that name is available
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                          type="number"
                          min={"1"}
                          max={400}
                          id="price"
                          value={food.price}
                          onChange={handleChange}
                        />
                        <FormFeedback valid>
                          Sweet! that name is available
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="image">Image</Label>
                        <Input
                          placeholder="Input your Url here"
                          id="image"
                          value={food.image}
                          onChange={handleChange}
                        />
                        <FormFeedback valid>
                          Sweet! that name is available
                        </FormFeedback>
                      </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => {updateFood(food.foodOrderId); toggleEditModal()}}>
                        Save
                      </Button>{" "}
                      <Button color="secondary" onClick={toggleEditModal}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
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
