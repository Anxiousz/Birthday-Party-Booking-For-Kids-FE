import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EnhancedTable from './RoomTable';



export default function RoomManage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTable />
      </Paper>
    </Box>
  );
}
