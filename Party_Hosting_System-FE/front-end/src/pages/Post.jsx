import React, { useState, useEffect } from "react";
import { Form, Label, Input, FormGroup, Col } from "reactstrap";
import PostCard from "../shared/PostCard";
import axios from "axios";
import "../styles/post.css";

const Post = () => {
  const [postData, setPostdata] = useState({
    context: undefined,
    title: undefined,
    createdBy: 5,
    image: "https://cdn-icons-png.flaticon.com/512/1412/1412222.png",
  });
  const [store, setStore] = useState([]);
  const handleChange = (e) => {
    setPostdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    console.log(sessionStorage.getItem("authToken"));
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  const fetchPostData = async () => {
    try {
      const response = await fetch(
        "https://partyhostingsystem.azurewebsites.net/api/v1/Post",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }
      );

      const data = await response.json();
      setStore(data);
      console.log(store);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };
  const endpoint = store;
  const apiUrl = "https://partyhostingsystem.azurewebsites.net/api/v1/Post";
  const createPostData = async (data) => {
    try {
      axios
        .post(apiUrl + endpoint, postData)
        .then((res) => {
          sessionStorage.setItem("authToken", res.data.token);
          console.log(res.data.token);
          setTimeout(() => {}, 2500);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };
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
      <div className="post_main_Table">
        <button onClick={fetchPostData}>Click to check</button>

        <Form className="post_Table">
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="context">Context</Label>
            <Input
              type="text"
              name="context"
              id="context"
              placeholder="Context"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
          {store.slice(0, 6).map((store) => (
          <Col lg="11" className="mb-4" key={store.id}>
            <PostCard store={store} />
          </Col>
        ))}
      </div>
    </div>
  );
};
export default Post;
