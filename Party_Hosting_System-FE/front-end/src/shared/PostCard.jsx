import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  Modal,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import './post-card.css';
const PostCard = ({ store }) => {
  const { postId, title, context, image, status } = store;
  const [modal, setModal] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const [backdrop] = useState("static");
  const [unmountOnClose, setUnmountOnClose] = useState(false);
  const [feedback, setFeedback] = useState({
    comment: "",
    rating: "",
    createdBy: "",
    postId: "",
  });
  const [data, setData] = useState([]);
  const toggleModal = () => {
    setModal(!modal);
  };
  const getStars = (rating) => {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  };
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setFeedback((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setFeedback((prev) => ({ ...prev, createdBy: userId }));
    setFeedback((prev) => ({ ...prev, postId: postId }));
    console.log(feedback);
  };

  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  const handleLinkClick = () => {
    fetch(`https://partyhostingsystems.azurewebsites.net/api/v1/Post/${postId}`)
      .then((response) => response.json())
      .then((postData) => {
        // Navigate to TourDetails with room data
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };
  const [showPopup, setShowPopup] = useState(false);
  const getFeedbackdata = async (postId) => {
    try {
      const response = await fetch(
        `https://partyhostingsystems.azurewebsites.net/api/v1/Feedback/listFeedBackByPostID?postID=${postId}`
      );
      const data = await response.json();

      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.comment === '' || feedback.rating === '') {
      // Show error
      setFeedback({ ...feedback, commentError: feedback.comment === '', ratingError: feedback.rating === '' });
    } else {
      // Post feedback
      // ...
    }
  };

  // const handleDelete = () => {
  //   // Logic to delete the post
  // };

  // const handleUpdate = () => {
  //   // Logic to update the post
  // };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={image} alt="post-img" />
        </div>

        <CardBody>
          <h3>{title}</h3>
          <p>{context}</p>
          {/* <Button onClick={() => setShowPopup(true)}>View Details</Button> */}
          <Button
            color="success"
            onClick={() => {
              toggleModal();
              getFeedbackdata(postId);
            }}
          >
            View details
          </Button>{" "}

          </CardBody>
      </Card>

          <Modal
            isOpen={modal}
            toggle={toggleModal}
            className="custom-modal"
            style={{ maxWidth: "1200px" }}
          >
            <ModalBody>
              <FormGroup>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={image} alt="post-img" style={{ width: "40%" }} />
                </div>{" "}
              </FormGroup>
              <FormGroup>
                <h2 id="description" style={{ textAlign: "center" }}>
                  {title}
                </h2>

                <p id="description">{context}</p>
              </FormGroup>
              <FormGroup>
                <h3>Feedback</h3>
                <div className="tour__card2">
                  <Card>
                    <CardBody>
                      {data.map((feedback) => (
                        <FormGroup
                          key={feedback.feedbackId}
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                            borderRadius: "10px",
                          }}
                        >
                          <p style={{ marginTop: "20px", marginLeft: "20px" }}>
                            {feedback.comment}
                          </p>
                          <p style={{ marginTop: "5px", marginLeft: "20px" }}>
                            Rating: {getStars(feedback.rating)}
                          </p>

                          {/* <p style={{ marginTop: "5px", marginLeft: "20px" }}>
                            Created by: {feedback.createdBy}
                          </p> */}
                          <p style={{ marginTop: "5px", marginLeft: "20px" }}>
                            Created by: {feedback.createdByNavigation.userName}
                          </p>
                          <p style={{ marginTop: "5px", marginLeft: "20px" }}>
                            Created at:{" "}
                            {new Date(feedback.createdAt)
                              .toLocaleString("en-US", options)
                              .replace(/,/g, "")
                              .replace(/ /g, " ")}
                          </p>
                        </FormGroup>
                      ))}
                      <br />
                      <FormGroup  onSubmit={handleSubmit}>
                        <Label for="comment">Comment</Label>
                        <Input
                          type="textarea"
                          name="comment"
                          id="comment"
                          onChange={handleChange}
                          invalid={feedback.commentError}
                        />
                        <FormFeedback>Comment is required</FormFeedback>
                        <br />
                        <Label for="rating">Rating</Label>
                        <Input
                          type="select"
                          name="rating"
                          id="rating"
                          onChange={handleChange}
                          invalid={feedback.ratingError}
                        >
                          <option value="">Select rating</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Input>
                        <FormFeedback>Rating is required</FormFeedback>
                        <br />
                        <Button color="success" type="submit">
                          Add Feedback
                        </Button>{" "}
                      </FormGroup>
                    </CardBody>
                  </Card>
                </div>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {/* <Button
                color="primary"
                onClick={() => {
                  toggleModal();
                }}
              >
                Save
              </Button>{" "} */}
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/* {showPopup && (
            <div className="popup">6667
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Context</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{title}</td>
                    <td>
                      <img src={image} alt="tour-img" />
                    </td>
                    <td>{context}</td>
                    <td>
                      <button onClick={handleDelete}>Delete</button>
                      <button onClick={handleUpdate}>Update</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}
        {/* </CardBody>
      </Card> */}
    </div>
  );
};
export default PostCard;
