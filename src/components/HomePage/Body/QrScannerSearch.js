import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import inventaryServices from '../../../service/inventary.services';
import { Button, Slider, Box, Typography } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [zoom, setZoom] = useState(2); // Valor inicial del zoom
  const [data, setData] = useState(null);

  const startScanning = () => {
    const windowWidth = window.innerWidth;
    let qrboxSize;
    
    if (windowWidth <= 500) {
      qrboxSize = { width: 150, height: 150 };
    } else if (windowWidth > 500 && windowWidth <= 1024) {
      qrboxSize = { width: 600, height: 500 };
    } else {
      qrboxSize = { width: 450, height: 400 };
    }

    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", 
      {
        fps: 20,
        qrbox: qrboxSize,
        videoConstraints: {
          width: { ideal: 1000 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 1.77 },
          advanced: [
            { zoom: zoom }  // Usar el valor del zoom actual
          ]
        }
      }, false);

    const fetchInventary = async (empresa, serial, color, lugar, publico) => {
      try {
        const response = await inventaryServices.searchQR(empresa, serial, color, lugar, publico);
        setData(response.body[0]);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    html5QrcodeScanner.render(
      (decodedText) => {
        setResult(decodedText);
        const qrData = decodedText.split('/').map(item => item.replace(/^'|'$/g, '').trim());
        if (qrData.length === 6) {
          const [empresa, serial, color, lugar, talla, publico] = qrData;
          fetchInventary(empresa, serial, color, lugar, publico);
        }
        html5QrcodeScanner.clear();
      },
      (error) => {
        const message = error.message.includes("NotFoundException")
          ? "No se encontró un código QR. Asegúrate de que el código esté dentro del campo de la cámara e inténtalo nuevamente."
          : "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
        console.error(message);
      }
    );

    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
    }
  };

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue); // Actualiza el valor de zoom
  };

  return (
    <Box sx={{ padding: 2, textAlign: 'center', width: { xs: '240px', lg: '50%' }, margin: { lg: '0 auto' }, marginTop: { lg: '-20px' } }}>
      <Typography variant="h6" gutterBottom>
        QR Busqueda
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto' }}></Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={startScanning}>
        Iniciar Escaneo
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={stopScanning}>
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>
      
      {/* Slider para controlar el zoom */}
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Zoom: {zoom}x
      </Typography>
      <Slider
        value={zoom}
        min={1}
        max={50}
        step={1}
        onChange={handleZoomChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}x`}
        sx={{ width: '80%', marginTop: 2 }}
      />

      {data && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1">Datos del Inventario:</Typography>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default QrScannerSearch;
