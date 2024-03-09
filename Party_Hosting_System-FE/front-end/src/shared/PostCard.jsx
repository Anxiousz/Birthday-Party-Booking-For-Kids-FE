import React, { useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const PostCard = ({ store }) => {
  const { postId, title, context, image, status } = store;

  const handleLinkClick = () => {
    fetch(`https://partyhostingsystem.azurewebsites.net/api/v1/Post/${postId}`)
      .then((response) => response.json())
      .then((postData) => {
        // Navigate to TourDetails with room data
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    // Logic to delete the post
  };

  const handleUpdate = () => {
    // Logic to update the post
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={image} alt="tour-img" />
        </div>

        <CardBody>
          <h3>{title}</h3>
          <p>{context}</p>
          <Button onClick={() => setShowPopup(true)}>View Details</Button>
          {showPopup && (
            <div className="popup">
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
          )}
        </CardBody>
      </Card>
    </div>
  );
};
export default PostCard;
