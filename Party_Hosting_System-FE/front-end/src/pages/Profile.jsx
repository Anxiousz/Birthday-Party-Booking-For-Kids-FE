import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Spinner,Row,Col } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/profile.css";
const Profile = () => {
  //   const [user, setUser] = useState({
  //     accountId: "",
  //     email: "",
  //     userName: "",
  //     password: "",
  //     birthDay: "",
  //     phone: "",
  //     gender: "",
  //     address: "",
  //   });
  const [user, setUser] = useState(null);
  const authToken = sessionStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState(false);
  
 const config = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };
  const url =
    "https://partyhostingsystems.azurewebsites.net/api/v1/RegisteredUser/2";
  useEffect(() => {
    fetchProfileData(); // Fetch profile data when component mounts
  }, []);
  const fetchProfileData = async () => {
    try {
      const id = location.pathname.split("/").pop();
      const response = await fetch(
        `https://partyhostingsystems.azurewebsites.net/api/v1/RegisteredUser/${id}`,
        // `https://partyhostingsystems.azurewebsites.net/api/v1/RegisteredUser/2`
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      // Fetch profile data
      if (!response.ok) {
        console.log("sd");
      }
      const data = await response.json();

      if (data.birthDay) {
        const date = new Date(data.birthDay);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based index
        const day = ("0" + date.getDate()).slice(-2);
        data.birthDay = `${year}-${month}-${day}`;
      }
      // if (data.birthDay) {
      //   const date = new Date(data.birthDay);
      //   const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
      //   data.birthDay = date.toLocaleString('en-US', options).replace(/,/g, '').replace(/ /g, ' ');
      // }
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();



     // Update user data
    const res = axios.put("https://partyhostingsystems.azurewebsites.net/api/v1/RegisteredUser", user, config)  // pass data
      .then((res) =>      {
        if (!res.ok) {
          console.log("sd");
          setIsSubmitting(true);
        }
        console.log(res);
        navigate(`/profile/${user.accountId}`);
    
    
    }) // Refesh page after updating user data
      .catch((error) => console.error(`Error: ${error}`));
  };
  if (loading) {
    return <Spinner className="loading_screen">
    Loading...
  </Spinner>; // Render loading text while data is being fetched
  }
  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit} className="profile-form">
        <FormGroup>
          <Label for="userName">
            <h4>Username </h4>           
          </Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">
            <h4></h4> Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password"><h4></h4>Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="birthDay"><h4></h4>Birthday</Label>
          <Input
            type="date"
            name="birthDay"
            id="birthDay"
            max={
              new Date(new Date().setDate(new Date().getDate() - 1))
                .toISOString()
                .split("T")[0]
            }
            value={user.birthDay}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone"><h4></h4>Phone</Label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gender"><h4></h4>Gender</Label>         
          <Row>
                  <Col xs="auto">
                    <Button
                      value="female"
                      color="primary"
                      name="gender"
                      outline
                      onClick={handleChange}
                      active={user.gender === "female"}
                    >
                      Female
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      value="male"
                      color="primary"
                      name="gender"
                      outline
                      onClick={handleChange}
                      active={user.gender === "male"}
                    >
                      Male
                    </Button>
                  </Col>
                </Row>
        </FormGroup>
        <FormGroup>
          <Label for="address"><h4></h4>Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            value={user.address}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default Profile;
