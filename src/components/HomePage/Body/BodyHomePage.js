import React from 'react';
import Button from '@mui/material/Button';

function BodyHomepage() {
  return (
    <div style={{ width:'100%'}}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          fontSize: '1.25rem',
          padding: '12px 24px',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
      >
        Botón Principal
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          fontSize: '1.25rem',
          padding: '12px 24px',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.secondary.dark,
          },
        }}
      >
        Botón Secundario
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{
          fontSize: '1.25rem',
          padding: '12px 24px',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.success.dark,
          },
        }}
      >
        Botón Éxito
      </Button>
      <Button variant="contained" color="error" sx={{fontSize: '1.25rem',padding: '12px 24px','&:hover': {backgroundColor: (theme) => theme.palette.error.dark,},}}> 
        Botón Error
      </Button>
    </div>
  );
}

export default BodyHomepage;
