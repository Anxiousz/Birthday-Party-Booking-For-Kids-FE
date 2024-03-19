import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuADTable from './MenuADTable';



export default function MenuManageAD() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MenuADTable />
      </Paper>
    </Box>
  );
}