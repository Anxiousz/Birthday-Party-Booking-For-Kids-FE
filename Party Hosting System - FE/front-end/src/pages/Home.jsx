import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "./../shared/Subtitle";

import { SearchBar } from "../shared/SearchBar";
import { ServiceList } from "../services/ServiceList";
import { FeatureTourList } from "../components/Featured-tours/FeatureTourList";

const Home = () => {
  return (
    <>
      {/* ============== hero section start  =================*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Travling opens the door to creating
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Distinctio repudiandae fugiat laborum incidunt dicta aliquid
                  commodi sit corrupti, deleniti minus suscipit ea delectus
                  alias laboriosam, odit molestias expedita molestiae nihil?
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>

      {/* ============== hero section start  =================*/}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">Where we serve</h5>
              <h2 className="services__title">We offer our best service</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ============== featured tour section start  =================*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeatureTourList />
          </Row>
        </Container>
      </section>

      {/* ============== featured tour section end  =================*/}
    </>
  );
};
export default Home;
