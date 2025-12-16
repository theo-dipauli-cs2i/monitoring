import { Box, Typography } from "@mui/material";
import { LineChart } from '@mui/x-charts';
import cpuData from './cpuData.json';

export default function CpuChart() {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Utilisation CPU (%)</Typography>
            <LineChart
                xAxis={[{ data: cpuData.labels, scaleType: 'point' }]}
                series={[{ data: cpuData.data, area: true }]}
                width={300}
                height={150}
            />
        </Box>
    );
}