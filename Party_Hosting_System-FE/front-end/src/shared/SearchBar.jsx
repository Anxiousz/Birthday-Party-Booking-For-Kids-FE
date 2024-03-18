import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import axios from "axios";
export const SearchBar = () => {
  // const locationRef = useRef("");
  const distanceRef = useRef("");
  const maxGroupSizeRef = useRef("");
  const [location,setLocation ] = useState("");
  const onChangelocation = (e) => {
    setLocation(e.target.value);
    console.log(location)
  };
  const search = async () => {
    if (location === "") {
      return alert("All field are required");
    }
    try {
      const urlSearch = `https://partyhostingsystems.azurewebsites.net/SearchRoom/roomName?context=${location}`;
      await axios.post(urlSearch).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Search Room Here"
                onChange={onChangelocation}
                // ref={locationRef}
              />
            </div>
          </FormGroup>
          {/* <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup> */}
          <span className="search__icon" type="submit" onClick={search}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};
