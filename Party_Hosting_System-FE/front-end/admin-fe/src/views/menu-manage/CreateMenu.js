// CreateMenuForm.js

import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createMenuPartyHost } from 'api/menu'; // Assuming there is an API function for creating menus
import { getUserId } from 'utils/userId';

const CreateMenuForm = ({ onSuccess }) => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [partyHostId, setPartyHostId] = useState('');
  const [image, setImage] = useState('');
  const userId = getUserId();

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    // Kiểm tra xem giá trị nhập vào có phải là số không âm
    if (!isNaN(inputPrice) && parseFloat(inputPrice) >= 0) {
      setPrice(inputPrice);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const menuData = {
      foodName,
      description,
      price,
      partyHostId: userId,
      image
    };

    try {
      const response = await createMenuPartyHost(menuData);
      onSuccess();
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Failed to create menu:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên món ăn"
            variant="outlined"
            fullWidth
            required
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            style={{ margin: '10px 0', zIndex: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mô tả"
            variant="outlined"
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Giá"
            variant="outlined"
            fullWidth
            required
            value={price}
            onChange={handlePriceChange}
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
            value={image}
            onChange={(e) => setImage(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Create Món ăn
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateMenuForm;
