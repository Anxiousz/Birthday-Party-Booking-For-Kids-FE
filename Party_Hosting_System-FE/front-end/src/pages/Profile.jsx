import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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

  const url =
    "https://partyhostingsystem.azurewebsites.net/api/v1/RegisteredUser/2";
    useEffect(() => {
        fetchProfileData(); // Fetch profile data when component mounts
      }, []);
  const fetchProfileData = async () => {
    try {
        const id = location.pathname.split("/").pop();
      const response = await fetch(
        `https://partyhostingsystem.azurewebsites.net/api/v1/RegisteredUser/${id}`
        // `https://partyhostingsystem.azurewebsites.net/api/v1/RegisteredUser/2`
        , {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + authToken
            },
            }
      );
      // Fetch profile data
      if (!response.ok) {
        console.log("sd")
      }
      const data = await response.json();
      if (data.birthDay) {
        const date = new Date(data.birthDay);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 based index
        const day = ('0' + date.getDate()).slice(-2);
        data.birthDay = `${year}-${month}-${day}`;
      }

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
    axios
      .put("/api/user", user) // Adjust this URL to your API
      .then(() => navigate("/")) // Redirect to home page
      .catch((error) => console.error(`Error: ${error}`));
  };
  if (loading) {
    return <div>Loading...</div>; // Render loading text while data is being fetched
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="userName">Username</Label>
        <Input
          type="text"
          name="userName"
          id="userName"
          value={user.userName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthDay">Birthday</Label>
        <Input
          type="date"
          name="birthDay"
          id="birthDay"
          value={user.birthDay}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          value={user.phone}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="gender">Gender</Label>
        <Input
          type="select"
          name="gender"
          id="gender"
          value={user.gender}
          onChange={handleChange}
        >
          <option value="0">Male</option>
          <option value="1">Female</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
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
  );
};

export default Profile;
