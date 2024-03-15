import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, InputAdornment, IconButton, CardContent, Grid, Typography, Box, Drawer, Button } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { getAllAcccount, getRegisteredUser } from 'api/account';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import AccountUpdate from './AccountUpdate'; // Thêm import cho AcccountUpdate
import useAccountForm from 'hooks/useAccountForm';

function AccountTable() {
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAccountUpdate, setOpenAccountUpdate] = useState(false); // State để mở form AcccountUpdate
  const [selectedAccountId, setSelectedAccountId] = useState(null); // State để lưu ID của lái xe được chọn
  const [accounts, setAccounts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const AvatarCell = ({ value }) => (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar src={value} sx={{ width: 45, height: 45 }} />
      </Stack>
    </>
  );

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const data = await getRegisteredUser();
        setAccounts(data); // Giả sử dữ liệu trả về phù hợp với cấu trúc của bảng
      } catch (error) {
        console.error('Error fetching registered users:', error);
      }
    };

    fetchRegisteredUsers();
  }, []); // Chỉ chạy một lần khi component được mount

  const columns = [
    { field: 'accountId', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'userName', headerName: 'Tên người dùng', width: 150 },
    { field: 'phone', headerName: 'Số điện thoại', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 200 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      renderCell: (params) => (
        <div
          style={{
            height: '15px',
            width: '15px',
            backgroundColor: params.value ? 'green' : 'red',
            borderRadius: '50%'
          }}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="RemoveRedEyeOutlinedIcon"
            onClick={() => {
              setOpenAccountUpdate(true);
              setSelectedAccountId(params.row.accountId);
            }}
            color="info"
          >
            <RemoveRedEyeOutlinedIcon />
          </IconButton>
        </>
      ),
      sortable: false
    }
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handlePageChange = (newPage) => {
    getAccounts(newPage, pagination.pageSize);
  };



  return (
    <MainCard title="Danh sách Account" contentSX={{ p: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Tìm kiếm Account theo tên"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{ width: '300px' }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" startIcon={<AddIcon />} onClick={toggleDrawer(true)}>
              Thêm Account
            </Button>
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            width: 500,
            margin: 0,
            borderRadius: 0,
            maxHeight: '100%',
            '& .MuiDrawer-paper': {
              width: 500,
              margin: 0,
              borderRadius: 0,
              maxHeight: '100%'
            }
          }}
        >
          {/* <AccountForm setIsOpen={setIsOpen} setReload={setReload} /> */}
        </Drawer>
        {/* Thêm component AcccountUpdate và truyền AcccountId vào nó */}
        <Drawer
          anchor="right"
          open={openAccountUpdate}
          onClose={() => setOpenAccountUpdate(false)}
          sx={{
            width: 500,
            margin: 0,
            borderRadius: 0,
            maxHeight: '100%',
            '& .MuiDrawer-paper': {
              width: 500,
              margin: 0,
              borderRadius: 0,
              maxHeight: '100%'
            }
          }}
        >
          <AccountUpdate accountId={selectedAccountId} />
        </Drawer>
      </CardContent>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={accounts}
          columns={columns}
          // pageSize={pagination.pageSize}
          // rowCount={pagination.totalRows}
          pagination
          // page={pagination.currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </MainCard>
  );
}

export default AccountTable;
