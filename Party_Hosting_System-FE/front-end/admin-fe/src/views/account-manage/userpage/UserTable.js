import { useState, useEffect, useRef } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  CardContent,
  Grid,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { getRegisteredUsers, deleteRegisteredUserById } from 'api/account'; // Corrected import path
import CreateUserForm from './CreateUserForm';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function UserTable() {
  const [users, setUsers] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // Can be 'success', 'error', 'warning', 'info'
  });
  const reloadUsers = async () => {
    try {
      const updatedUsers = await getRegisteredUsers();
      // Đảm bảo updatedUsers là một mảng trước khi cập nhật state
      setUsers(Array.isArray(updatedUsers) ? updatedUsers : []);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu người dùng:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải lại dữ liệu người dùng.', severity: 'error' });
    }
  };

  const reloadUsersAndClearSelection = async () => {
    await reloadUsers();
    // Add any additional logic to clear selections here if necessary
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  const handleDelete = async (accountId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      try {
        await deleteRegisteredUserById(accountId);
        setSnackbar({ open: true, message: 'Xóa người dùng thành công!', severity: 'success' });
        // Tải lại danh sách người dùng và xóa lựa chọn (nếu có)
        reloadUsersAndClearSelection();
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xóa người dùng.', severity: 'error' });
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    return user.userName.toLowerCase().includes(searchText.toLowerCase()) || user.email.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <MainCard title="Danh sách User" contentSX={{ p: 2 }}>
      <CardContent>
        <Grid
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'wrap',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '-16px',
            width: 'calc(100% + 16px)',
            marginLeft: '-16px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Tìm kiếm User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{ maxWidth: '600px', marginBottom: '20px' }} // Đã chỉnh sửa từ '500px' thành '600px' để thanh tìm kiếm dài ra
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconButton
              variant="contained"
              size="small"
              title="Add User"
              aria-label="Add User"
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                minWidth: 'auto',
                boxShadow: 'none',
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
              onClick={() => setOpenDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thêm User Mới</DialogTitle>
        <DialogContent>
          <CreateUserForm
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo người dùng mới thành công', severity: 'success' });
              reloadUsersAndClearSelection(); // Bạn cần định nghĩa hàm này để tải lại danh sách và xóa lựa chọn
            }}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tên User</TableCell>
              <TableCell>Mật khẩu</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>            
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((row) => (
              <TableRow key={row.accountId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.accountId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.userName}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{new Date(row.birthDay).toLocaleDateString()}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.gender === 1 ? 'Nữ' : 'Nam'}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircleIcon style={{ color: row.status === 1 ? 'green' : 'grey', cursor: 'pointer' }} />
                  </IconButton>
                </TableCell>               
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row.accountId)} color="info">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default UserTable;
