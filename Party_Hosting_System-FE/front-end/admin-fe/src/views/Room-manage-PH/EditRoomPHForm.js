import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { updateRoom } from 'api/roompartyhost';
import { getUserId } from 'utils/userId';

const EditRoomPHForm = ({ roomInfo, onSuccess }) => {
  const [roomId, setRoomId] = useState('');
  const [partyHostId, setPartyHostId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = getUserId();

  useEffect(() => {
    if (roomInfo) {
      setRoomId(roomInfo.roomId);
      setPartyHostId(roomInfo.partyHostId);
      setRoomName(roomInfo.roomName);
      setRoomType(roomInfo.roomType);
      setCapacity(roomInfo.capacity);
      setTimeStart(roomInfo.timeStart);
      setTimeEnd(roomInfo.timeEnd);
      setLocation(roomInfo.location);
      setPrice(roomInfo.price);
      setNote(roomInfo.note);
      setImage(roomInfo.image);
    }
  }, [roomInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      roomId,
      partyHostId: userId,
      roomName,
      roomType,
      capacity,
      timeStart,
      timeEnd,
      location,
      price,
      note,
      image
    };

    try {
      const response = await updateRoom(roomData);
      onSuccess();
    } catch (error) {
      console.error('Failed to update room party host:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Phòng này đã được booking hiện tại không thể chỉnh sửa');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ overflowY: 'auto' }}>
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
              if (selectedTime >= currentTime) {
                setTimeEnd(selectedTime);
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
            Cập Nhật Phòng
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Add this line
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EditRoomPHForm;
