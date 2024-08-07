import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  CssBaseline,
  //Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const SiderbarHomePage = () => {
  // Función para manejar los clics en los botones
  const handleClick = (buttonName) => {
    switch (buttonName) {
      case 'Dashboard':
        console.log('Has hecho clic en Dashboard');
        break;
      case 'Users':
        console.log('Has hecho clic en Users');
        break;
      case 'Products':
        console.log('Has hecho clic en Products');
        break;
      case 'Settings':
        console.log('Has hecho clic en Settings');
        break;
      default:
        console.log('Botón desconocido');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'rgba(25, 118, 210, 0.95)', // Azul oscuro con 50% de transparencia
            color: '#ffffff', // Texto blanco
          },
        }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 90,
              width: 100,
              borderRadius: '30%',
              padding: '8px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
            src="https://cdn-icons-png.flaticon.com/512/6463/6463383.png"
            alt="Profile"
          />
        </Toolbar>
        <List
          sx={{
            height: '80%', // Asegura que la lista ocupe todo el alto disponible
            display: 'flex',
            flexDirection: 'column',
            padding:'10%',
            
          }}
        >
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Users', icon: <PeopleIcon /> },
            { text: 'Products', icon: <ShoppingCartIcon /> },
            { text: 'Settings', icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleClick(item.text)} // Manejador de clics
            >
              <ListItemIcon sx={{ color: '#ffffff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

     {/*  <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Bienvenido a la Página Principal
        </Typography>
        <Typography variant="body1">
          Aquí puedes agregar el contenido principal de tu aplicación.
        </Typography>
      </Box>*/}
    </Box>
  );
};

export default SiderbarHomePage;
