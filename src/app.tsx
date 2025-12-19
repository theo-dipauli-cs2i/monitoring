import './app.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import SideMenu from './components/sideMenu';
import { styled } from '@mui/material/styles';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import { ThemeContext } from './contexts/ThemeContext';
import Profile from './pages/profile';
import MonitoringPage from './pages/monitoring';

// MonitoringPage component removed in favor of import from './pages/monitoring'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  marginLeft: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? drawerWidth : 60,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    return localStorage.getItem('primaryColor') || '#1976d2';
  });

  const [secondaryColor, setSecondaryColor] = useState<string>(() => {
    return localStorage.getItem('secondaryColor') || '#9c27b0';
  });

  const [menuItemsVisibility, setMenuItemsVisibility] = useState<
    Record<string, boolean>
  >(() => {
    const saved = localStorage.getItem('menuItemsVisibility');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      dashboard: true,
      monitoring: true,
      settings: true,
    };
  });

  const [drawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem('secondaryColor', secondaryColor);
  }, [secondaryColor]);

  useEffect(() => {
    localStorage.setItem(
      'menuItemsVisibility',
      JSON.stringify(menuItemsVisibility)
    );
  }, [menuItemsVisibility]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: primaryColor,
          },
          secondary: {
            main: secondaryColor,
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: primaryColor,
              },
            },
          },
        },
      }),
    [mode, primaryColor, secondaryColor]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const routerBasename = import.meta.env.BASE_URL ?? '/';

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        menuItemsVisibility,
        setMenuItemsVisibility,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={routerBasename}>
          <NavBar mode={mode} onToggleTheme={toggleTheme} />
          <SideMenu open={drawerOpen} />
          <Main open={drawerOpen}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/monitoring' element={<MonitoringPage />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='*' element={<Profile></Profile>} />
            </Routes>
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
