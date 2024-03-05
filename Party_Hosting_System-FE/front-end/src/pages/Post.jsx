import React from "react";
import {} from "reactstrap";
import "../styles/post.css";
import Popup from "reactjs-popup";

const Post = () => {
  return (
    <div className="grid-container">
      <div className="grid_center">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
      <div>
      <Popup modal trigger={<button>Create Post</button>}>
          <div className="newPost">
            <div className="container">
              <form>
                <div className="inputFile">
                  <input type="file"></input>
                </div>
                <input className="popup_title" type="text" placeholder="Title"></input>
                <textarea className="popup_textarea" id="" cols="80" rows="12"></textarea>
                <div className="popup-button">
                <button>Create Post</button>
                </div>
              </form>
            </div>
          </div>
        </Popup>
    </div>
    </div>
  );
};
export default Post;
