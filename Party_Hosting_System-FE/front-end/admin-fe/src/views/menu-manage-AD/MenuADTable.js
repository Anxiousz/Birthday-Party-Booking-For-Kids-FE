import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Avatar } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import { getAllFoodByAdmin} from 'api/menuadmin';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { formatVND } from 'utils/format';

function MenuADTable() {
  const [menu, setMenu] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuData = await getAllFoodByAdmin(); // Gọi hàm mà không cần truyền tham số
        setMenu(menuData);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
  
    fetchMenuData();
  }, []);
  if (!menu) {
    return <div>Loading...</div>;
  }

  const filteredMenus = menu.filter((menu) => {
    switch (searchCriteria) {
      case 'foodName':
        return menu.foodName.toLowerCase().includes(searchText.toLowerCase());
      default:
        return true;
    }
  });

  const columns = [
    { field: 'foodOrderId', headerName: 'ID', width: 100 },
    { field: 'foodName', headerName: 'Tên Món Ăn', width: 100 },
    { field: 'description', headerName: 'Mô Tả', width: 150 },
    { field: 'price', headerName: 'Giá Tiền', width: 100, renderCell: (params) => <Typography>{formatVND(params.value)}</Typography> },
      {
      field: 'partyHostId',
      headerName: 'PartyHostID ',
      width: 80,
      renderCell: (params) => (
        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{params.value}</Typography>
      )
    },
    {
      field: 'image',
      headerName: 'Hình Ảnh',
      width: 100,
      renderCell: (params) => <Avatar alt="Hình ảnh món ăn" src={params.value} variant="square" sx={{ width: 50, height: 50 }} />
    },
  ];

  return (
    <MainCard title="Danh Sách Menu" contentSX={{ p: 2 }}>
    <FormControl fullWidth>
        <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
        <Select
          labelId="search-criteria-label"
          value={searchCriteria}
          label="Tiêu chí tìm kiếm"
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{ width: '300px', marginBottom: '20px', marginRight: '10px' }}
        >
          <MenuItem value="foodName">Tên Món Ăn</MenuItem>
        </Select>
      </FormControl>
      <Grid item container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Tìm kiếm Menu"
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
        </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Món Ăn</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Giá Tiền</TableCell>
              <TableCell>PartyHostID</TableCell>
              <TableCell>Hình Ảnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMenus.map((menu) => (
              <TableRow key={menu.foodOrderId}>
                <TableCell>{menu.foodOrderId}</TableCell>
                <TableCell>{menu.foodName}</TableCell>
                <TableCell>{menu.description}</TableCell>
                <TableCell>{formatVND(menu.price)}</TableCell>
                <TableCell>{menu.partyHostId}</TableCell>
                <TableCell>
                  <Avatar alt="Hình ảnh món ăn" src={menu.image} variant="square" sx={{ width: 50, height: 50 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default MenuADTable;
