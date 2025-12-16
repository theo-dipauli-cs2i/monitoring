import { useState, useEffect, useContext } from 'preact/hooks';
import { Box, Typography, FormControlLabel, Checkbox, Paper, Stack, IconButton, Collapse, RadioGroup, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { ThemeContext } from '../contexts/ThemeContext';

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
    const [themeExpanded, setThemeExpanded] = useState(false);
    const [menuExpanded, setMenuExpanded] = useState(false);
    const themeContext = useContext(ThemeContext) as any;

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

    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVisibility = { ...chartVisibility, [key]: event.currentTarget.checked };
        setChartVisibility(newVisibility);
        localStorage.setItem('chartVisibility', JSON.stringify(newVisibility));
        // Dispatch storage event for other tabs/pages
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'chartVisibility',
            newValue: JSON.stringify(newVisibility),
            oldValue: JSON.stringify(chartVisibility),
        }));
    };

    const handleMenuChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVisibility = {
            ...themeContext?.menuItemsVisibility,
            [key]: e.currentTarget.checked,
        };
        themeContext?.setMenuItemsVisibility(newVisibility);
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
            <Paper sx={{ p: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">Thème</Typography>
                    <ExpandMore
                        expand={themeExpanded}
                        onClick={() => setThemeExpanded(!themeExpanded)}
                        aria-expanded={themeExpanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse in={themeExpanded} timeout="auto" unmountOnExit>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>Mode</Typography>
                            <RadioGroup
                                row
                                value={themeContext?.mode || 'light'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => themeContext?.setMode(e.currentTarget.value as 'light' | 'dark')}
                            >
                                <FormControlLabel value="light" control={<Radio />} label="Clair" />
                                <FormControlLabel value="dark" control={<Radio />} label="Sombre" />
                            </RadioGroup>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>Couleur primaire</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <input
                                    type="color"
                                    value={themeContext?.primaryColor || '#1976d2'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => themeContext?.setPrimaryColor(e.currentTarget.value)}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                    }}
                                />
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    {themeContext?.primaryColor || '#1976d2'}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" gutterBottom>Couleur secondaire</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <input
                                    type="color"
                                    value={themeContext?.secondaryColor || '#000000'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => themeContext?.setSecondaryColor(e.currentTarget.value)}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                    }}
                                />
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                    {themeContext?.secondaryColor || '#000000'}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Collapse>
            </Paper>
            <Paper sx={{ p: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6">Onglets du menu</Typography>
                    <ExpandMore
                        expand={menuExpanded}
                        onClick={() => setMenuExpanded(!menuExpanded)}
                        aria-expanded={menuExpanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </Box>
                <Collapse in={menuExpanded} timeout="auto" unmountOnExit>
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true}
                                    disabled
                                />
                            }
                            label="Dashboard (obligatoire)"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={themeContext?.menuItemsVisibility?.['monitoring'] !== false}
                                    onChange={handleMenuChange('monitoring')}
                                />
                            }
                            label="Monitoring"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true}
                                    disabled
                                />
                            }
                            label="Settings (obligatoire)"
                        />
                    </Stack>
                </Collapse>
            </Paper>
        </Box>
    );
}