import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import httpStatusData from '../../../data/httpStatus.json';

export default function HttpStatusChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        variant='h6'
        sx={{ mb: 2, fontSize: isMobile ? '1rem' : '1.25rem' }}
      >
        Taux des Status HTTP des Requêtes
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PieChart
          series={[
            {
              data: httpStatusData,
            },
          ]}
          width={isMobile ? 280 : 400}
          height={isMobile ? 150 : 200}
        />
      </Box>
    </Box>
  );
}
