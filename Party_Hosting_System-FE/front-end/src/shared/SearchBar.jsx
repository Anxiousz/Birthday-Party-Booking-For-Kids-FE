import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Row } from "reactstrap";
import axios from "axios";
import { FeatureTourList } from "../components/Featured-places/FeaturePlaceList";
import RoomCard from "../shared/PlaceCard";
export const SearchBar = () => {
  // const locationRef = useRef("");
  const distanceRef = useRef("");
  const [message, setMessage] = useState('');
  const maxGroupSizeRef = useRef("");
  const [location, setLocation] = useState("");
  const onChangelocation = (e) => {
    setLocation(e.target.value);
  };
  const [roomData, setRoomData] = useState([]);
  const search = async () => {
    if (location === "") {
      return alert("Cannot search emrty");
    }
    try {
      const urlSearch = `https://partyhostingsystems.azurewebsites.net/api/v2/Room/SearchRoom/roomName?context=${location}`;
      await axios.post(urlSearch).then((res) => {
        console.log(res.data);
        setRoomData(res.data);
        if (res.data.length === 0) {
          setMessage("Don't find the room match with value");
        } else {
          setMessage('');
        }
      });
    } catch (error) {
      console.log(location);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Row>
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
      </Row>
      <br />
      <Row>
          <Col lg="12">
          <h3>{message && <p>{message}</p>}</h3>
        </Col>
      </Row>
        
      <Row>
        {roomData.slice(0, 4).map((room) => (
          <Col lg="3" className="mb-4" key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
