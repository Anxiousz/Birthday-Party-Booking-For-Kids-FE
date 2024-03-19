import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import { getFeedbackList } from 'api/feedback';
import { format } from 'date-fns'; 

function FeedbackTable() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('rating');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const data = await getFeedbackList();
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };
  
    fetchFeedbackData();
  }, []);

  const filteredFeedbacks = feedbackData.filter((feedback) => {
    switch (searchCriteria) {
      case 'rating':
        // Chúng ta so sánh trực tiếp số rating với searchText, không cần chuyển đổi thành lowercase
        return feedback.rating === parseInt(searchText); // Chuyển searchText thành số để so sánh
      default:
        return true;
    }
  });

  return (
    <MainCard title="Danh Sách Feedback" contentSX={{ p: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
        <Select
          labelId="search-criteria-label"
          value={searchCriteria}
          label="Tiêu chí tìm kiếm"
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{ width: '300px', marginRight: '10px' }}
        >
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Tìm kiếm feedback"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FeedbackID</TableCell>
              <TableCell>PostID</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>CreatedBy</TableCell>
              <TableCell>CreatedAt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFeedbacks.map((feedback) => (
              <TableRow key={feedback.feedbackId}>
                <TableCell>{feedback.feedbackId}</TableCell>
                <TableCell>{feedback.postId}</TableCell>
                <TableCell>{feedback.comment}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>{feedback.createdBy}</TableCell>
                <TableCell>{format(new Date(post.createdAt), 'dd/MM/yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default FeedbackTable;
