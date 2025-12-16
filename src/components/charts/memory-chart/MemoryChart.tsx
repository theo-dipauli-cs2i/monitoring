import { Box, Typography } from "@mui/material";
import { BarChart } from '@mui/x-charts';
import memoryData from './memoryData.json';

export default function MemoryChart() {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Utilisation Mémoire (%)</Typography>
            <BarChart
                xAxis={[{ scaleType: 'band', data: memoryData.labels }]}
                series={[{ data: memoryData.data }]}
                width={300}
                height={150}
            />
        </Box>
    );
}