import { Box, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts';
import diskData from './diskData.json';

export default function DiskChart() {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>Utilisation Disque (%)</Typography>
            <PieChart
                series={[{
                    data: diskData,
                }]}
                width={300}
                height={150}
            />
        </Box>
    );
}