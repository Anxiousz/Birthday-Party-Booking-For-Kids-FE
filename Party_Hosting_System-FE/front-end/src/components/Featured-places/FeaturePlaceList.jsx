import React from "react";
import PlaceCard from "../../shared/PlaceCard";
import PlaceData from "../../assets/data/tour";
import { Col } from "reactstrap";

export const FeatureTourList = () => {
  return (
    <>
      {PlaceData?.map((tour) => (
        <Col lg="4" className="mb-4" key={tour.id}>
          <PlaceCard tour={tour} />
        </Col>
      ))}
    </>
  );
};
