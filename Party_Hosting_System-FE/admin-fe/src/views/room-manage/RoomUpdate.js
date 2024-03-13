import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dialog, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { banAcccountById, getAcccountById, updateAcccountById } from 'api/account'; // Assuming you have API functions for getting, updating, and banning acccount by ID
import BlockIcon from '@mui/icons-material/Block';

export default function AccountUpdate({ acccountId }) {
  const [acccount, setAcccount] = useState({
    fullname: '',
    imageurl: '',
    phone: '',
    address: '',
    password: '',
    degreeid: '',
    walletid: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // State for controlling confirmation dialog
  const [errors, setErrors] = useState({}); // Define errors state variable

  useEffect(() => {
    getAcccountData(acccountId);
  }, [acccountId]);

  const getAcccountData = async (id) => {
    try {
      const data = await getAcccountById(id);
      setAcccount({
        Fullname: data.fullname,
        Imageurl: data.imageurl,
        Phone: data.phone,
        Address: data.address,
        Password: data.password,
        Degreeid: data.degreeid,
        Walletid: data.walletid
      });
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  const handleChange = (prop) => (event) => {
    setAcccount({ ...acccount, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateacccountById(acccountId, acccount);
      setSnackbarMessage('Account updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating account:', error);
      setSnackbarMessage('Error updating account');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleBan = async () => {
    setOpenConfirmDialog(true); // Open confirmation dialog
  };

  const handleConfirmBan = async () => {
    setOpenConfirmDialog(false); // Close confirmation dialog
    try {
      await banAcccountById(acccountId);
      setSnackbarMessage('Account banned successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error banning account:', error);
      setSnackbarMessage('Error banning account');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCancelBan = () => {
    setOpenConfirmDialog(false); // Close confirmation dialog
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h3" gutterBottom sx={{ padding: '16px 5px' }}>
        Update acccount
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={errors.fullname}
              id="outlined-fullname"
              label="Full Name"
              value={acccount.fullname}
              onChange={handleChange('fullname')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.imageurl}
              id="outlined-imageurl"
              label="Image URL"
              value={acccount.imageurl}
              onChange={handleChange('imageurl')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.phone}
              id="outlined-phone"
              label="Phone"
              value={acccount.phone}
              onChange={handleChange('phone')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.address}
              id="outlined-address"
              label="Address"
              value={acccount.address}
              onChange={handleChange('address')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.password}
              id="outlined-password"
              label="Password"
              value={acccount.password}
              onChange={handleChange('password')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.degreeid}
              id="outlined-degreeid"
              label="Degree ID"
              value={acccount.degreeid}
              onChange={handleChange('degreeid')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={errors.walletid}
              id="outlined-walletid"
              label="Wallet ID"
              value={acccount.walletid}
              onChange={handleChange('walletid')}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item>
            <Button type="button" color="error" variant="outlined" onClick={handleBan}>
              <BlockIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" color="primary" variant="contained">
              Update Account
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelBan}>
        <DialogTitle>Are you sure you want to ban this account?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action will ban the account and cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmBan} color="error">
            Yes
          </Button>
          <Button onClick={handleCancelBan} color="primary" variant="contained">
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}


