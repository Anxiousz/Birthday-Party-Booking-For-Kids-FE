import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Alert,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
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
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };
  const option = [
    { value: "RegisteredUser", label: "User" },
    { value: "PartyHost", label: "Host" },
    { value: "Staff", label: "Staff" },
    { value: "Admin", label: "Admin" },
  ];

  const postData = (selectedOption) => {
    const apiUrl = "https://partyhostingsystems.azurewebsites.net/api/v1/Login/";
    const endpoint = selectedOption.value;
    axios
      .post(apiUrl + endpoint, credentials)
      .then((res) => {
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("userId", res.data.id);
        sessionStorage.setItem("role", option.value);
        console.log(res.data);
        setShowAlert(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_BAD_REQUEST") {
          alert("Please check your email, password or role again!");
        }
      });
  };
  // <Alert className="alert_login">
  //   <h4 className="alert-heading">Login successfully</h4>
  //   <p>
  //     Welcome to Party Hosting System. You have successfully logged in.
  //     Please enjoy your time here.
  //   </p>
  //   <hr />
  // </Alert>
  return (
    <section>
      {showAlert && (
        <div className="toast-container">
          <Toast>
            <ToastHeader icon="success">Login Successfully!</ToastHeader>
            <ToastBody>
              Welcome to <strong>Party Hosting System</strong> . <br />
            </ToastBody>
            <ToastBody>You have successfully logged in. <br /></ToastBody>
            <ToastBody>Please enjoy your time here.</ToastBody>
          </Toast>
        </div>
      )}
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
                  <Select
                    className="option"
                    options={option}
                    onChange={setSelectedOption}
                    defaultValue={option[0]}
                    /* cái này là bảng dropdown để chọn roll*/
                  ></Select>
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
