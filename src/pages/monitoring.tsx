import {
    Box,
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
    useTheme,
    Chip,
    Stack,
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import StorageIcon from '@mui/icons-material/Storage';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import NetworkMap from '../components/monitoring/NetworkMap';
import monitoringData from '../data/monitoring.json';



const CustomTreeItem = ({ item }: { item: any }) => (
    <TreeItem itemId={item.id} label={item.label}>
        {item.children?.map((child: any) => (
            <CustomTreeItem key={child.id} item={child} />
        ))}
    </TreeItem>
);

export default function MonitoringPage() {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 4, color: theme.palette.text.primary }}
            >
                Surveillance Système
            </Typography>

            {/* Top Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            color: '#fff',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box>
                                    <Typography variant='overline' sx={{ opacity: 0.8 }}>
                                        État du Système
                                    </Typography>
                                    <Typography variant='h5' fontWeight='bold'>
                                        98.9% Disponibilité
                                    </Typography>
                                </Box>
                                <MonitorHeartIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <SparkLineChart
                                    data={[1, 4, 2, 5, 7, 2, 4, 6]}
                                    height={50}
                                    color={'#fff'}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                            color: '#fff',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box>
                                    <Typography variant='overline' sx={{ opacity: 0.8 }}>
                                        Nœuds Actifs
                                    </Typography>
                                    <Typography variant='h5' fontWeight='bold'>
                                        42 / 45
                                    </Typography>
                                </Box>
                                <StorageIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                <Chip
                                    size='small'
                                    label='3 Maintenance'
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                                />
                                <Chip
                                    size='small'
                                    label='Systèmes OK'
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card
                        elevation={3}
                        sx={{
                            borderRadius: 4,
                            bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box>
                                    <Typography variant='overline' color='textSecondary'>
                                        Trafic Réseau
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        fontWeight='bold'
                                        color='textPrimary'
                                    >
                                        2.4 PB/s
                                    </Typography>
                                </Box>
                                <CloudQueueIcon
                                    sx={{ fontSize: 40, color: theme.palette.text.secondary }}
                                />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <SparkLineChart
                                    data={[5, 10, 5, 20, 8, 15, 12, 25]}
                                    height={50}
                                    color={theme.palette.primary.main}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Network Map Section */}
            <Box sx={{ mb: 4 }}>
                <NetworkMap />
            </Box>

            {/* Database Health Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12 }}>
                    <Typography
                        variant='h5'
                        gutterBottom
                        sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                        Santé Base de Données
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='h6' gutterBottom fontWeight='bold'>
                            Stockage Principal
                        </Typography>
                        <Box sx={{ height: 200, width: '100%' }}>
                            <Gauge
                                value={78}
                                startAngle={-110}
                                endAngle={110}
                                sx={{
                                    [`& .MuiGauge-valueText`]: {
                                        fontSize: 40,
                                        transform: 'translate(0px, 0px)',
                                    },
                                }}
                                text={({ value }) => `${value} %`}
                            />
                        </Box>
                        <Typography variant='body2' color='textSecondary'>
                            12Tb / 16Tb Utilisé
                        </Typography>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
                        >
                            <Typography variant='h6' fontWeight='bold'>
                                Métriques DB
                            </Typography>
                            <Chip label='ONLINE' color='success' size='small' />
                        </Box>

                        <Stack spacing={3}>
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant='body2' color='textSecondary'>
                                        Connexions Actives
                                    </Typography>
                                    <Typography variant='body2' fontWeight='bold'>
                                        1,240
                                    </Typography>
                                </Box>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={[1000, 1200, 1150, 1300, 1240, 1200, 1100, 1240]}
                                        color={theme.palette.info.main}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant='body2' color='textSecondary'>
                                        Latence Moyenne (ms)
                                    </Typography>
                                    <Typography variant='body2' fontWeight='bold'>
                                        12ms
                                    </Typography>
                                </Box>
                                <Box sx={{ height: 60 }}>
                                    <SparkLineChart
                                        data={[10, 15, 12, 8, 20, 12, 10, 12]}
                                        color={theme.palette.warning.main}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                        <Typography variant='h6' gutterBottom fontWeight='bold'>
                            Réplication
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Card
                                variant='outlined'
                                sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <CheckCircleIcon color='success' />
                                <Box>
                                    <Typography variant='subtitle2' fontWeight='bold'>
                                        Replica EU-West
                                    </Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        Sync Delay: 0ms
                                    </Typography>
                                </Box>
                            </Card>
                            <Card
                                variant='outlined'
                                sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <CheckCircleIcon color='success' />
                                <Box>
                                    <Typography variant='subtitle2' fontWeight='bold'>
                                        Replica US-East
                                    </Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        Sync Delay: 120ms
                                    </Typography>
                                </Box>
                            </Card>
                            <Card
                                variant='outlined'
                                sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <WarningIcon color='warning' />
                                <Box>
                                    <Typography variant='subtitle2' fontWeight='bold'>
                                        Replica ASIA-South
                                    </Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        Sync Delay: 5400ms (Lagging)
                                    </Typography>
                                </Box>
                            </Card>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Main Charts Section */}
            <Grid container spacing={3}>
                {/* Left Column: Charts */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Grid container spacing={3}>
                        {/* Traffic Line Chart */}
                        <Grid size={{ xs: 12 }}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
                                <Typography variant='h6' gutterBottom fontWeight='bold'>
                                    Trafic Temps Réel
                                </Typography>
                                <LineChart
                                    xAxis={monitoringData.traffic.xAxis}
                                    series={monitoringData.traffic.series}
                                    height={300}
                                    grid={{ horizontal: true }}
                                />
                            </Paper>
                        </Grid>

                        {/* Performance Bar Chart */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
                                <Typography variant='h6' gutterBottom fontWeight='bold'>
                                    Performance Serveur
                                </Typography>
                                <BarChart
                                    xAxis={monitoringData.performance.xAxis as any}
                                    series={monitoringData.performance.series}
                                    height={300}
                                    borderRadius={5}
                                />
                            </Paper>
                        </Grid>

                        {/* HTTP Status Pie Chart */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant='h6' gutterBottom fontWeight='bold'>
                                    Codes de Réponse
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: monitoringData.errorRates.data,
                                            innerRadius: 30,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    height={300}
                                    slotProps={{}}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right Column: Infrastructure Tree & Status */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                        <Typography variant='h6' gutterBottom fontWeight='bold'>
                            Carte de l'Infrastructure
                        </Typography>
                        <Box sx={{ minHeight: 200, flexGrow: 1 }}>
                            <SimpleTreeView>
                                {monitoringData.infrastructureTree.map((item) => (
                                    <CustomTreeItem key={item.id} item={item} />
                                ))}
                            </SimpleTreeView>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant='h6' gutterBottom fontWeight='bold'>
                                État des Nœuds
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {monitoringData.serverStatus.map((server) => (
                                    <Card
                                        key={server.id}
                                        variant='outlined'
                                        sx={{
                                            p: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            {server.status === 'online' ? (
                                                <CheckCircleIcon color='success' />
                                            ) : server.status === 'warning' ? (
                                                <WarningIcon color='warning' />
                                            ) : (
                                                <ErrorIcon color='error' />
                                            )}
                                            <Box>
                                                <Typography variant='body2' fontWeight='bold'>
                                                    {server.name}
                                                </Typography>
                                                <Typography variant='caption' color='textSecondary'>
                                                    {server.region}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={`${server.load}% Charge`}
                                            size='small'
                                            color={
                                                server.load > 80
                                                    ? 'error'
                                                    : server.load > 50
                                                        ? 'warning'
                                                        : 'success'
                                            }
                                            variant={
                                                theme.palette.mode === 'dark' ? 'outlined' : 'filled'
                                            }
                                        />
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
