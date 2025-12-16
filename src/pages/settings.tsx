import { useState, useEffect } from 'preact/hooks';
import { Box, Typography, FormControlLabel, Checkbox, Paper, Stack, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }: any) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const chartConfigs = [
    { key: 'clientChart', label: 'Client Chart' },
    { key: 'commandeChart', label: 'Commande Chart' },
    { key: 'chiffreAffaireChart', label: 'Chiffre Affaire Chart' },
    { key: 'httpStatusChart', label: 'HTTP Status Chart' },
    { key: 'logsList', label: 'Logs List' },
    { key: 'cpuChart', label: 'CPU Chart' },
    { key: 'memoryChart', label: 'Memory Chart' },
    { key: 'diskChart', label: 'Disk Chart' },
];

export default function Settings() {
    const [chartVisibility, setChartVisibility] = useState<Record<string, boolean>>({});
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('chartVisibility');
        if (stored) {
            setChartVisibility(JSON.parse(stored));
        } else {
            const defaultVisibility: Record<string, boolean> = {};
            chartConfigs.forEach(config => {
                defaultVisibility[config.key] = true;
            });
            setChartVisibility(defaultVisibility);
        }
    }, []);

    const handleChange = (key: string) => (event: any) => {
        const newVisibility = { ...chartVisibility, [key]: event.target.checked };
        setChartVisibility(newVisibility);
        localStorage.setItem('chartVisibility', JSON.stringify(newVisibility));
        // Dispatch storage event for other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'chartVisibility',
            newValue: JSON.stringify(newVisibility),
            oldValue: JSON.stringify(chartVisibility),
        }));
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Paramètres</Typography>
            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">Visibilité des graphiques</Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        {chartConfigs.map(config => (
                            <FormControlLabel
                                key={config.key}
                                control={
                                    <Checkbox
                                        checked={chartVisibility[config.key] || false}
                                        onChange={handleChange(config.key)}
                                    />
                                }
                                label={config.label}
                            />
                        ))}
                    </Stack>
                </Collapse>
            </Paper>
        </Box>
    );
}