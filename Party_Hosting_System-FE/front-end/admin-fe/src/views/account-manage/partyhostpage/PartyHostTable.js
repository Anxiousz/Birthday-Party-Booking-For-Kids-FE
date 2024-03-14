import { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  CardContent,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { getPartyHosts, deletePartyHostById } from 'api/account'; // Giả định đường dẫn này đúng
import CreatePartyHostForm from './CreatePartyHostForm'; // Giả định bạn đã tạo form này
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

function PartyHostTable() {
  const [partyHosts, setPartyHosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // Có thể là 'success', 'error', 'warning', 'info'
  });

  const reloadPartyHosts = async () => {
    try {
      const updatedPartyHosts = await getPartyHosts();
      setPartyHosts(updatedPartyHosts);
    } catch (error) {
      console.error('Lỗi khi tải lại dữ liệu chủ tiệc:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải lại dữ liệu chủ tiệc.', severity: 'error' });
    }
  };

  useEffect(() => {
    reloadPartyHosts();
  }, []);

  const handleDelete = async (partyHostId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chủ tiệc này không?')) {
      try {
        await deletePartyHostById(partyHostId);
        setSnackbar({ open: true, message: 'Xóa chủ tiệc thành công!', severity: 'success' });
        reloadPartyHosts();
      } catch (error) {
        console.error('Lỗi khi xóa chủ tiệc:', error);
        setSnackbar({ open: true, message: 'Có lỗi xảy ra khi xóa chủ tiệc.', severity: 'error' });
      }
    }
  };

  const filteredPartyHosts = partyHosts.filter((host) => {
    return host.userName.toLowerCase().includes(searchText.toLowerCase()) || host.email.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <MainCard title="Danh sách PartyHost" contentSX={{ p: 2 }}>
      <CardContent>
        <Grid
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'wrap',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: '-16px',
            width: 'calc(100% + 16px)',
            marginLeft: '-16px',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              placeholder="Tìm kiếm PartyHost"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{ maxWidth: '600px', marginBottom: '20px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconButton
              variant="contained"
              size="small"
              title="Thêm PartyHost"
              aria-label="Add PartyHost"
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                minWidth: 'auto',
                boxShadow: 'none',
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1565c0'
                }
              }}
              onClick={() => setOpenDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thêm PartyHost Mới</DialogTitle>
        <DialogContent>
          <CreatePartyHostForm
            onSuccess={() => {
              setOpenDialog(false);
              setSnackbar({ open: true, message: 'Tạo PartyHost mới thành công', severity: 'success' });
              reloadPartyHosts(); // Cần định nghĩa hàm này để tải lại danh sách
            }}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PartyHostID</TableCell>
              <TableCell>StaffID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tên PartyHost</TableCell>
              <TableCell>Mật khẩu</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Gói Dịch Vụ</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPartyHosts.map((row) => (
              <TableRow key={row.partyHostId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>{row.partyHostId}</div>
                </TableCell>
                <TableCell>{row.staffId}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.userName}</TableCell>
                <TableCell>{row.password}</TableCell>
                <TableCell>{new Date(row.birthDay).toLocaleDateString()}</TableCell>
                <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row.phone}
                </TableCell>
                <TableCell>{row.gender === '1' ? 'Nữ' : 'Nam'}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.packageId}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircleIcon style={{ color: row.status === 1 ? 'green' : 'grey', cursor: 'pointer' }} />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton aria-label="delete" onClick={() => handleDelete(row.partyHostId)} color="info">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

export default PartyHostTable;
