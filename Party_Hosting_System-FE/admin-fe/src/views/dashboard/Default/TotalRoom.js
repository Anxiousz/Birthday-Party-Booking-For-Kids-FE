import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';


import { getTotalRoom } from 'api/statistic';
import { useEffect } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalRoom = ({ isLoading }) => {
  const [totalRooms, setTotalRooms] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTotalRooms = async () => {
      const data = await getTotalRoom(); // Gọi hàm totalRoom để lấy dữ liệu
      console.log('totalRooms', data);
      if (data !== null) {
        setTotalRooms(data); // Cập nhật state với dữ liệu nhận được
      }
    };

    fetchTotalRooms();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                    {totalRooms ? `${totalRooms}` : 'null'}
                  </Typography>{' '}
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.secondary[200]
                  }}
                >
                  Tổng số Phòng
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalRoom.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalRoom;
