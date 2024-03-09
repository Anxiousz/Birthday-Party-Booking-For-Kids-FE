import React from "react";
import { Card, CardBody } from "reactstrap";
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
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={image} alt="tour-img" />
          {status === 1 ? <span>Available</span> : <span>Not Available</span>}
        </div>

        <CardBody>
          <h3>{title}</h3>
          <p>{context}</p>
          <Link to={`/post/${postId}`} onClick={handleLinkClick}>
            View Details
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};
export default PostCard;