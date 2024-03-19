import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert'; // Import Alert từ @mui/material
import { updateMenuPartyHostV2 } from 'api/menu';
import { getUserId } from 'utils/userId';

const EditFoodForm = ({ foodInfo, onSuccess }) => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [foodOrderId, setFoodOrderId] = useState('');
  const [image, setImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const partyHostId = parseInt(getUserId(), 10);

  useEffect(() => {
    console.log('foodInfo.price', foodInfo.price);
    // Khởi tạo form với thông tin food hiện tại
    if (foodInfo) {
      setFoodOrderId(foodInfo.foodOrderId);
      setFoodName(foodInfo.foodName);
      setDescription(foodInfo.description);
      setPrice(foodInfo.price);
      setImage(foodInfo.image);
    }
  }, [foodInfo]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const foodData = {
      foodOrderId,
      foodName,
      description,
      price,
      partyHostId,
      image
    };
    console.log('foodData', foodData);
    try {
      const response = await updateMenuPartyHostV2(foodData);
      onSuccess();
    } catch (error) {
      console.error('Món ăn này đang được booking nên tạm thời không thể cập nhật:', error);
      setError('Món ăn này đang được booking nên tạm thời không thể cập nhật'); // Customize this message as needed
      setOpenSnackbar(true); // Open the snackbar to show the error message
      // Xử lý lỗi
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ overflowY: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên món ăn"
            variant="outlined"
            fullWidth
            required
            type="text"
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
            type="text"
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
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            inputProps={{ min: '0' }} 
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
            Cập nhật món ăn
          </Button>
        </Grid>
      </Grid>
      <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
    {error}
  </Alert>
</Snackbar>
    </form>
  );
};

export default EditFoodForm;
