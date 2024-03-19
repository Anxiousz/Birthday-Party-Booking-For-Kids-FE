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
import { getMenuByPartyHostId, deleteMenu } from 'api/menu';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateMenu from './CreateMenu';
import EditFoodForm from './EditFoodForm';
import { getUserId } from 'utils/userId';
import { formatVND } from 'utils/format';

function MenuTable() {
  const [menu, setMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchText, setSearchText] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' }); // New state for snackbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const partyHostId = getUserId();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuData = await getMenuByPartyHostId(partyHostId);
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

  const reloadMenuAndClearSelection = async () => {
    try {
      const menuData = await getMenuByPartyHostId(partyHostId);
      setMenu(menuData);
      setSelectedFoodId(null);
    } catch (error) {
      console.error('Error reloading menu data:', error);
      setSnackbar({ open: true, message: 'Lỗi khi tải lại dữ liệu menu', severity: 'error' });
    }
  };

  const handleMenuIconClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenEditDialog = (menuData) => {
    setCurrentMenu(menuData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentMenu(null);
  };

  const columns = [
    { field: 'foodOrderId', headerName: 'ID', width: 100 },
    { field: 'foodName', headerName: 'Tên Món Ăn', width: 100 },
    { field: 'description', headerName: 'Mô Tả', width: 150 },
    { field: 'price', headerName: 'Giá Tiền', width: 100, renderCell: (params) => <Typography>{formatVND(params.value)}</Typography> },
    {
      field: 'image',
      headerName: 'Hình Ảnh',
      width: 100,
      renderCell: (params) => <Avatar alt="Hình ảnh món ăn" src={params.value} variant="square" sx={{ width: 50, height: 50 }} />
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
        <Grid item>
          <IconButton
            variant="contained"
            size="small"
            title="Add Menu"
            aria-label="Add Menu"
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
        <DialogTitle>Tạo Món Ăn Mới</DialogTitle>
        <DialogContent>
          <CreateMenu
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo  Món Ăn thành công', severity: 'success' });
              reloadMenuAndClearSelection(); // Fetch data after successful creation
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} aria-labelledby="edit-dialog-title">
        <DialogTitle id="edit-dialog-title">Chỉnh Sửa Món Ăn</DialogTitle>
        <DialogContent>
          {currentMenu && (
            <EditFoodForm
              foodInfo={currentMenu}
              onSuccess={() => {
                handleCloseEditDialog();
                reloadMenuAndClearSelection();
              }}
            />
          )}
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
            {filteredMenus.map((row) => (
              <TableRow key={row.foodOrderId}>
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

export default MenuTable;
