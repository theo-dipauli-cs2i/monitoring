import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BarChart } from '@mui/x-charts';
import memoryData from './memoryData.json';
import { orange } from "@mui/material/colors";

export default function MemoryChart() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ mb: 1, fontSize: isMobile ? '1rem' : '1.25rem' }}>Utilisation Mémoire (%)</Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: memoryData.labels }]}
                    series={[{ data: memoryData.data, color: orange[500] }]}
                    width={isMobile ? 280 : 300}
                    height={isMobile ? 120 : 150}
                />
            </Box>
        </Box>
    );
}