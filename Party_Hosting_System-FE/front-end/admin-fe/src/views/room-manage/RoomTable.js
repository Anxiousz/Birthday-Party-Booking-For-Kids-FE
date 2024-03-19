import React from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from '../../ui-component/cards/MainCard';
import { getAllRoomsAdmin} from 'api/room';
import { formatVND } from 'utils/format';

function RoomTable() {
  const [rooms, setRooms] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [searchCriteria, setSearchCriteria] = React.useState('roomName'); // Khai báo state mới cho searchCriteria

  React.useEffect(() => {
    getAllRoomsAdmin().then((data) => {
      if (data) {
        setRooms(data);
      }
    });
  }, []);

  const filteredRooms = rooms.filter((room) => {
    switch (searchCriteria) {
      case 'roomName':
        return room.roomName.toLowerCase().includes(searchText.toLowerCase());
      case 'roomType':
        return room.roomType.toLowerCase().includes(searchText.toLowerCase());
      case 'location':
        return room.location.toLowerCase().includes(searchText.toLowerCase());
      default:
        return true; // Trả về tất cả các phòng nếu không có tiêu chí nào được chọn
    }
  });

  const columns = [
    { field: 'roomId', headerName: 'ID', width: 100 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 100,
      renderCell: (params) => <Avatar alt="Hình ảnh phòng" src={params.value} variant="square" sx={{ width: 56, height: 56 }} />
    },
    { field: 'roomName', headerName: 'Tên phòng', width: 150 },
    { field: 'roomType', headerName: 'Loại phòng', width: 150 },
    { field: 'location', headerName: 'Vị trí', width: 150 },
    { field: 'price', headerName: 'Giá tiền', width: 100, 
    renderCell: (params) => (
      <Typography>{formatVND(params.value)}</Typography>
    ) },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <CircleIcon
            style={{ color: params.value === 1 ? 'green' : 'grey', cursor: 'pointer' }}
            // onClick={() => handleStatusClick(params.row.roomId)}
          />
        </IconButton>
      )
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
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        margin="normal"
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
        sx={{ maxWidth: '600px', marginBottom: '20px' }} // Giảm kích thước bằng cách sử dụng maxWidth
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
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
    </MainCard>
  );
}

export default RoomTable;
