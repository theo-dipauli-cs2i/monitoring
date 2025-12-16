import { Box, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts';
import httpStatusData from './httpStatus.json';

export default function HttpStatusChart() {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Taux des Status HTTP des Requêtes</Typography>
            <PieChart
                series={[{
                    data: httpStatusData,
                }]}
                width={400}
                height={200}
            />
        </Box>
    );
}