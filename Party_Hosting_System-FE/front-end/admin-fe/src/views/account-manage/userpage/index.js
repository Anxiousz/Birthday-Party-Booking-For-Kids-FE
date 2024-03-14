import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import UserTable from './UserTable';
// import PackageTable from 'views/packages-manage/PackagesTable';
// Import của AccountTableManage đã được loại bỏ

export default function UserPage() {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
       <UserTable />
      </Paper>
    </Box>
  );
}
