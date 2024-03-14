import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  ButtonGroup,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import Password_Vali from "./PasswordValidation";
import { Input, Label } from "reactstrap";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import axios from "axios";
import sendErrorcode from "../shared/error-code";

const Register = () => {
  // Define the state
  const [rSelected, setRSelected] = useState(1);
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });
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
    gender: undefined,
  });
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(data);
    console.log(rSelected);
    console.log(url);
  };
  //From đăng kí  account
  const navigate = useNavigate();
 const changePostUrl = rSelected => {
    if (rSelected === 1) {
      setData((prev) => ({ ...prev, staffId: "5" }));
      setData((prev) => ({ ...prev, packageId: "1" }));
    } else {
      setData((prev) => ({ ...prev, staffId: "6" }));
      setData((prev) => ({ ...prev, packageId: "2" }));
    }
 };
  const url = rSelected === 1 ? 'https://partyhostingsystem.azurewebsites.net/api/v1/Register/RegisteredUser' : 'https://partyhostingsystem.azurewebsites.net/api/v1/Register/PartyHost';
  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    postData(data);
  };


  //đang thử nghiệm form đăng kí thu thập thông tin
  // Define the function
  const postData = (data) => {
    axios
      .post(
        url,
        data
      )
      .then((res) => {
        console.log(data);
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data);
        const status = err.response.status;
        const message = err.response.data;
        sendErrorcode(status, message);
      });

    // Hàm xử lý thay đổi giá trị input
  };
  return (
    <Container>
      <Row>
        <Col /*form đăng kí */>
          <div className="form-container">
            <form className="register-form">
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

              {!valid && (
                <input
                  class="form-field"
                  type="number"
                  placeholder="Phone Number"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                />
              )}
              <br />
              <ButtonGroup className="d-flex flex-column">
                <Row>
                  <Col xs="auto">
                    <h5>Gender</h5> 
                  </Col>
                </Row>
                <Row >
                  <Col xs="auto">
                    <Button
                      value="female"
                      color="primary"
                      id="gender"
                      outline
                      onClick={handleChange}
                      active={data.gender === 'female'}
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
                      active={data.gender === 'male'}
                    >
                      Male
                    </Button>
                  </Col>
                </Row>
              </ButtonGroup>
              <br />
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
