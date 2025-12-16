import './app.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import SideMenu from './components/sideMenu';
import { styled } from '@mui/material/styles';

function DashboardPage() {
  return <div>Dashboard</div>;
}
function MonitoringPage() {
  return <div>Monitoring</div>;
}
function SettingsPage() {
  return <div>Settings</div>;
}

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
  marginTop: theme.mixins.toolbar.minHeight, // décale le contenu sous la NavBar
}));

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [drawerOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar mode={mode} onToggleTheme={toggleTheme} />
        <SideMenu open={drawerOpen} />

        <Main open={drawerOpen}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </ThemeProvider>
  );
}
