import { Box, Typography } from "@mui/material";
import { SparkLineChart } from '@mui/x-charts';
import data from './commande.json';
import React from "preact/compat";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CommandeChart() {
    const [showHighlight] = React.useState(true);
    const [showTooltip] = React.useState(true);
    const [dateIndex, setDateIndex] = React.useState<null | number>(null);
    const recentData = data.slice(-10);
    const dates = recentData.map((d: any) => d.date);
    const commandes = recentData.map((d: any) => d.commandes);
    return (
        <Box sx={{ display: 'flex', flex: 1 }}>
            <Box sx={{ mr: 2 }}>
                <Typography variant="h6" sx={{
                    fontWeight: 500,
                    fontSize: '1.5  rem',
                    pt: 1,
                }}> <ShoppingCartIcon width="8px"
                    height="12px" /> commandes</Typography>
                <Typography variant="h4">{commandes[dateIndex ?? commandes.length - 1]}</Typography>
            </Box>
            <Box sx={{ flex: 1, mt: 5 }}>
                <SparkLineChart
                    data={commandes}
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