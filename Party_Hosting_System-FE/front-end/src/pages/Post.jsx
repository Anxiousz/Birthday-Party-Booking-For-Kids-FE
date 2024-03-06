import React from "react";
import {} from "reactstrap";
import "../styles/post.css"
import ListPost from "./CRUD_Post/listPost";
import AddPost from "./CRUD_Post/addPost";
import EditPost from "./CRUD_Post/editPost";

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
        <AddPost />
        <ListPost />
        
        <EditPost />
    </div>
    </div>
  );
};
export default Post;
