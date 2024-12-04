import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [zoom, setZoom] = useState(1); // Nivel de zoom inicial

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

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: qrboxSize, aspectRatio: 1.0 },
      false
    );

    html5QrcodeScanner.render(
      (decodedText) => {
        setResult(decodedText);
        html5QrcodeScanner.clear(); // Detener el escáner tras leer el código
      },
      (error) => {
        //console.error("Error durante el escaneo:", error);
      }
    );

    // Configurar el zoom seleccionado
    if (html5QrcodeScanner.html5Qrcode) {
      html5QrcodeScanner.html5Qrcode.applyVideoConstraints({
        advanced: [{ zoom }],
      });
    }

    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        textAlign: 'center',
        margin: '0 auto',
        width: { xs: '240px', lg: '50%' },
      }}
    >
      <Typography variant="h6" gutterBottom>
        QR Búsqueda
      </Typography>

      <Box id="qr-reader" sx={{ margin: 'auto' }}></Box>

      <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
        <InputLabel id="zoom-select-label">Zoom</InputLabel>
        <Select
          labelId="zoom-select-label"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        >
          <MenuItem value={1}>x1</MenuItem>
          <MenuItem value={2}>x2</MenuItem>
          <MenuItem value={5}>x5</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={startScanning}
      >
        Iniciar Escaneo
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 2 }}
        onClick={stopScanning}
      >
        Detener Escaneo
      </Button>

      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>
    </Box>
  );
};

export default QrScannerSearch;
