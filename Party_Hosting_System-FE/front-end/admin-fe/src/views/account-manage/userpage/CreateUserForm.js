import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { createUser } from 'api/account'; // Giả sử bạn có một hàm tạo người dùng trong API
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CreateUserForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthDay, setBirthDay] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [isBirthDayInvalid, setIsBirthDayInvalid] = useState(false); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBirthDayChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate >= currentDate) {
      setIsBirthDayInvalid(true);
    } else {
      setIsBirthDayInvalid(false);
    }

    setBirthDay(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      userName,
      password,
      birthDay,
      phone,
      gender,
      address
    };

    try {
      const response = await createUser(userData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '10px 0', zIndex: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tên Người Dùng"
            variant="outlined"
            fullWidth
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mật Khẩu"
            variant="outlined"
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
         <Grid item xs={12}>
          <TextField
            label="Ngày Sinh"
            variant="outlined"
            fullWidth
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={birthDay}
            onChange={handleBirthDayChange} // Sử dụng hàm handleBirthDayChange đã được chỉnh sửa
            error={isBirthDayInvalid} // Hiển thị trạng thái lỗi nếu ngày sinh không hợp lệ
            helperText={isBirthDayInvalid ? 'Ngày sinh không thể là thời gian hiện tại hoặc tương lai!' : ''} // Thông báo lỗi
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Số Điện Thoại"
            variant="outlined"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{ maxLength: 10 }}
            type="tel"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Giới Tính"
            variant="outlined"
            fullWidth
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Địa Chỉ"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Tạo Người Dùng
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUserForm;