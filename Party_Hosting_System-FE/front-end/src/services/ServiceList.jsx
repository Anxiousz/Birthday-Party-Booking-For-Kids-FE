import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Testa",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, laudantium inventore nisi molestiae dolore harum veniam aliquid cumque commodi odit, incidunt maiores veritatis. Dignissimos unde debitis numquam, delectus ut quos!",
  },
  {
    imgUrl: guideImg,
    title: "Testb",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, laudantium inventore nisi molestiae dolore harum veniam aliquid cumque commodi odit, incidunt maiores veritatis. Dignissimos unde debitis numquam, delectus ut quos!",
  },
  {
    imgUrl: customizationImg,
    title: "Testc",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, laudantium inventore nisi molestiae dolore harum veniam aliquid cumque commodi odit, incidunt maiores veritatis. Dignissimos unde debitis numquam, delectus ut quos!",
  },
];

export const ServiceList = () => {
  return (
    <>
      {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};
