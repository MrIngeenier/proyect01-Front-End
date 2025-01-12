import React, { useState,useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import inventaryServices from '../../../service/inventary.services';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import { decryptText } from '../../../utils/Encript';


import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState(null); // Cambiado a null, ya que solo es un solo objeto
  const [zoom, setZoom] = useState(2); // Valor inicial del zoom

  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

  // Función para obtener las capacidades de la cámara y los valores de zoom disponibles
  

  useEffect(() => {
    //getCameraZoomCapabilities(); // Cargar las capacidades de la cámara al iniciar el componente
  }, []);

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
      'qr-reader',
      {
        fps: 20,
        qrbox: qrboxSize,
        videoConstraints: {
          facingMode: 'environment',
          width: { ideal: 1000 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 1.77 },
          advanced: [{ zoom: zoom }],
        },
      },
      false
    );

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
        //setResult(decodedText);
        setSuccessMessage('¡Código QR escaneado con éxito!');
        setSuccessOpen(true);
        const decrypt = decryptText(decodedText);
        const qrData = decrypt.split('/').map((item) => item.replace(/^'|'$/g, '').trim());
        setResult(decrypt);

        if (qrData.length === 7) {
          const [empresa, serial, color, lugar, talla, publico] = qrData;
          fetchInventary(empresa, serial, color, lugar, publico);
        }

        html5QrcodeScanner.clear();
      },
      (error) => {
        const message =
          error.message.includes('NotFoundException')
            ? 'No se encontró un código QR. Asegúrate de que el código esté dentro del campo de la cámara e inténtalo nuevamente.'
            : 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        setErrorMessage(message);
        setErrorOpen(true);
      }
    );

    setScanner(html5QrcodeScanner);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
    }
  };

  

  const handleZoomChange = (event) => {
    setZoom(event.target.value);
    if (scanner) {
      scanner.clear();
      startScanning(); // Reiniciar el escaneo con el nuevo zoom
    }
  };

  return (
    <Box sx={{padding: 2,textAlign: 'center',
      width: {lg: '50%'},margin: {lg: '0 auto', },marginTop: {lg: '-20px'},
    }}>
      <Typography variant="h6" gutterBottom>
        SCANNER BUSQUEDA DE INVENTARIO
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto' }}></Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={startScanning}>
        Iniciar Escaneo
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={stopScanning}>
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2, fontWeight: 'bold',backgroundColor: 'lightgray',padding: 1,overflow: 'hidden',textOverflow: 'ellipsis', width: { xs: '300px', sm: '100%' },  }}>
               {result}
      </Typography>

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel>Zoom</InputLabel>
        <Select value={zoom} onChange={handleZoomChange}>
          <MenuItem value={2}>2x</MenuItem>
          <MenuItem value={4}>4x</MenuItem>
          <MenuItem value={6}>6x</MenuItem>
          <MenuItem value={8}>8x</MenuItem>
          <MenuItem value={10}>10x</MenuItem>
        </Select>
      </FormControl>
        
        {data && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px',width: '100%'}}>
        <TableContainer component={Paper} sx={{ backgroundColor: '#333',    display: 'flex', 
          justifyContent: 'center', 
          borderRadius: '4px',
          overflowX: 'auto',
          width:{ xs: '330px',sm: '600px',md:'900px',lg:'1300px' },
          marginLeft:{ xs: '-20px'},
          marginTop:{ xs: '20px',md:'20px',lg:'20px'},
          
          }}>          
          <Table size="small" sx={{ tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow >
              <TableCell sx={{ color: 'white', width:{xs:'1100px', md:'0%', lg:'0%'} }}> </TableCell>
                <TableCell sx={{ color: 'white', width:{xs:'100px',md:'50%', lg:'90%'} }}>Empresa</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'60%', lg:'90%'} }}>Referencia</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'70%'}  }}>Color</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'70%'}  }}>Lugar</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'70%'}  }}>Público</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>21</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>22</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>23</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>24</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>25</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>26</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>27</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>28</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>29</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>30</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>31</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>32</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>33</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>34</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'}  }}>35</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>36</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>37</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>38</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>39</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>40</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>41</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'25%'} }}>42</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'50px', md:'20%', lg:'25%'} }}>43</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
              <TableCell sx={{ color: 'white',width:{xs:'1000px', md:'0%'} }}> </TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'20%'} }}>{data.empresa}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'40%'} }}>{data.referencia}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'20%'}  }}>{data.color}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'20%'}}}>{data.lugar}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'20%'}}}>{data.publico}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t21}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t22}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t23}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t24}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t25}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t26}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t27}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t28}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t29}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t30}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t31}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t32}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t33}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t34}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t35}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t36}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t37}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t38}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t39}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t40}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t41}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t42}</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'35px', md:'20%'}}}>{data.t43}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      )}

      <ErrorAlert open={errorOpen} handleClose={handleErrorClose} errorMessage={errorMessage} />
      <SuccessAlert open={successOpen} handleClose={handleSuccessClose} successMessage={successMessage} />
    </Box>
  );
};

export default QrScannerSearch;
