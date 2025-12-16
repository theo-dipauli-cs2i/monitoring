import { Box, Grid, Paper } from "@mui/material";
import ClientChart from "../components/charts/client-chart/client-chart";
import CommandeChart from "../components/charts/commande-chart/commande-chart";
import ChiffreAffaireChart from "../components/charts/chiffre-affaire-chart/chiffre-affaire-chart";
import HttpStatusChart from "../components/charts/http-status-chart/HttpStatusChart";
import CpuChart from "../components/charts/cpu-chart/CpuChart";
import MemoryChart from "../components/charts/memory-chart/MemoryChart";
import DiskChart from "../components/charts/disk-chart/DiskChart";
import LogsList from "../components/charts/logs-table/LogsList";


export default function Dashboard() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={8}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flex: 1 }}><ClientChart /></Box>
                            <Box sx={{ display: 'flex', flex: 1 }}><CommandeChart /></Box>
                            <Box sx={{ display: 'flex', flex: 1 }}><ChiffreAffaireChart /></Box>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <HttpStatusChart />
                        <LogsList />
                    </Paper>
                </Grid>
                <Grid size={4}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <CpuChart />
                            <MemoryChart />
                            <DiskChart />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}