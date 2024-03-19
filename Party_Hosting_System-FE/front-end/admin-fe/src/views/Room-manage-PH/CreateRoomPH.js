// CreateRoomPH.js

import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createRoom } from 'api/roompartyhost'; // Assuming there is an API function for creating rooms
import MenuItem from '@mui/material/MenuItem';
import { getUserId } from 'utils/userId';

const CreateRoomPH = ({ onSuccess }) => {
  const [partyHostId, setPartyHostId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('0');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('0');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const userId = getUserId();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    const roomData = {
      partyHostId: userId,
      roomName,
      roomType,
      capacity: Number(capacity),
      timeStart,
      timeEnd,
      location,
      price: Number(price),
      note,
      image
    };

    try {
      const response = await createRoom(roomData);
      onSuccess();
      // Cập nhật dữ liệu trang ở đây (ví dụ: fetch lại danh sách phòng)
    } catch (error) {
      console.error('Failed to create room:', error);
      // Xử lý lỗi (hiển thị thông báo lỗi)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Tên Phòng"
            variant="outlined"
            fullWidth
            required
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            style={{ margin: '10px 0', zIndex: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Loại Phòng"
            variant="outlined"
            fullWidth
            required
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sức Chứa"
            variant="outlined"
            fullWidth
            required
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            inputProps={{ min: '0' }} 
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Địa Điểm"
            variant="outlined"
            fullWidth
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Thời Gian Bắt Đầu"
            variant="outlined"
            fullWidth
            required
            type="datetime-local"
            value={timeStart}
            onChange={(e) => {
              const selectedTime = e.target.value;
              const currentTime = new Date().toISOString().slice(0, 16); // Lấy thời gian hiện tại
              if (selectedTime >= currentTime) {
                setTimeStart(selectedTime);
              } else {
                alert('Không thể chọn thời gian quá khứ');
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Thời Gian Kết Thúc"
            variant="outlined"
            fullWidth
             required
            type="datetime-local"
            value={timeEnd}
            onChange={(e) => {
              const selectedTime = e.target.value;
              const currentTime = new Date().toISOString().slice(0, 16); // Lấy thời gian hiện tại
              if (selectedTime >= currentTime && selectedTime >= timeStart) {
                setTimeEnd(selectedTime);
              } else {
                alert('Thời gian kết thúc phải sau thời gian bắt đầu');
              }
            }}
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
            label="Ghi Chú"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hình Ảnh"
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
            Tạo Room
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateRoomPH;
