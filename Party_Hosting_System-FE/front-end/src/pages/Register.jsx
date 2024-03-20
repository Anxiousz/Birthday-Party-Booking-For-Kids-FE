import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Modal,
  ButtonGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Input, Label } from "reactstrap";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";
// import sendErrorcode from "../shared/error-code";

const Register = () => {
  // Define the state
  const [rSelected, setRSelected] = useState(1);
  // const [credentials, setCredentials] = useState({
  //   userName: undefined,
  //   email: undefined,
  //   password: undefined,
  // });
  const toggle = () => setEditModal(!editModal);
  const [editModal, setEditModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    staffId: "5",
    packageId: "1",
    userName: undefined,
    email: undefined,
    password: undefined,
    birthDay: undefined,
    phone: undefined,
    address: undefined,
    gender: undefined,
  });
  const handleChange = (e) => {
    const { id, name, value } = e.target;

    // if (name === 'password') {
    //   const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //   if (!value.match(passwordValidation)) {
    //     alert('Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, and 1 number');
    //     return;
    //   }
    // }
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(data);
  };
  //From đăng kí  account
  const navigate = useNavigate();
  const url =
    rSelected === 1
      ? "https://partyhostingsystems.azurewebsites.net/api/v1/Register/RegisteredUser"
      : "https://partyhostingsystems.azurewebsites.net/api/v1/Register/PartyHost";
  // Hàm xử lý submit form

  const validateInput = (userName, email, password, phone, address,birthDay, gender) => {
    // Check if the first letter of each word in the username is uppercase
    const usernameRegex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
    if (!usernameRegex.test(userName)) {
      alert("Username must start with a capital letter for each word.");
      return false;
    }

    // Check if the email contains @
    if (!email.includes("@")) {
      alert("Email must contain @.");
      return false;
    }

    // Check if the password is at least 8 characters long, starts with an uppercase letter, and contains a special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long, start with an uppercase letter, and contain a special character."
      );
      return false;
    }

    // Check if the phone number is 10 or 11 digits long
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 10 or 11 digits long.");
      return false;
    }
    if (!address) {
      alert("Address cannot be null.");
      return false;
    }
    if (!birthDay) {
      alert("Birth day cannot be null.");
      return false;
    }
    if (!gender) {
      alert("please choice gender.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    const isValid = validateInput(
      data.userName,
      data.email,
      data.password,
      data.phone,
      data.address,
      data.birthDay,
      data.gender
    );
    if (!isValid) {
      return;
    }
    // data.preventDefault();
    registerAcc(data);
    // navigate("/login");
    // console.log(e);
  };

  //đang thử nghiệm form đăng kí thu thập thông tin

  const registerAcc = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(url, data);
      if (response.status === 200) {
        console.log(response);
        toggle();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        // navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Container>
      <Modal
        isOpen={editModal}
        toggle={toggle}
        // className={className}
        // backdrop={backdrop}
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <h3>Your registration was successful! Please login your account.</h3>
        </ModalBody>
      </Modal>
      <Row>
        <Col /*form đăng kí */>
          <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
              {/* { valid && (
                <div className="success-message">
                  <h3> Welcome {data.fullName} </h3>
                  <div> Your registration was successful! </div>
                </div>
              )} */}

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
              </div>

              {/* checking first form data */}
              <Col xs="auto">
                <h5>User name</h5>
              </Col>
              <input
                class="form-field"
                type="text"
                placeholder="Username"
                id="userName"
                name="userName"
                onChange={handleChange}
              />

              <Col xs="auto">
                <h5>Email</h5>
              </Col>

              <input
                class="form-field"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <Col xs="auto">
                <h5>Password</h5>
              </Col>
              <input
                class="form-field"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
              />
              <div>
                <br />
                <h5 style={{}}>Choice your role</h5>
                <ButtonGroup>
                  <Button
                    color="primary"
                    outline
                    onClick={() => setRSelected(1)}
                    active={rSelected === 1}
                  >
                    User
                  </Button>
                  <Button
                    color="primary"
                    outline
                    onClick={() => setRSelected(2)}
                    active={rSelected === 2}
                  >
                    Party Host
                  </Button>
                </ButtonGroup>
              </div>
              <br />

              {/* <Password_Vali
                onPasswordChange={(password) =>
                  handleChange(password)
                }
              /> */}
              <Col xs="auto">
                <h5>Phone</h5>
              </Col>
              <input
                class="form-field"
                type="number"
                placeholder="Phone Number"
                id="phone"
                name="phone"
                onChange={handleChange}
              />
              <br />
              <ButtonGroup className="d-flex flex-column">
                <Row>
                  <Col xs="auto">
                    <h5>Gender</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto">
                    <Button
                      value="female"
                      color="primary"
                      id="gender"
                      outline
                      onClick={handleChange}
                      active={data.gender === "female"}
                    >
                      Female
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      value="male"
                      color="primary"
                      id="gender"
                      outline
                      onClick={handleChange}
                      active={data.gender === "male"}
                    >
                      Male
                    </Button>
                  </Col>
                </Row>
              </ButtonGroup>
              <br />
              <Col xs="auto">
                <h5>Birth Day</h5>
              </Col>
              <input
                class="form-field"
                type="date"
                placeholder="Date of Birth"
                id="birthDay"
                name="birthDay"
                required
                max={
                  new Date(new Date().setDate(new Date().getDate() - 1))
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleChange}
              />
              <Col xs="auto">
                <h5>Address</h5>
              </Col>
              <input
                className="form-field"
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                onChange={handleChange}
              />

              <button
                className="form-field"
                type="submit"
                disabled={isSubmitting}
              >
                Register
              </button>
              <p className="change-page" style={{ textAlign: "center" }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Register;
