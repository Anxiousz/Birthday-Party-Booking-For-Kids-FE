import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from '../../ui-component/cards/MainCard';
import { getAllPosts } from '../../api/postadmin'; // Đảm bảo đường dẫn đúng
import { format } from 'date-fns'; // Thư viện để format ngày tháng

function PostADTable() {
  const [posts, setPosts] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const postData = await getAllPosts();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts data:', error);
      }
    };

    fetchPostsData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    switch (searchCriteria) {
      case 'title':
        return post.title.toLowerCase().includes(searchText.toLowerCase());
      default:
        return true;
    }
  });

  return (
    <MainCard title="Danh Sách Bài Viết" contentSX={{ p: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="search-criteria-label">Tiêu chí tìm kiếm</InputLabel>
        <Select
          labelId="search-criteria-label"
          value={searchCriteria}
          label="Tiêu chí tìm kiếm"
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{ width: '300px', marginRight: '10px' }}
        >
          <MenuItem value="title">Tiêu đề</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Tìm kiếm bài viết"
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
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Ngày cập nhật</TableCell>
              <TableCell>Người cập nhật</TableCell>
              <TableCell>Hình ảnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.postId}>
                <TableCell>{post.postId}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.context}</TableCell>
                <TableCell>{format(new Date(post.createdAt), 'dd/MM/yyyy')}</TableCell>
                <TableCell>{post.createdBy}</TableCell>
                <TableCell>{post.updatedAt ? format(new Date(post.updatedAt), 'dd/MM/yyyy') : ''}</TableCell>
                <TableCell>{post.updatedBy}</TableCell>
                <TableCell>
                  <img src={post.image} alt="Post" style={{ width: 50, height: 50 }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default PostADTable;