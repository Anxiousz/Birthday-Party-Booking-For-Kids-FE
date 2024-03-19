import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PostTable from './PostTable';



export default function PostManage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <PostTable />
      </Paper>
    </Box>
  );
}
