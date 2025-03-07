import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QrScanner from '../Body/QrScanner';
import GetInventaryCasher2 from '../../Forms/Inventary/GetInventaryCasher2';
import GetVentasCasher2 from '../../Forms/Sales/GetVentasCasher2';
import QrScannerSalida from '../Body/QrScannerSalida';
import QrScannerSearch from '../Body/QrScannerSearch';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function CasherDashboard2() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("System");
  const [activeComponent, setActiveComponent] = React.useState(null);
  const navigate = useNavigate(); // Hook useNavigate dentro del componente
  const [value, setValue] = React.useState(0); // Estado para BottomNavigation


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const handleInventariosClick = () => {
    //console.log('Botón Inventarios presionado');
    setTitle("INVENTARIO");
    setActiveComponent(() => GetInventaryCasher2);
  };

  const handleVentasClick = () => {
    //console.log('Botón Herramientas presionado');
    setTitle("VENTAS");
    setActiveComponent(() => GetVentasCasher2);

  };

  const handleQRClick = () => {
    //console.log('Botón QR presionado');
    setTitle("SCANNER QR");
    setActiveComponent(() => QrScanner);
    
  };

  const handleQRClick2 = () => {
    //console.log('Botón QR presionado');
    setTitle("SCANNER QR EXIT");
    setActiveComponent(() => QrScannerSalida);
    
  };

  const handleQRSearch = () => {
    //console.log('Botón QR presionado');
    setTitle("SCANNER QR SEARCH");
    setActiveComponent(() => QrScannerSearch);
    
  };

  const handleSalidaClick = () => {
    console.log('Botón Salida presionado');
    navigate('/'); // Guarda el token si es necesario

  };

  const RenderedComponent = activeComponent ? React.createElement(activeComponent) : null;

  return (
    <Box sx={{ display: 'flex'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          width: '100%',
          position: 'fixed',
          justifyContent:'space-between',
          overflowX: 'auto',
          backgroundColor: '#333',  // Estilo oscuro
          color: 'white',            // Color del texto y los íconos
          bottom: 0,
          left: 0,
          zIndex: 1300,
          display: {  md: 'none' }  // Ocultar en pantallas sm y mayores

        }}
      >
      
      
      
      <BottomNavigationAction 
        label="Inventario"
        sx={{color:'white'}} 
        icon={<ShoppingCartIcon />} 
        onClick={handleInventariosClick}
      />
      <BottomNavigationAction 
        label="Ventas"
        sx={{color:'white'}} 
        icon={<ProductionQuantityLimitsIcon />} 
        onClick={handleVentasClick}
      />
      <BottomNavigationAction 
        label="QRSalida"
        sx={{color:'white'}} 
        icon={<CropFreeIcon />} 
        onClick={handleQRClick2}
      />
      <BottomNavigationAction 
        label="QRBusqueda"
        sx={{color:'white'}} 
        icon={<CropFreeIcon />} 
        onClick={handleQRSearch}
      />
      <BottomNavigationAction 
        label="QRVenta"
        sx={{color:'white'}} 
        icon={<QrCodeScannerIcon />} 
        onClick={handleQRClick}
      />
      
      <BottomNavigationAction 
        label="Logout"
        sx={{color:'white'}} 
        icon={<ExitToAppIcon />} 
        onClick={handleSalidaClick}
      />
    </BottomNavigation>
      <CssBaseline />
      
        <AppBar position="fixed" open={open} sx={{display: { xs: 'none', md: 'flex' } }}> 
      
        <Toolbar  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar >
      </AppBar>
      <Drawer variant="permanent" open={open}  sx={{display: { xs: 'none', md: 'flex' } }} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          
          
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleInventariosClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inventarios" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleQRClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <QrCodeScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Scanner/Venta" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleQRClick2} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <CropFreeIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <QrCodeScannerIcon />
              </CropFreeIcon>
              <ListItemText primary="Scanner/Salida" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleQRSearch} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <CropFreeIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <QrCodeScannerIcon />
              </CropFreeIcon>
              <ListItemText primary="Scanner/Busqueda" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleVentasClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Ventas" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ flexGrow: 1 }} />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleSalidaClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Salida" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        
        {RenderedComponent}
      </Box>
      <Box component="main2" sx={{ flexGrow: 1, p: 3, display: { xs: 'none'} }}>
        <DrawerHeader />
        
        {RenderedComponent}
      </Box>

      
    </Box>
  );
}
