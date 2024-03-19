import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone'; // thêm phần icon vào đây
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import { useEffect, useState } from 'react';
import { getTotalAccount } from 'api/statistic';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
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
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  },
  
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
  const [totalAccount, setTotalAccount] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTotalAccount = async () => {
      const data = await getTotalAccount();
        setTotalAccount(data); 
    };
    fetchTotalAccount();
  }, []);


  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container alignItems="center">
              <Grid item>
                <SupervisorAccountIcon sx={{ fontSize: '3rem' }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                  {totalAccount ? `${totalAccount}` : 'null'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: theme.palette.warning.dark,
                  opacity: 0.4 // Thêm thuộc tính opacity để làm cho chữ mờ đi
                }}
              >
                Tổng số tài khoản
              </Typography>
            </Grid>
          </Box>


          
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
