import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });

  //đang thử nghiệm form đăng kí thu thập thông tin
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    username: "",
    password: "",
    address: "",
    email: "",
    dateOfBirth: "",
  });
  const handleInputChange = (event) => {
    /* event.persist(); NO LONGER USED IN v.17*/
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.fullName &&
      values.phoneNumber &&
      values.email &&
      values.address
    ) {
      setValid(true);
    }
    setSubmitted(true);
  };
  //đang thử nghiệm form đăng kí thu thập thông tin

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <Container>
        <Row>
          <Col /*form đăng kí */>
            <div className="form-container">
              <form
                className="register-form"
                onSubmit={
                  handleSubmit
                } /* bảng hiện thông báo đăng kí thành công, hiện tại chưa có nối và chưa pop-up*/
              >
                {submitted && valid && (
                  <div className="success-message">
                    <h3> Welcome {values.fullName} </h3>
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
                    placeholder="Full Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.fullName && (
                  <span id="full-name-error">Please enter your full name</span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.username && (
                  <span id="last-name-error">Please enter your username</span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.password && (
                  <span id="last-name-error">Please enter your password</span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.phoneNumber && (
                  <span id="last-name-error">
                    Please enter your phone number
                  </span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.dateOfBirth && (
                  <span id="full-name-error">
                    Please enter your date of birth
                  </span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.address && (
                  <span id="address-error">Please enter your address</span>
                )}

                {!valid && (
                  <input
                    class="form-field"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                  />
                )}

                {submitted && !values.email && (
                  <span id="email-error">Please enter an email address</span>
                )}
                {!valid && (
                  <button class="form-field" type="submit">
                    Register
                  </button>
                )}
                <p className="change-page">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Register;
