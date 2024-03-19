import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  Snackbar
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useAuth from 'hooks/useAuth';

const FirebaseLogin = ({ ...others }) => {
  const { login } = useAuth(); // Accessing login function from the authentication context
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null); // State for notification message
  const [role, setRole] = useState('');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LoginSchema = Yup.object().shape({
    name: Yup.string().required('Tên tài khoản không được để trống'),

    password: Yup.string().max(255).required('Mật khẩu không được để trống')
  });

  return (
    <>
      <Formik
        initialValues={{
          name: 'oliviadavis@gmail.com',
          password: 'ProtectedPass321'
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.name, values.password, role); // Modified to include role in the login function call
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setNotification(err.message); // Set notification message with error from API
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-name-login">Tên tài khoản</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name-login"
                type="text"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Tên tài khoản"
                inputProps={{}}
              />
              {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mật khẩu"
                inputProps={{}}
              />
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {notification && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{notification}</FormHelperText>
              </Box>
            )}

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={role}
                onChange={handleChangeRole}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="3">Host</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                Đăng nhập
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
