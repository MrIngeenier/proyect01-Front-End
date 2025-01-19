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

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddBoxIcon from '@mui/icons-material/AddBox';

import BodyHomepage from '../Body/BodyHomePage';
import QrScanner from '../Body/QrScanner';
import SalesDashboard from '../Body/SalesDashboard';
import PageInventary from '../../../pages/inventary.page';
import GetVentas from '../../Forms/Sales/GetVentas';
import QrScannerSalida from '../Body/QrScannerSalida';
//import ADDReferences from '../../Forms/Inventary/Referencias/referencias';
import AllData from '../../../pages/AddData';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QrScannerSearch from '../Body/QrScannerSearch';
import QrScannerADD from '../Body/QrAddInventary';
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

export default function SidebarDashboard() {
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

  // Funciones para manejar los clics en cada botón
  const handlePrincipalClick = () => {
    //console.log('Botón Principal presionado');
    setTitle("PRINCIPAL");
    setActiveComponent(() => SalesDashboard);
  };

  const handleUsuarioClick = () => {
    //console.log('Botón Usuario presionado');
    setTitle("USUARIO");
    setActiveComponent(() => BodyHomepage);
  };

  const handleProductosClick = () => {
    //console.log('Botón Productos presionado');
    setTitle("PRODUCTOS");
    setActiveComponent(() => AllData);
  };

  const handleInventariosClick = () => {
    //console.log('Botón Inventarios presionado');
    setTitle("INVENTARIO");
    setActiveComponent(() => PageInventary);
  };

  const handleVentasClick = () => {
    //console.log('Botón Herramientas presionado');
    setTitle("VENTAS");
    setActiveComponent(() => GetVentas);

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

  const handleQRADD = () => {
    //console.log('Botón QR presionado');
    setTitle("SCANNER QR SEARCH");
    setActiveComponent(() => QrScannerADD);
    
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
        label="Principal"
        sx={{color:'white'}} 
        icon={<HomeIcon />} 
        onClick={handlePrincipalClick}
      />
      <BottomNavigationAction 
        label="Usuarios" 
        sx={{color:'white'}}
        icon={<PersonIcon  /> } 
        onClick={handleUsuarioClick}
      />
      <BottomNavigationAction 
        label="Productos"
        sx={{color:'white'}} 
        icon={<InventoryIcon />} 
        onClick={handleProductosClick}
      />
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
        label="Busqueda"
        sx={{color:'white'}} 
        icon={<FindInPageIcon />} 
        onClick={handleQRSearch}
      />
      <BottomNavigationAction 
        label="Agregar"
        sx={{color:'white'}} 
        icon={<AddBoxIcon />} 
        onClick={handleQRADD}
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
            <ListItemButton onClick={handlePrincipalClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Principal" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleUsuarioClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Usuario" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleProductosClick} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
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
              <FindInPageIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <QrCodeScannerIcon />
              </FindInPageIcon>
              <ListItemText primary="Scanner/Busqueda" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleQRADD} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5 }}>
              <AddBoxIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                <QrCodeScannerIcon />
              </AddBoxIcon>
              <ListItemText primary="Scanner/Agregar" sx={{ opacity: open ? 1 : 0 }} />
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
