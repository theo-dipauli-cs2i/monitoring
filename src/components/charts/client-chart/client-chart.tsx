import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts';
import PeopleIcon from '@mui/icons-material/People';
import data from '../../../data/client.json';
import React from 'preact/compat';
import { red } from '@mui/material/colors';

export default function ClientChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showHighlight] = React.useState(true);
  const [showTooltip] = React.useState(true);
  const [dateIndex, setDateIndex] = React.useState<null | number>(null);
  const recentData = data.slice(-10);
  const dates = recentData.map((d: any) => d.date);
  const clients = recentData.map((d: any) => d.clients);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        flex: 1,
        width: '100%',
      }}
    >
      <Box sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 1 : 0 }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 500,
            fontSize: isMobile ? '1rem' : '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {' '}
          <PeopleIcon /> clients
        </Typography>
        <SparkLineChart
          data={clients}
          area
          width={isMobile ? 150 : 200}
          height={50}
          color={red[500]}
          showHighlight={showHighlight}
          showTooltip={showTooltip}
          xAxis={{ id: 'date-axis', data: dates }}
          onHighlightedAxisChange={(axisItems) => {
            setDateIndex(axisItems[0]?.dataIndex ?? null);
          }}
          highlightedAxis={
            dateIndex === null
              ? []
              : [{ axisId: 'date-axis', dataIndex: dateIndex }]
          }
          axisHighlight={{ x: 'line' }}
        />
      </Box>
      <Box sx={{ flex: 1, mt: isMobile ? 1 : 5 }}>
        <Typography variant={isMobile ? 'h5' : 'h4'}>
          {clients[dateIndex ?? clients.length - 1]}
        </Typography>
        {/* <SparkLineChart
                    data={clients}
                    area
                    width={200}
                    height={50}
                    color={red[500]}
                    showHighlight={showHighlight}
                    showTooltip={showTooltip}
                    xAxis={{ id: 'date-axis', data: dates }}
                    onHighlightedAxisChange={(axisItems) => {
                        setDateIndex(axisItems[0]?.dataIndex ?? null);
                    }}
                    highlightedAxis={
                        dateIndex === null
                            ? []
                            : [{ axisId: 'date-axis', dataIndex: dateIndex }]
                    }
                    axisHighlight={{ x: 'line' }}
                /> */}
      </Box>
    </Box>
  );
}
