import { Box, Typography } from "@mui/material";
import { SparkLineChart } from '@mui/x-charts';
import PeopleIcon from '@mui/icons-material/People';
import data from './client.json';
import React from "preact/compat";
import { red } from "@mui/material/colors";

export default function ClientChart() {
    const [showHighlight] = React.useState(true);
    const [showTooltip] = React.useState(true);
    const [dateIndex, setDateIndex] = React.useState<null | number>(null);
    const recentData = data.slice(-10);
    const dates = recentData.map((d: any) => d.date);
    const clients = recentData.map((d: any) => d.clients);
    return (
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Box sx={{ mr: 2 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 500,
                    fontSize: '1.5  rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}> <PeopleIcon /> clients</Typography>
                <SparkLineChart
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
                />
            </Box>
            <Box sx={{ flex: 1, mt: 5 }}>
                <Typography variant="h4">{clients[dateIndex ?? clients.length - 1]}</Typography>
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
    )
}