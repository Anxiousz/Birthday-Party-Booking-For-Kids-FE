import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { updatePostById } from 'api/post'; // Đảm bảo bạn đã tạo hàm này trong api/post
import MenuItem from '@mui/material/MenuItem';
import { getUserId } from 'utils/userId';

const EditPostForm = ({ postInfo, onSuccess }) => {
  const [postId, setPostId] = useState('');
  const [context, setContext] = useState('');
  const [title, setTitle] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [image, setImage] = useState('');
  const updatedBy = parseInt(getUserId(), 10);

  useEffect(() => {
    // Khởi tạo form với thông tin bài đăng hiện tại
    if (postInfo) {
      setPostId(postInfo.postId);
      setContext(postInfo.context);
      setTitle(postInfo.title);
      setCreatedBy(postInfo.createdBy);
      setUpdatedAt(postInfo.updatedAt);
      setImage(postInfo.image);
    }
    const now = new Date();
    const currentDateTimeLocal = now.toISOString().slice(0, 16);
    setUpdatedAt(currentDateTimeLocal);
  }, [postInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      context,
      title,
      createdBy,
      updatedAt,
      updatedBy,
      image
    };
    try {
      const response = await updatePostById(postId, postData);
      onSuccess();
    } catch (error) {
      console.error('Failed to update post:', error);
      // Xử lý lỗi
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ overflowY: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Chủ đề"
            variant="outlined"
            fullWidth
            required
            type="text"
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
            type="text"
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
            label="Người tạo"
            variant="outlined"
            required
            fullWidth
            type="number"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hình ảnh"
            variant="outlined"
            fullWidth
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật bài đăng
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditPostForm;
