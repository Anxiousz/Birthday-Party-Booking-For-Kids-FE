import React from "react";
import TourCard from "../../shared/PlaceCard";
import tourData from "../../assets/data/tour";
import { Col } from "reactstrap";

export const FeatureTourList = () => {
  return (
    <>
      {tourData?.map((tour) => (
        <Col lg="4" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};
