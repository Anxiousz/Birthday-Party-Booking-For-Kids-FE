import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createPackage } from 'api/packages';

const CreatePackageForm = ({ onSuccess }) => { 
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    

    // Lấy thông tin người dùng từ localStorage
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));
    const createdBy = userInfo ? userInfo.role : null;

    const packageData = {
      packageName,
      description,
      price: Number(price),
      createdBy
    };

    try {
      const response = await createPackage(packageData);
      onSuccess(); 
      // Xử lý sau khi tạo gói thành công (ví dụ: thông báo, làm mới form, ...)
    } catch (error) {
      console.error('Failed to create package:', error);
      // Xử lý lỗi (ví dụ: thông báo lỗi)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên Gói"
            variant="outlined"
            fullWidth
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mô Tả"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Giá"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Tạo Gói
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePackageForm;