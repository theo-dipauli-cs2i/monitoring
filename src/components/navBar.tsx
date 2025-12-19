import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import SideMenu from './sideMenu';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import notificationData from '../data/notifications.json';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const MyAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

interface NavBarProps {
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
}

const searchablePages = [
  { name: 'Dashboard', path: '/' },
  { name: 'Monitoring', path: '/monitoring' },
  { name: 'Settings', path: '/settings' },
  { name: 'Profil', path: '/profile' },
];

export default function NavBar({ mode, onToggleTheme }: NavBarProps) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<
    typeof searchablePages
  >([]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const query = event.currentTarget.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = searchablePages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSearchSubmit = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && searchResults.length > 0) {
      handleSearchResultClick(searchResults[0].path);
    }
  };

  const handleSearchResultClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setSearchResults([]);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  // States for new popups
  const [messagesAnchorEl, setMessagesAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMessagesOpen = Boolean(messagesAnchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);

  const handleMessagesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMessagesAnchorEl(event.currentTarget);
  };

  const handleMessagesClose = () => {
    setMessagesAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const renderMessagesMenu = (
    <Menu
      anchorEl={messagesAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={isMessagesOpen}
      onClose={handleMessagesClose}
      slotProps={{ paper: { style: { maxHeight: 400, width: 360 } } }}
    >
      <Typography variant='subtitle1' sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
        Messages Recents
      </Typography>
      <Divider />
      <List sx={{ p: 0 }}>
        {notificationData.messages.map((msg) => (
          <React.Fragment key={msg.id}>
            <MenuItem
              onClick={handleMessagesClose}
              sx={{ alignItems: 'flex-start', py: 1.5 }}
            >
              <ListItemAvatar>
                <Avatar>{msg.avatar}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={msg.sender}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='text.primary'
                      sx={{ display: 'block' }}
                    >
                      {msg.subject}
                    </Typography>
                    <Typography
                      component='span'
                      variant='caption'
                      color='text.secondary'
                    >
                      {msg.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </MenuItem>
            <Divider variant='inset' component='li' />
          </React.Fragment>
        ))}
        {notificationData.messages.length === 0 && (
          <MenuItem disabled>Aucun message</MenuItem>
        )}
      </List>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography
          variant='caption'
          color='primary'
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Voir tous les messages
        </Typography>
      </Box>
    </Menu>
  );

  const renderNotificationsMenu = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      slotProps={{ paper: { style: { maxHeight: 400, width: 320 } } }}
    >
      <Typography variant='subtitle1' sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
        Notifications
      </Typography>
      <Divider />
      <List sx={{ p: 0 }}>
        {notificationData.notifications.map((notif) => (
          <React.Fragment key={notif.id}>
            <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
              <ListItemText
                primary={
                  <Typography variant='body2' fontWeight='bold'>
                    {notif.title}
                  </Typography>
                }
                secondary={notif.time}
              />
              {notif.read ? null : (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    ml: 1,
                  }}
                />
              )}
            </MenuItem>
            <Divider component='li' />
          </React.Fragment>
        ))}
        {notificationData.notifications.length === 0 && (
          <MenuItem disabled>Aucune notification</MenuItem>
        )}
      </List>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography
          variant='caption'
          color='primary'
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          Voir toutes les notifications
        </Typography>
      </Box>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/profile');
        }}
      >
        Profil
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' color='inherit'>
          <Badge
            badgeContent={notificationData.messages.length}
            color='secondary'
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <Typography>Messages</Typography>
      </MenuItem>

      <MenuItem>
        <IconButton size='large' color='inherit'>
          <Badge
            badgeContent={notificationData.notifications.length}
            color='secondary'
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography>Notifications</Typography>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          navigate('/profile');
        }}
      >
        <IconButton size='large' color='inherit'>
          <AccountCircle />
        </IconButton>
        <Typography sx={{ ml: 1 }}>Profil</Typography>
      </MenuItem>
    </Menu>
  );

  const handleDrawerClose = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <SideMenu open={drawerOpen} onClose={handleDrawerClose} />

      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar position='fixed'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Monitoring
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Rechercher...'
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
              {searchResults.length > 0 && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    zIndex: 1300,
                    maxHeight: 200,
                    overflow: 'auto',
                  }}
                  elevation={3}
                >
                  <List>
                    {searchResults.map((result) => (
                      <ListItemButton
                        key={result.path}
                        onClick={() => handleSearchResultClick(result.path)}
                      >
                        <ListItemText primary={result.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              )}
            </Search>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton size='large' color='inherit' onClick={onToggleTheme}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size='large'
                color='inherit'
                onClick={handleMessagesOpen}
              >
                <Badge
                  badgeContent={notificationData.messages.length}
                  color='secondary'
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size='large'
                color='inherit'
                onClick={handleNotificationsOpen}
              >
                <Badge
                  badgeContent={notificationData.notifications.length}
                  color='secondary'
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size='large'
                edge='end'
                color='inherit'
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                color='inherit'
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </MyAppBar>

        {renderMobileMenu}
        {renderMenu}
        {renderMessagesMenu}
        {renderNotificationsMenu}
      </Box>
    </Box>
  );
}
