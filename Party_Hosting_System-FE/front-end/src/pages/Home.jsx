import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import cakeImg from "../assets/images/Cake.png";
import Subtitle from "./../shared/Subtitle";
import experienceImg from "../assets/images/experience.png";
import party1 from "../assets/images/birthday-parties-1.jpg";
import party2 from "../assets/images/party-2.avif";
import partyVideo from "../assets/images/party-video.mp4";

import { SearchBar } from "../shared/SearchBar";
import { ServiceList } from "../services/ServiceList";
import { FeatureTourList } from "../components/Featured-places/FeaturePlaceList";
import Testimonial from "../components/Testimonial/Testimonial";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Newsletter from "../shared/Newsletter";

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
                  <Subtitle subtitle={"Book, Celebrate, Enjoy, Remember"} />
                  <img src={cakeImg} alt="" />
                </div>
                <h1>
                  Explore. Book the table. Eat well.
                  With your restaurant booking app, create unforgettable
                  <span className="highlight"> culinary moments!</span>
                </h1>
                <p>
                  Welcome to our Party booking app! Enjoy an easy booking experience, choose from top restaurants and reviews
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={party1} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={partyVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={party2} alt="" />
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

      {/* ============== featured place section start  =================*/}
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

      {/* ============== featured place section end  =================*/}

      {/* ============== experience section start ===================*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                We provide services that allow you to experience 
                different spaces depending on your preferences
                  <br />
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============== experience section end =====================*/}

      {/* ============== gallery section start ======================*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============== gallery section end ========================*/}

      {/* ============== testimonial section start ========================*/}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans love"} />
              <h2 className="testimonial__title">What ours fans say about</h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============== testimonial section end ========================*/}
      <Newsletter />
    </>
  );
};
export default Home;
