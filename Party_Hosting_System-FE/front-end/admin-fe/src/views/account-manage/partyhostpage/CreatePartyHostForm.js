import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material';
import { createPartyHost } from 'api/account'; // Đổi thành API phù hợp
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CreatePartyHostForm = ({ onSuccess }) => {
  const [staffId, setStaffId] = useState(''); // Đổi thành staffId
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthDay, setBirthDay] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [packageId, setPackageId] = useState(''); // Thêm trạng thái cho packageId
  const [isBirthDayInvalid, setIsBirthDayInvalid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBirthDayChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Đặt thời gian hiện tại về đầu ngày để so sánh chính xác

    if (selectedDate >= currentDate) {
      setIsBirthDayInvalid(true); // Ngày sinh không hợp lệ
    } else {
      setIsBirthDayInvalid(false); // Ngày sinh hợp lệ
    }

    setBirthDay(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const partyHostData = {
      staffId, // Sử dụng staffId
      email,
      userName,
      password,
      birthDay,
      phone,
      gender,
      address,
      packageId // Thêm packageId vào dữ liệu được gửi
    };

    try {
      const response = await createPartyHost(partyHostData); // Đổi thành hàm API phù hợp
      onSuccess();
    } catch (error) {
      console.error('Failed to create party host:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="StaffID"
            variant="outlined"
            fullWidth
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tên PartyHost"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mật Khẩu"
            variant="outlined"
            fullWidth
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
            type="date"
            InputLabelProps={{ shrink: true }}
            value={birthDay}
            onChange={handleBirthDayChange} // Sử dụng hàm handleBirthDayChange đã được chỉnh sửa
            error={isBirthDayInvalid} // Hiển thị trạng thái lỗi nếu ngày sinh không hợp lệ
            helperText={isBirthDayInvalid ? "Ngày sinh không thể là thời gian hiện tại hoặc tương lai!" : ""} // Thông báo lỗi
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Số Điện Thoại"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{ maxLength: 9 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Giới Tính"
            variant="outlined"
            fullWidth
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="PackageID"
            variant="outlined"
            fullWidth
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Tạo PartyHost
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreatePartyHostForm;
