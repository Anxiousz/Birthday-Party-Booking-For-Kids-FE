import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PackageTable from './PackagesTable';





export default function PackagesManage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <PackageTable />
      </Paper>
    </Box>
  );
}
