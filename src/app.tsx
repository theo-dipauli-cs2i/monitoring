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

function MonitoringPage() { return <div>Monitoring</div>; }

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : 60,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: theme.mixins.toolbar.minHeight,
}));

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    return localStorage.getItem('primaryColor') || '#1976d2';
  });

  const [menuItemsVisibility, setMenuItemsVisibility] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('menuItemsVisibility');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      'dashboard': true,
      'monitoring': true,
      'settings': true,
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
    localStorage.setItem('menuItemsVisibility', JSON.stringify(menuItemsVisibility));
  }, [menuItemsVisibility]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
          }
        }
      }
    }
  }), [mode, primaryColor]);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, setMode, primaryColor, setPrimaryColor, menuItemsVisibility, setMenuItemsVisibility }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar mode={mode} onToggleTheme={toggleTheme} />
          <SideMenu open={drawerOpen} />
          <Main open={drawerOpen}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Main>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
