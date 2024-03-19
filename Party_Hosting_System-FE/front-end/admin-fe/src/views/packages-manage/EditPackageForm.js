import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { editPackage } from 'api/packages'; // Đảm bảo bạn đã tạo hàm này trong api/packages

const EditPackageForm = ({ packagesInfo, onSuccess }) => {
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Khởi tạo form với thông tin package hiện tại
    if (packagesInfo) {
      setPackageName(packagesInfo.packageName);
      setDescription(packagesInfo.description);
      setPrice(packagesInfo.price);
    }
  }, [packagesInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = {
      packageId: packagesInfo.packageId,
      packageName,
      description,
      price: Number(price),
    };

    try {
      const response = await editPackage(packageData);
      onSuccess();
    } catch (error) {
      console.error('Failed to update package:', error);
      // Xử lý lỗi
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
            Cập Nhật Gói
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditPackageForm;