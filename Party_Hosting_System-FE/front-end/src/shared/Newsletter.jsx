import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import happyChildren from "../assets/images/happyChildren.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful booking information</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
                placeat provident obcaecati minus ut nisi dolorem, natus harum
                hic dignissimos ipsum optio repellendus dolor porro repellat
                itaque exercitationem distinctio nihil.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={happyChildren} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
