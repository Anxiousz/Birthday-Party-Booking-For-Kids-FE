import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { getAllPostsByPartyHostId } from '../../api/post'; // Đảm bảo đường dẫn đúng
import { getUserId } from 'utils/userId';
import { formatDate } from 'utils/format';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { deletePostById } from 'api/post';
import EditPostForm from './EditPostForm';
import CreatePost from './CreatePost';

export default function PostTable() {
  const [posts, setPosts] = useState([]);
  const partyHostId = getUserId();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [EditPostDialog, setEditPostDialog] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPostsByPartyHostId(partyHostId);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenConfirmDialog = (postId) => {
    setOpenConfirmDialog(true);
    setPostIdToDelete(postId);
  };

  const handleDelete = async () => {
    try {
      await deletePostById(postIdToDelete);
      console.log(`Post with ID ${postIdToDelete} has been deleted.`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postIdToDelete));
      setOpenConfirmDialog(false); // Đóng Dialog xác nhận
      setPostIdToDelete(null); // Xóa postId khỏi trạng thái
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleOpenEditDialog = (postData) => {
    setCurrentPost(postData);
    setOpenEditDialog(true);
  };

  const handleEditSuccess = () => {
    setOpenEditDialog(false);
    setCurrentPost(null);
    reloadPostAndClearSelection(); // Gọi hàm này để làm mới dữ liệu
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentPost(null);
  };

  const handleCreateSuccess = async () => {
    setOpenDialog(false); // Đóng dialog
    await reloadPostAndClearSelection(); // Làm mới danh sách bài đăng
  };

  const reloadPostAndClearSelection = async () => {
    try {
      const postData = await getAllPostsByPartyHostId(partyHostId);
      setPosts(postData);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu bài đăng:', error);
    }
  };

  return (
    <>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.postId} sx={{ maxWidth: 2000, mb: 2, height: '100vh' }}>
              <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={6}>
                    <CardMedia
                      component="img"
                      alt={post.title}
                      image={post.image || '/static/images/cards/contemplative-reptile.jpg'} // Sử dụng hình ảnh mặc định nếu post không có hình
                    />
                    {/* <CardMedia
                      component="img"
                      alt={post.title}
                      image="https://opreviews.anime-pictures.net/921/921a7b85d77cdc6456a0e6ace3b3aca8_bp.jpg.avif" // Sử dụng hình ảnh mặc định nếu post không có hình
                    /> */}
                  </Grid>
                  <Grid item xs={6}>
                    <CardContent>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h2" component="div">
                          {post.title}
                        </Typography>
                        <div>
                          {' '}
                          <IconButton
                            variant="outlined"
                            color="error"
                            onClick={() => handleOpenConfirmDialog(post.postId)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton variant="outlined" color="success" onClick={() => handleOpenEditDialog(post)} aria-label="delete">
                            <BorderColorIcon />
                          </IconButton>
                        </div>
                      </div>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(post.createdAt)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Được tạo bởi: {post.createdBy}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {post.updatedAt ? (
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(post.updatedAt)}
                            </Typography>
                          ) : (
                            <></>
                          )}

                          {post.updatedBy ? (
                            <Typography variant="body2" color="text.secondary">
                              Được cập nhật bởi: {post.updatedBy}
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </Grid>
                      </Grid>
                      <Box sx={{ pt: 2 }}>
                        {' '}
                        {/* Thêm khoảng cách ở đây */}
                        <Typography variant="subtitle1" color="text.secondary">
                          {post.context}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          ))
        ) : (
          <Button
            variant="contained" // Sử dụng variant="contained" để nút có màu nền
            color="primary" // Đặt màu chính của theme làm màu nền cho nút
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              p: 0, // Loại bỏ padding
              m: 0, // Loại bỏ margin
              boxShadow: 'none', // Loại bỏ bóng
              '&:hover': {
                boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1)' // Tùy chỉnh bóng khi hover
              },
              borderRadius: 2, // Tùy chỉnh độ cong của viền
              textTransform: 'none', // Giữ nguyên chữ hoa và thường
              fontSize: '1rem', // Đặt kích thước font
              padding: '6px 12px' // Đặt padding
            }}
          >
            Create
          </Button>
        )}
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tạo Post Mới</DialogTitle>
        <DialogContent>
          <CreatePost onSuccess={handleCreateSuccess} />
        </DialogContent>
      </Dialog>

      {openEditDialog && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogContent>{currentPost && <EditPostForm postInfo={currentPost} onSuccess={handleEditSuccess} />}</DialogContent>
        </Dialog>
      )}
      <Dialog>
        <CreatePost
          onSuccess={() => {
            setOpenDialog(false);
            setSnackbar({ open: true, message: 'Tạo Post thành công', severity: 'success' });
            reloadMenuAndClearSelection();
          }}
        />
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận xóa bài đăng'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Bạn có chắc chắn muốn xóa bài đăng này không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Không</Button>
          <Button onClick={handleDelete}>Có</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
