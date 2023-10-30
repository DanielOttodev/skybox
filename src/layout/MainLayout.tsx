import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Grid, Tooltip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import { Outlet } from 'react-router-dom';
import DrawTwoToneIcon from '@mui/icons-material/DrawTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import logo from '../assets/speechio.png'
import logoHidden from '../assets/speechio-w.png'
import { useAuth } from '../hooks/useAuth';
import defaultTheme from '../assets/themes/index'
import { Link } from 'react-router-dom';
import Fade from '@mui/material/Fade'
const drawerWidth = 180;



const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: theme.palette.grey[900],
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
  backgroundColor: theme.palette.grey[900],
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 19px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 19px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: '#2b2b2b',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {

      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MainLayout() {
  const { onLogout } = useAuth()
  const theme = defaultTheme;
  const [open, setOpen] = React.useState(false);
  const menuItems = [
    { text: 'Create', icon: <DrawTwoToneIcon sx={{ margin: 'auto' }} />, route: "/home" },
    { text: 'My Files', icon: <FolderCopyTwoToneIcon sx={{ margin: 'auto' }} />, route: "/files" },
    { text: 'Account', icon: <AccountCircleTwoToneIcon sx={{ margin: 'auto' }} />, route: "/account" },
    { text: 'Help', icon: <HelpOutlineTwoToneIcon sx={{ margin: 'auto' }} />, route: "/help" }

  ]
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ paddingLeft: 24, justifyContent: 'space-between' }} >
          <div style={{ display: 'flex' }}>
            <a href='#'>   {!open && <img style={{ marginTop: 4 }} src={logoHidden} alt="" width={35} />}</a>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginLeft: 1,
                ...(open && { display: 'none' }),
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>

          <Tooltip title="Sign Out" >
            <IconButton onClick={() => { onLogout() }} sx={{ color: 'white' }}><LogoutTwoToneIcon /></IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer PaperProps={{ width: 30 }} variant="permanent" open={open}>
        <DrawerHeader>
          <img src={logo} alt="" width={100} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => {
            return (
              <Link to={item.route} key={item.route}>
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      color: 'white'
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white'

                      }}
                    >
                      {item.icon}
                      {!open && <Fade timeout={500} in={!open}><ListItemText disableTypography sx={{ color: "white" }} primary={item.text} /></Fade>}

                    </ListItemIcon>
                    <ListItemText disableTypography primary={item.text} sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
          })
          }
        </List>
        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container justifyContent="center" alignItems="center"  >
          <Grid item xs={12}>
            <Box display="flex"
              justifyContent="center"
              alignItems="center">
              <Outlet />
            </Box>
          </Grid>

        </Grid>

      </Box>
    </Box >

  );
}
