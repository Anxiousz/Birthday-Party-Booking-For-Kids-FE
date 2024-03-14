import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

//Call API
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
    background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const TotalAccount = ({ isLoading }) => {
  const theme = useTheme();
  const [totalAccount, setTotalAccount] = useState(null);

  useEffect(() => {
    const fetchTotalAccounts = async () => {
      try {
        const response = await getTotalAccount();
        console.log('API Response:', response); // Kiểm tra dữ liệu trả về từ API
        if (response && response.total !== undefined) {
          setTotalAccount(response.total);
        } else {
          // Xử lý trường hợp không nhận được dữ liệu mong đợi
          console.error('Error fetching total accounts data:', response ? 'Missing total in response' : 'Response is undefined');
        }
      } catch (error) {
        console.error('Error fetching total accounts data:', error);
      }
    };

    fetchTotalAccounts();
  }, []);

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              {totalAccount && (
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.dark
                      }}
                    >
                      <AccountBalanceWalletIcon fontSize="inherit" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45
                    }}
                    primary={<Typography variant="h4">{totalAccount}</Typography>}
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.grey[500],
                          mt: 0.5
                        }}
                      >
                        Tổng số tài khoản
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalAccount.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalAccount
;