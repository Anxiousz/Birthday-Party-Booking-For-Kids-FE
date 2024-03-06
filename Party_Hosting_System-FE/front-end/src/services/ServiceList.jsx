import React from "react";
import { ServiceCard } from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const serviceData = [
  {
    imgUrl: weatherImg,
    title: "Chicken Plus",
    desc: "Chicken Plus is the leading Korean fried chicken chain in Vietnam. We provide chicken dishes with special flavors to bring you the most wonderful meal!",
  },
  {
    imgUrl: guideImg,
    title: "Pachi Pachi",
    desc: "Operating under the hot pot restaurant model (combining buffet and a la carte service), Pachi Pachi restaurant brings diners completely new experiences from marinating, flavoring to how to enjoy the food.",
  },
  {
    imgUrl: customizationImg,
    title: "CashFlow",
    desc: "Cashflow cafe is an ideal stop for many young people in Saigon who are passionate about finance and creative activities. This is also a place for those who want to have a memorable space with friends.",
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
