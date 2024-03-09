import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import Password_Vali from "./PasswordValidation";
import { Input, Label } from "reactstrap";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";

const Register = () => {
  // Define the state

  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [data, setData] = useState({
    staffId: "5",
    packageId: "1",
    userName: undefined,
    email: undefined,
    password: undefined,
    birthDay: undefined,
    phone: undefined,
    address: undefined,
    gender: true,
  });
  const handleChange = (e) => {
    if (e.target.id === 'gender') {
    } else { 
      setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    console.log(data);
  };
  //From đăng kí  account
  const navigate = useNavigate();

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.userName &&
      data.email &&
      data.password &&
      data.fullName &&
      data.phoneNumber &&
      data.birthDay &&
      data.address
    ) {
      setValid(true);
      postData(data);
    }
    setSubmitted(true);
  };
  //đang thử nghiệm form đăng kí thu thập thông tin
  // Define the function
  const postData = (data) => {
    axios
      .post(
        "https://partyhostingsystem.azurewebsites.net/api/v1/Register/PartyHost",
        data
      )
      .then((res) => {
        console.log(data);
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        console.log(data);
      });

    // Hàm xử lý thay đổi giá trị input
  };
  return (
    <Container>
      <Row>
        <Col /*form đăng kí */>
          <div className="form-container">
            <form className="register-form" onSubmit={handleSubmit}>
              {submitted && valid && (
                <div className="success-message">
                  <h3> Welcome {data.fullName} </h3>
                  <div> Your registration was successful! </div>
                </div>
              )}

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
              </div>

              {!valid && (
                <input
                  class="form-field"
                  type="text"
                  placeholder="Username"
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                />
              )}

              {submitted && !data.username && (
                <span id="last-name-error">Please enter your username</span>
              )}

              {!valid && (
                <input
                  class="form-field"
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
              )}

              {submitted && !data.email && (
                <span id="email-error">Please enter an email address</span>
              )}
              {!valid && (
                <input
                  class="form-field"
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              )}
              {/* <Password_Vali
                onPasswordChange={(password) =>
                  handleChange(password)
                }
              /> */}

              {submitted && !data.fullName && (
                <span id="password-error">Please enter your password</span>
              )}
              {!valid && (
                <input
                  class="form-field"
                  type="text"
                  placeholder="Phone Number"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                />
              )}

              {submitted && !data.phoneNumber && (
                <span id="last-name-error">Please enter your phone number</span>
              )}
              <FormGroup tag="fieldset" onSubmit={handleChange}>
                <h5>Gender</h5>
                <Row xs="2">
                  <Col>
                    <FormGroup check>
                      <input
                        class="form-field"
                        type="radio"
                        value='true'
                        id="gender"
                        name="radio1"
                        onChange={handleChange}
                      />
                      <Label check>Female</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check>
                      <input
                        class="form-field"
                        name="radio1"
                        type="radio"
                        value='false'
                        id="gender"
                        onChange={handleChange}
                      />
                      <Label check>Male</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>

              {!valid && (
                <input
                  class="form-field"
                  type="date"
                  placeholder="Date of Birth"
                  id="birthDay"
                  name="birthDay"
                  onChange={handleChange}
                />
              )}

              {submitted && !data.dateOfBirth && (
                <span id="full-name-error">
                  Please enter your date of birth
                </span>
              )}

              {!valid && (
                <input
                  className="form-field"
                  type="text"
                  placeholder="Address"
                  id="address"
                  name="address"
                  onChange={handleChange}
                />
              )}

              {submitted && !data.address && (
                <span id="address-error">Please enter your address</span>
              )}

              <button
                className="form-field"
                type="submit"
                onClick={() => postData(data)}
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
