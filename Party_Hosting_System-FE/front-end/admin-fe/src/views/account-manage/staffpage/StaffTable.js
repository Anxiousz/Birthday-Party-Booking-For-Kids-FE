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
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { getAllStaff, deleteStaffById } from 'api/account'; // Corrected import path
import CreateStaffForm from './CreateStaffForm';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function StaffTable() {
  // const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  // const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [managers, setManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // Can be 'success', 'error', 'warning', 'info'
  });
  const deleteButtonRef = useRef(null);

  const reloadStaff = async () => {
    try {
      const updatedStaff = await getAllStaff();
      setManagers(updatedStaff);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu nhân viên:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải lại dữ liệu nhân viên.', severity: 'error' });
    }
  };

  const reloadStaffAndClearSelection = async () => {
    await reloadStaff();
    // Add any additional logic to clear selections here if necessary
  };

  useEffect(() => {
    reloadStaff();
  }, []);

  const handleDelete = async (staffId) => {
    // Hiển thị hộp thoại xác nhận
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      try {
        await deleteStaffById(staffId);
        // Cập nhật thông báo thành công
        setSnackbar({ open: true, message: 'Xóa nhân viên thành công!', severity: 'success' });
        // Tải lại danh sách nhân viên và xóa lựa chọn (nếu có)
        reloadStaffAndClearSelection();
      } catch (error) {
        console.error('Lỗi khi xóa nhân viên:', error);
        // Cập nhật thông báo lỗi
        setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xóa nhân viên.', severity: 'error' });
      }
    }
  };

  const filteredStaff = managers.filter((staff) => {
    return staff.phone.includes(searchText); // Thêm điều kiện tìm kiếm bằng số điện thoại
  });

  return (
    <MainCard title="Danh sách Staff" contentSX={{ p: 2 }}>
      {/* <CardContent> */}
      <FormControl fullWidth>
        <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
        <Select
          labelId="search-criteria-label"
          value={searchCriteria}
          label="Tiêu chí tìm kiếm"
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{ width: '300px', marginBottom: '20px', marginRight: '10px' }}
        >
          <MenuItem value="phone">Số điện thoại</MenuItem>
        </Select>
      </FormControl>
          <Grid item container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Tìm kiếm Staff"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              // sx={{ maxWidth: '600px', marginBottom: '20px' }} // Đã chỉnh sửa từ '500px' thành '600px' để thanh tìm kiếm dài ra
            />
          </Grid>
          <Grid item >
            <IconButton
              variant="contained"
              size="small"
              title="Add Staff"
              aria-label="Add Staff"
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
      {/* </CardContent> */}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Tạo Staff Mới</DialogTitle>
        <DialogContent>
          <CreateStaffForm
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo nhân viên mới thành công', severity: 'success' });
              reloadStaffAndClearSelection(); // Bạn cần định nghĩa hàm này để tải lại danh sách và xóa lựa chọn
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
              <TableCell>StaffID</TableCell>
              <TableCell>AdminID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tên Staff</TableCell>
              <TableCell>Mật khẩu</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((row) => (
              <TableRow key={row.staffId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.staffId}</TableCell>
                <TableCell>{row.superiorId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{new Date(row.birthDay).toLocaleDateString()}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.gender === 1 ? 'Nữ' : 'Nam'}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircleIcon style={{ color: row.status === 1 ? 'green' : 'grey', cursor: 'pointer' }} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center'}}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row.staffId)} color="info">
                      <DeleteIcon />
                    </IconButton>
                    {/* <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}></IconButton> */}
                    {/* <IconButton aria-label="edit" onClick={() => {}}>
                      <ModeEditOutlineOutlinedIcon />
                    </IconButton> */}
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

export default StaffTable;
