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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllManager } from 'api/manager';
import { deletePackageById, getPackages } from 'api/packages';
import CreatePackageForm from './CreatePackageForm';
import EditPackageForm from './EditPackageForm';

function PackageTable() {
  const [managers, setManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [packages, setPackages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [searchCriteria, setSearchCriteria] = useState('packageName');

  const columns = [
    { field: 'packageId', headerName: 'ID', width: 100 },
    { field: 'packageName', headerName: 'Tên gói', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    { field: 'price', headerName: 'Giá', width: 130 },
    {
      field: 'action',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.packageId)} color="info">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleOpenEditDialog(params.row)}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </>
      ),
      sortable: false
    }
  ];

  useEffect(() => {
    reloadPackagesAndClearSelection();
  }, []);

  const reloadPackagesAndClearSelection = async () => {
    try {
      const updatedPackages = await getPackages();
      setPackages(
        updatedPackages.map((pkg, index) => ({
          ...pkg,
          id: index
        }))
      );
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu gói dịch vụ:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải lại dữ liệu gói dịch vụ.', severity: 'error' });
    }
  };

  const handleDelete = async (packageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) {
      try {
        await deletePackageById(packageId);
        setSnackbar({ open: true, message: 'Xóa gói dịch vụ thành công!', severity: 'success' });
        reloadPackagesAndClearSelection();
      } catch (error) {
        console.error('Lỗi khi xóa gói dịch vụ:', error);
        setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xóa gói dịch vụ.', severity: 'error' });
      }
    }
  };

  const handleOpenEditDialog = (packageData) => {
    setCurrentPackage(packageData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentPackage(null);
  };

  const filteredPackages = packages.filter((pkg) => {
      switch (searchCriteria) {
        case 'packageName':
          return pkg.packageName.toLowerCase().includes(searchText.toLowerCase());
        case 'price':
          return pkg.price.toString().toLowerCase().includes(searchText.toLowerCase());
        default:
          return true;
      }
  });

  return (
    <MainCard title="Danh sách Packages" contentSX={{ p: 2 }}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
            <Select
              labelId="search-criteria-label"
              value={searchCriteria}
              label="Tiêu chí tìm kiếm"
              onChange={(e) => setSearchCriteria(e.target.value)}
              sx={{ width: 300, marginBottom: 2 }}
            >
              <MenuItem value="packageName">Tên gói</MenuItem>
              <MenuItem value="price">Giá</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            {' '} {/* Thay đổi xs thành xs={6} để làm cho thanh tìm kiếm nhỏ lại */}
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Tìm kiếm Packages"
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
      </Grid>
      {/* Dialog thêm package mới */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tạo Package Mới</DialogTitle>
        <DialogContent>
          <CreatePackageForm
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo gói dịch vụ thành công', severity: 'success' });
              reloadPackagesAndClearSelection();
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} aria-labelledby="edit-dialog-title">
        <DialogTitle id="edit-dialog-title">Chỉnh Sửa Gói Dịch Vụ</DialogTitle>
        <DialogContent>
          {currentPackage && (
            <EditPackageForm
              packagesInfo={currentPackage}
              onSuccess={() => {
                handleCloseEditDialog();
                reloadPackagesAndClearSelection();
              }}
            />
          )}
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
              <TableCell>ID</TableCell>
              <TableCell>Tên gói</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPackages.map((row) => (
              <TableRow key={row.packageId}>
                <TableCell>{row.packageId}</TableCell>
                <TableCell>{row.packageName}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.packageId)} color="info">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => handleOpenEditDialog(row)}>
                    <ModeEditOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default PackageTable;
