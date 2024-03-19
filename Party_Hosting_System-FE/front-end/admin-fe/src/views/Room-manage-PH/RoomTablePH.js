import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import MainCard from '../../ui-component/cards/MainCard';
import { getRoomPartyHostById, updateRoomStatusByI } from 'api/roompartyhost';
import SearchIcon from '@mui/icons-material/Search';
import EditRoomPHForm from './EditRoomPHForm'; // Import EditPackageForm
import CreateRoomPH from './CreateRoomPH';
import { formatVND } from 'utils/format';
// import { updateRoom } from 'api/roompartyhost';

function RoomTablePH() {
  const [room, setRoom] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchText, setSearchText] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomPartyHostById();
        setRoom(roomData);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng:', error);
      }
    };

    fetchRoomData();
  }, []);

  //  console.log('room',room);

  if (!room) {
    return <div>Loading...</div>;
  }

  const filteredRooms = room.filter((room) => {
    switch (searchCriteria) {
      case 'roomName':
        return room.roomName.toLowerCase().includes(searchText.toLowerCase());
      case 'roomType':
        return room.roomType.toLowerCase().includes(searchText.toLowerCase());
      case 'location':
        return room.location.toLowerCase().includes(searchText.toLowerCase());
      default:
        return true;
    }
  });

  const handleStatusClick = async (roomId) => {
    try {
      // Gọi API để cập nhật trạng thái của phòng
      const response = await updateRoomStatusById(roomId);
      if (response && response.success) {
        // Nếu cập nhật thành công, tải lại danh sách phòng
        reloadRoomAndClearSelection();
        // Hiển thị thông báo thành công
        setSnackbar({ open: true, message: 'Cập nhật trạng thái phòng thành công', severity: 'success' });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái phòng:', error);
      // Hiển thị thông báo lỗi
      setSnackbar({ open: true, message: 'Cập nhật trạng thái phòng thất bại', severity: 'error' });
    }
  };

  const handleOpenEditDialog = (room) => {
    setSelectedRoom(room);
    setOpenEditForm(true);
  };

  const handleCloseEditDialog = (roomData) => {
    setOpenEditForm(false);
    setSelectedRoom(null); // Thêm dòng này để reset selectedRoom
  };

  const reloadRoomAndClearSelection = async () => {
    try {
      const roomData = await getRoomPartyHostById(); // Lấy dữ liệu phòng mới
      setRoom(roomData); // Cập nhật state room với dữ liệu mới
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu phòng:', error);
    }
  };

  const columns = [
    { field: 'roomId', headerName: 'ID', width: 100 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 100,
      renderCell: (params) => <Avatar alt="Hình ảnh phòng" src={params.value} variant="square" sx={{ width: 56, height: 56 }} />
    },
    { field: 'roomName', headerName: 'Tên Phòng', width: 150 },
    { field: 'roomType', headerName: 'Loại Phòng', width: 150 },
    {
      field: 'capacity',
      headerName: 'Sức Chứa',
      width: 100,
      renderCell: (params) => (
        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{params.value}</Typography>
      )
    },
    {
      field: 'timeStart',
      headerName: 'Thời gian bắt đầu',
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      }
    },
    {
      field: 'timeEnd',
      headerName: 'Thời gian kết thúc',
      width: 100,
      renderCell: (params) => {
        const date = new Date(params.value);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      }
    },
    { field: 'location', headerName: 'Địa Chỉ', width: 150 },
    { field: 'price', headerName: 'Giá Tiền', width: 100, renderCell: (params) => <Typography>{formatVND(params.value)}</Typography> },
    { field: 'note', headerName: 'Ghi Chú', width: 100 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <CircleIcon
            style={{ color: params.value === 1 ? 'green' : 'green', cursor: 'pointer' }}
            onClick={() => handleStatusClick(params.row.roomId)}
          />
        </IconButton>
      )
    },
    {
      field: 'action',
      width: 150,
      renderCell: (params) => (
        <IconButton
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          aria-label="edit"
          onClick={() => handleOpenEditDialog(params.row)}
          color="info"
        >
          <ModeEditOutlineOutlinedIcon />
        </IconButton>
      ),
      sortable: false
    }
  ];

  return (
    <MainCard title="Danh sách Phòng" contentSX={{ p: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
        <Select
          labelId="search-criteria-label"
          value={searchCriteria}
          label="Tiêu chí tìm kiếm"
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{ width: '300px', marginBottom: '20px', marginRight: '10px' }}
        >
          <MenuItem value="roomName">Tên phòng</MenuItem>
          <MenuItem value="roomType">Loại phòng</MenuItem>
          <MenuItem value="location">Vị trí</MenuItem>
        </Select>
      </FormControl>
      <Grid item container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          {' '}
          {/* Thay đổi xs thành xs={6} để làm cho thanh tìm kiếm nhỏ lại */}
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Tìm kiếm Room"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            variant="contained"
            size="small"
            title="Add Room"
            aria-label="Add Room"
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tạo Room Mới</DialogTitle>
        <DialogContent>
          <CreateRoomPH
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo Room thành công', severity: 'success' });
              reloadRoomAndClearSelection();
            }}
          />
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper} sx={{ minWidth: 800 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} style={{ minWidth: column.width }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((row) => (
              <TableRow key={row.roomId}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.renderCell ? column.renderCell({ value: row[column.field], row }) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)} aria-labelledby="edit-dialog-title">
        <DialogTitle id="edit-dialog-title">Chỉnh Sửa Room</DialogTitle>
        <DialogContent>
          {selectedRoom && (
            <EditRoomPHForm
              roomInfo={selectedRoom} // Pass selectedRoom as roomInfo
              onSuccess={() => {
                setOpenEditForm(false); // Close dialog on success
                reloadRoomAndClearSelection(); // Fetch lại data sau khi chỉnh sửa xong
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}

export default RoomTablePH;
