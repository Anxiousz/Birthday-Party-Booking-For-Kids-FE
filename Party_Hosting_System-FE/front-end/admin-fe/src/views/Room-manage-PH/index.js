import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import RoomTablePH from './RoomTablePH';



export default function RoomManagePH() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <RoomTablePH />
      </Paper>
    </Box>
  );
}
