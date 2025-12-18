import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import cpuData from './cpuData.json';
import { purple } from '@mui/material/colors';

export default function CpuChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
        variant='h6'
        sx={{ mb: 1, fontSize: isMobile ? '1rem' : '1.25rem' }}
      >
        Utilisation CPU (%)
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: cpuData.labels }]}
          series={[{ data: cpuData.data, color: purple[500] }]}
          width={isMobile ? 280 : 300}
          height={isMobile ? 120 : 150}
        />
      </Box>
    </Box>
  );
}
