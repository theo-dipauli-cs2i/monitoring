import { Box, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'preact/hooks';
import ClientChart from '../components/charts/client-chart/client-chart';
import CommandeChart from '../components/charts/commande-chart/commande-chart';
import ChiffreAffaireChart from '../components/charts/chiffre-affaire-chart/chiffre-affaire-chart';
import HttpStatusChart from '../components/charts/http-status-chart/HttpStatusChart';
import CpuChart from '../components/charts/cpu-chart/CpuChart';
import MemoryChart from '../components/charts/memory-chart/MemoryChart';
import DiskChart from '../components/charts/disk-chart/DiskChart';
import LogsList from '../components/charts/logs-table/LogsList';

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartVisibility, setChartVisibility] = useState<
    Record<string, boolean>
  >({
    clientChart: true,
    commandeChart: true,
    chiffreAffaireChart: true,
    httpStatusChart: true,
    logsList: true,
    cpuChart: true,
    memoryChart: true,
    diskChart: true,
  });

  // Load visibility preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('chartVisibility');
    if (stored) {
      try {
        setChartVisibility(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse chartVisibility from localStorage', e);
      }
    }
  }, []);

  // Listen for changes from other tabs/settings page
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'chartVisibility' && e.newValue) {
        try {
          setChartVisibility(JSON.parse(e.newValue));
        } catch (e) {
          console.error(
            'Failed to parse chartVisibility from storage event',
            e
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          {(chartVisibility.clientChart ||
            chartVisibility.commandeChart ||
            chartVisibility.chiffreAffaireChart) && (
            <Paper sx={{ p: { xs: 1, sm: 2 } }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: 1, sm: 2 },
                  justifyContent: 'space-between',
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                {chartVisibility.clientChart && (
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      minWidth: 0,
                      width: '100%',
                    }}
                  >
                    <ClientChart />
                  </Box>
                )}
                {chartVisibility.commandeChart && (
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      minWidth: 0,
                      width: '100%',
                    }}
                  >
                    <CommandeChart />
                  </Box>
                )}
                {chartVisibility.chiffreAffaireChart && (
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      minWidth: 0,
                      width: '100%',
                    }}
                  >
                    <ChiffreAffaireChart />
                  </Box>
                )}
              </Box>
            </Paper>
          )}
          {(chartVisibility.httpStatusChart || chartVisibility.logsList) && (
            <Paper sx={{ p: { xs: 1, sm: 2 }, mt: 2 }}>
              {chartVisibility.httpStatusChart && (
                <Box sx={{ overflowX: 'auto' }}>
                  <HttpStatusChart />
                </Box>
              )}
              {chartVisibility.logsList && (
                <Box sx={{ overflowX: 'auto' }}>
                  <LogsList />
                </Box>
              )}
            </Paper>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {(chartVisibility.cpuChart ||
            chartVisibility.memoryChart ||
            chartVisibility.diskChart) && (
            <Paper sx={{ p: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {chartVisibility.cpuChart && <CpuChart />}
                {chartVisibility.memoryChart && <MemoryChart />}
                {chartVisibility.diskChart && <DiskChart />}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
