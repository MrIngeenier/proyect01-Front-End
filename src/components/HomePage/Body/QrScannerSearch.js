import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccesAlert';
import inventaryServices from '../../../service/inventary.services';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const QrScannerSearch = () => {
  const [result, setResult] = useState('No result');
  const [scanner, setScanner] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [data, setData] = useState(null); // Cambiado a null, ya que solo es un solo objeto

  const handleErrorClose = () => setErrorOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);

  const startScanning = () => {

    const windowWidth = window.innerWidth;
    let qrboxSize;
    //console.log('Ancho Pantalla'+windowWidth);
    if (windowWidth <= 500) {
      // Móvil
      qrboxSize = { width: 150, height: 150 };
      //console.log('Ancho Pantalla'+qrboxSize.width+' '+qrboxSize.height);
    }
    if (windowWidth > 500 && windowWidth <= 1024) {
      // Móvil
      qrboxSize = { width: 600, height: 500 };
      //console.log('Ancho Pantalla'+qrboxSize.width+' '+qrboxSize.height);
    }  if(windowWidth > 1024 ) {
      qrboxSize = { width: 450, height: 400 };
    }

    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: qrboxSize }, false);

    const fetchInventary = async (empresa, serial, color, lugar, publico) => {
      try {
        const response = await inventaryServices.searchQR(empresa, serial, color, lugar, publico);
        setData(response.body[0]); // Asegúrate de que estás tomando el primer objeto del array
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    html5QrcodeScanner.render(
      (decodedText) => {
        setResult(decodedText);
        setSuccessMessage("¡Código QR escaneado con éxito!");
        setSuccessOpen(true);

        // Dividir el texto escaneado usando el separador '/'
        const qrData = decodedText.split('/').map(item => item.replace(/^'|'$/g, '').trim());

        // Validar que tenga el formato esperado
        if (qrData.length === 6) {
          const [empresa, serial, color, lugar, talla, publico] = qrData;
          fetchInventary(empresa, serial, color, lugar, publico);
        }

        // Detener el escáner después de leer el código QR
        html5QrcodeScanner.clear();
      },
      (error) => {
        const message = error.message.includes("NotFoundException")
          ? "No se encontró un código QR. Asegúrate de que el código esté dentro del campo de la cámara e inténtalo nuevamente."
          : "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
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

  

  return (
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          width: {
            xs: '240px',
            lg: '50%', // Para pantallas extra grandes
          },
          margin: {
            lg: '0 auto', // Para pantallas extra grandes
          },
          marginTop: {
            lg: '-20px', // Para pantallas extra grandes
          },
          
        }}
      >      
      <Typography variant="h6" gutterBottom>
        QR Busqueda
      </Typography>
      <Box id="qr-reader" sx={{ margin: 'auto'}}></Box>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={startScanning}>
        Iniciar Escaneo
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={stopScanning}>
        Detener Escaneo
      </Button>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Resultado: {result}
      </Typography>

      {data && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#333',    display: 'flex', 
          justifyContent: 'center', 
          borderRadius: '8px',
           justifyContent: 'center',
            overflowX: 'auto',
          width:{ xs: '250px',md:'900px',lg:'1000px' },
          marginLeft:{ lg:'-150px' },  
          }}>          
          <Table size="small" sx={{ tableLayout: 'fixed'}}>
            <TableHead>
              <TableRow >
              <TableCell sx={{ color: 'white', width:{xs:'1100px', md:'0%', lg:'0%'} }}> </TableCell>
                <TableCell sx={{ color: 'white', width:{xs:'100px',md:'50%', lg:'50%'} }}>Empresa</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'60%', lg:'60%'} }}>Referencia</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'50%'}  }}>Color</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'50%'}  }}>Lugar</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'50%'}  }}>Público</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'100px', md:'50%', lg:'50%'}  }}>Estado</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>21</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>22</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>23</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>24</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>25</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>26</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>27</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>28</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>29</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>30</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>31</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>32</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>33</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>34</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'}  }}>35</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>36</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>37</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>38</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>39</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>40</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>41</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>42</TableCell>
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%', lg:'20%'} }}>43</TableCell>
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
                <TableCell sx={{ color: 'white',width:{xs:'60px', md:'20%'}}}>{data.estado}</TableCell>
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
                <TableCell sx={{ color: 'white',width:{xs:'10px', md:'20%'}}}>{data.t43}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <SuccessAlert open={successOpen} handleClose={handleSuccessClose} message={successMessage} />
      <ErrorAlert open={errorOpen} handleClose={handleErrorClose} message={errorMessage} />
    </Box>
  );
};

export default QrScannerSearch;
