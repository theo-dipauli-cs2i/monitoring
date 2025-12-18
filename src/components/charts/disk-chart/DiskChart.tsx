import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import diskData from './diskData.json';

export default function DiskChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        variant='h6'
        sx={{ mb: 1, fontSize: isMobile ? '1rem' : '1.25rem' }}
      >
        Utilisation Disque (%)
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PieChart
          series={[
            {
              data: diskData,
            },
          ]}
          width={isMobile ? 280 : 300}
          height={isMobile ? 120 : 150}
        />
      </Box>
    </Box>
  );
}
