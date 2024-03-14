import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import StaffTable from './StaffTable';
// import PackageTable from 'views/packages-manage/PackagesTable';
// Import của AccountTableManage đã được loại bỏ

export default function StaffPage() {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
       <StaffTable />
      </Paper>
    </Box>
  );
}
