import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, CssBaseline, IconButton, Switch, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

const SiderbarHomePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (buttonName) => {
    if (buttonName === 'Log Out') {
      setDialogOpen(true); // Abre el diálogo de confirmación
    } else {
      console.log(`Has hecho clic en ${buttonName}`);
    }
  };

  const handleLogout = () => {
    console.log('Usuario ha cerrado sesión');
    setDialogOpen(false); // Cierra el diálogo
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Cierra el diálogo sin cerrar sesión
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: open ? (isMobile ? 60 : 240) : (isMobile ? 60 : 70),
          flexShrink: 0,
          transition: 'width 0.3s',
          '& .MuiDrawer-paper': {
            width: open ? (isMobile ? 60 : 240) : (isMobile ? 60 : 70),
            boxSizing: 'border-box',
            backgroundColor: darkMode ? '#333' : 'rgba(25, 118, 210, 0.95)',
            color: '#ffffff',
            transition: 'width 0.3s',
             borderRadius:'10px'
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 8px',
            minHeight: isMobile ? 'auto' : '64px',
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ color: '#ffffff' }}>
            <MenuIcon />
          </IconButton>
          
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            icon={<Brightness7Icon />}
            checkedIcon={<Brightness4Icon />}
          />
        </Toolbar>
        <List
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'center',
            alignItems: open ? 'flex-start' : 'center',
            padding: open ? '10%' : '0',
            transition: 'padding 0.3s',
          }}
        >
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Users', icon: <PeopleIcon /> },
            { text: 'Products', icon: <ShoppingCartIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleClick(item.text)}
              sx={{ justifyContent: open ? 'flex-start' : 'center' }}
            >
              <ListItemIcon sx={{ color: '#ffffff', minWidth: 0, mr: open ? 2 : 'auto' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <List>
          {[
            { text: 'Settings', icon: <SettingsIcon /> },
            { text: 'Log Out', icon: <LogoutIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleClick(item.text)}
              sx={{ justifyContent: open ? 'flex-start' : 'center' }}
            >
              <ListItemIcon sx={{ color: '#ffffff', minWidth: 0, mr: open ? 2 : 'auto' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Diálogo de confirmación para Log Out */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación de Cierre de Sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres cerrar sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SiderbarHomePage;
