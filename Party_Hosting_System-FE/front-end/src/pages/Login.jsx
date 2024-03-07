import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import Select from "react-select";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
  const option = [
    { value: "user", label: "User" },
    { value: "host", label: "Host" },
    { value: "staff", label: "Staff"},
    { value: "admin", label: "Admin"}
  ];


  const postData = (selectedOption) => {
    switch (selectedOption.value) {
      case "user":
        axios.post("https://partyhostingsystem.azurewebsites.net/api/v1/Login/RegisteredUser", credentials)
          .then((res) => {
            localStorage.setItem('authToken', res.data.token);
            console.log(res.data.token);
            navigate('/home');
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "host":
        axios.post("https://partyhostingsystem.azurewebsites.net/api/v1/Login/PartyHost", credentials)
          .then((res) => {
            localStorage.setItem('authToken', res.data.token);
            console.log(res.data.token);
            navigate('/home');
            
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "admin":
        axios.post("https://partyhostingsystem.azurewebsites.net/api/v1/Login/Admin", credentials)
          .then((res) => {
            localStorage.setItem('authToken', res.data.token);
            console.log(res.data.token);
            navigate('/home');
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "staff":
        axios.post("https://partyhostingsystem.azurewebsites.net/api/v1/Login/Staff", credentials)
          .then((res) => {
            localStorage.setItem('authToken', res.data.token);
            console.log(res.data.token);
            navigate('/home');
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        break;
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Select className="option" options={option} onChange={setSelectedOption} 
                  /* cái này là bảng dropdown để chọn roll*/></Select>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    onClick={() => postData(selectedOption)}
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Forgot password? <Link to="/forgot-password">Reset</Link>
                </p>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p> 
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Login;
