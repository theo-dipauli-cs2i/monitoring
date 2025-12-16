import { styled, useTheme } from '@mui/material/styles';
import type { Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `60px`,
});

const PermanentDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }: { theme: Theme; open: boolean }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            ...(open ? openedMixin(theme) : closedMixin(theme)),
        },
    })
);

interface SideMenuProps {
    open: boolean;
    onClose?: () => void;
}

export default function SideMenu({ open, onClose }: SideMenuProps) {
    const location = useLocation();
    const themeContext = useContext(ThemeContext) as any;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { text: 'Dashboard', path: '/', key: 'dashboard', icon: DashboardIcon },
        { text: 'Monitoring', path: '/monitoring', key: 'monitoring', icon: MonitorIcon },
        { text: 'Settings', path: '/settings', key: 'settings', icon: SettingsIcon },
    ];

    const visibleItems = menuItems.filter(item => themeContext?.menuItemsVisibility?.[item.key] !== false);

    const drawerContent = (
        <>
            <DrawerHeader />
            <Divider />
            <List>
                {visibleItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                onClick={isMobile ? onClose : undefined}
                                sx={{
                                    minHeight: 48,
                                    px: 2.5,
                                    justifyContent: open || isMobile ? 'initial' : 'center',
                                    textAlign: open || isMobile ? 'left' : 'center',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open || isMobile ? 3 : 'auto',
                                    }}
                                >
                                    <IconComponent />
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open || isMobile ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    // Mobile: temporary drawer
    if (isMobile) {
        return (
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        );
    }

    // Desktop: permanent mini drawer
    return (
        <PermanentDrawer variant="permanent" open={open}>
            {drawerContent}
        </PermanentDrawer>
    );
}
