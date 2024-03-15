import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import TotalPackage from './TotalPackage';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import TotalRoom from './TotalRoom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} className="container">
          <Grid item lg={4} md={4} sm={4} xs={12} className="item">
            <TotalRoom isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12} className="item">
            <TotalPackage isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12} className="item">
            <TotalIncomeLightCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
