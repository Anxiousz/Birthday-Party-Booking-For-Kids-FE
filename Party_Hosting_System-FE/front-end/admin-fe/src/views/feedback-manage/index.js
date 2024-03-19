import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FeedbackTable from './FeedbackTable';

export default function FeedbackManage() {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <FeedbackTable />
      </Paper>
    </Box>
  );
}