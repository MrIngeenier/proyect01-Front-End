import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button, Slider, Typography, Box } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [streamTrack, setStreamTrack] = useState(null); // Track para aplicar zoom
  const [zoomLevel, setZoomLevel] = useState(1); // Nivel de zoom inicial

  const startScanning = () => {
    const html5Qrcode = new Html5Qrcode("qr-reader");

    html5Qrcode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 300, height: 300 },
      },
      (decodedText) => {
        setResult(decodedText);
        html5Qrcode.stop();
      },
      (error) => {
        console.error("Error escaneando el código QR:", error);
      }
    )
      .then(() => {
        // Obtener el MediaStreamTrack para manejar restricciones
        const videoElement = html5Qrcode.getVideoElement();
        const track = videoElement?.srcObject?.getVideoTracks()?.[0];
        if (track) {
          setStreamTrack(track);
        }
      })
      .catch((error) => {
        console.error("Error iniciando el escaneo:", error);
      });

    setScanner(html5Qrcode); // Guardar la instancia
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.stop().then(() => {
        setScanner(null);
        setStreamTrack(null);
      });
    }
  };

  const handleZoomChange = (event, newValue) => {
    setZoomLevel(newValue);

    if (streamTrack) {
      const constraints = {
        advanced: [{ zoom: newValue }],
      };

      streamTrack
        .applyConstraints(constraints)
        .catch((error) => {
          console.error("Error aplicando zoom:", error);
        });
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        QR Busqueda
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto', width: 300, height: 300 }}></Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={startScanning}>
        Iniciar Escaneo
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={stopScanning}>
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>

      {/* Slider para el zoom */}
      <Box sx={{ marginTop: 3 }}>
        <Typography>Zoom</Typography>
        <Slider
          value={zoomLevel}
          onChange={handleZoomChange}
          min={1}
          max={5} // Ajusta según lo que soporte tu cámara
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default QrScannerSearch;
