// CreatePost.js

import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createNewPost } from 'api/post'; // Assuming there is an API function for creating posts
import { getUserId } from 'utils/userId';

const CreatePost = ({ onSuccess }) => {
  const [context, setContext] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const createdBy = parseInt(getUserId(), 10);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date().toISOString().slice(0, 16);

    const postData = {
      context,
      title,
      createdAt: now,
      createdBy,
      image
    };

    try {
      const response = await createNewPost(postData);
      onSuccess();
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Failed to create post:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Chủ đề"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nội dung"
            variant="outlined"
            fullWidth
            required
            value={context}
            onChange={(e) => setContext(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            style={{ margin: '10px 0', zIndex: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Hình ảnh"
            variant="outlined"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Tạo bài đăng
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePost;
