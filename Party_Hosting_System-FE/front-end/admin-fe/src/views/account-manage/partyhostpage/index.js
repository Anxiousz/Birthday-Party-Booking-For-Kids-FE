import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PartyHostTable from './PartyHostTable';
// import PackageTable from 'views/packages-manage/PackagesTable';
// Import của AccountTableManage đã được loại bỏ

export default function PartyHostPage() {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
       <PartyHostTable />
      </Paper>
    </Box>
  );
}
