import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PostADTable from './PostADTable';



export default function PostManageAD() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <PostADTable />
      </Paper>
    </Box>
  );
}
