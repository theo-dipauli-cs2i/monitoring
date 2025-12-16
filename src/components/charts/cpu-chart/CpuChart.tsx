import { Box, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts';
import cpuData from './cpuData.json';
import { orange, purple } from "@mui/material/colors";

export default function CpuChart() {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Utilisation CPU (%)</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', data: cpuData.labels }]}
                series={[{ data: cpuData.data, color: purple[500] }]}
                width={300}
                height={150}
            />
        </Box>
    );
}