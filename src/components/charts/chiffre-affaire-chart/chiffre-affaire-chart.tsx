import { Box, Typography } from "@mui/material";
import { SparkLineChart } from '@mui/x-charts';
import EuroIcon from '@mui/icons-material/Euro';
import data from './chiffre-affaire.json';
import React from "preact/compat";

export default function chiffreAffaireChart() {
    const [showHighlight] = React.useState(true);
    const [showTooltip] = React.useState(true);
    const [dateIndex, setDateIndex] = React.useState<null | number>(null);
    const recentData = data.slice(-10);
    const dates = recentData.map((d: any) => d.date);
    const chiffreAffaires = recentData.map((d: any) => d.chiffreAffaires);
    return (
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Box sx={{ mr: 2 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 500,
                    fontSize: '1.5  rem',
                    pt: 1,
                }}> <EuroIcon width="8px"
                    height="12px" /> chiffre-affaires</Typography>
                <Typography variant="h4">{chiffreAffaires[dateIndex ?? chiffreAffaires.length - 1]}</Typography>
            </Box>
            <Box sx={{ flex: 1, mt: 5 }}>
                <SparkLineChart
                    data={chiffreAffaires}
                    area
                    width={200}
                    height={50}
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
        </Box>
    )
}