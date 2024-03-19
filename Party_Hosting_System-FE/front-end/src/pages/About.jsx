import React, { useState } from "react";
import {
  Container,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  CardLink,
  CardHeader,
  CardFooter,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from "reactstrap";
import "../styles/about.css";
import aoi from "../assets/images/aoi.jpg";
import kunado from "../assets/images/kunado.jpg";
import hapymaher from "../assets/images/hapymaher.jpg";

const items = [
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-o/12/e2/66/95/our-atmosphere.jpg",
    altText: "Title 1",
    caption: "A private haven for your special occasions.",
    description: "Escape the ordinary and celebrate life's milestones in an intimate and secluded setting. Our private rooms offer the perfect atmosphere for unforgettable gatherings, from romantic dinners to family celebrations.",
    align: "left",
    key: 1,
  },
  {
    src: "https://weontrip.com/wp-content/uploads/2024/03/usa-food-1-2000x1330.jpg",
    altText: "Title 2",
    caption: "Experience fine dining in a luxurious setting",
    description: "Indulge in a culinary journey unlike any other. Our luxurious dining rooms provide an elegant backdrop for savoring exquisite cuisine and impeccable service. Let us elevate your dining experience to an art form",
    align: "right",
    key: 2,
  },
  {
    src: "https://media-cdn.tripadvisor.com/media/photo-o/12/e2/66/4d/our-atmosphere.jpg",
    altText: "Title 3",
    caption: "Create memories that will last a lifetime in our exclusive dining rooms",
    description: "More than just a meal, create lasting memories with loved ones in our exclusive dining rooms. These private spaces are designed to foster meaningful connections and provide the perfect canvas for unforgettable occasions",
    align: "left",
    key: 3,
  },
];
function About(args) {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="carousel-item-container">
          <img src={item.src} alt={item.altText} className="img_display"/>
          <div className={`carousel-caption-container ${item.align}`}>
            <CarouselCaption
              captionText={item.description}
              captionHeader={item.caption}
            />
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <div>
      {/* <UncontrolledAccordion
        defaultOpen={["1", "2"]}
        stayOpen
      >
      
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">History</AccordionHeader>
          <img src={aoi} alt="" className="img_card_drop" /> <br />

          <AccordionBody accordionId="1"></AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Traditional</AccordionHeader>
          <AccordionBody accordionId="2">
            <img src={kunado} alt="" className="img_card_drop" /> <br />

          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">The Ideal</AccordionHeader>
          <AccordionBody accordionId="3">
            <img src={hapymaher} alt="" className="img_card_drop" /> <br />

          </AccordionBody>
        </AccordionItem>
      </Accordion>
      </UncontrolledAccordion> */}
      <Carousel
        fade={true}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        {...args}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
}
export default About;
